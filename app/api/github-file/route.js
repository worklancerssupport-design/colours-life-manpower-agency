import { timingSafeEqual } from 'node:crypto';
import { isAllowedPath } from '@/lib/edit/sections';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const NO_STORE = {
  'Cache-Control': 'no-store, max-age=0',
  'Content-Type': 'application/json',
};

function json(body, status) {
  return new Response(JSON.stringify(body), { status, headers: NO_STORE });
}

// --------------------------------------------------------------------------
// Auth — every read AND write is gated. The PAT is never exposed.
// --------------------------------------------------------------------------

function safeEqual(a, b) {
  const left = Buffer.from(String(a ?? ''), 'utf8');
  const right = Buffer.from(String(b ?? ''), 'utf8');
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function checkAuth(request) {
  const expectedUser = process.env.EDIT_USERNAME;
  const expectedPass = process.env.EDIT_PASSWORD;
  if (!expectedUser || !expectedPass) return { ok: false, status: 500, error: 'Edit console is not configured' };

  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Basic ')) return { ok: false, status: 401, error: 'Unauthorized' };

  let decoded = '';
  try {
    decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  } catch {
    return { ok: false, status: 401, error: 'Unauthorized' };
  }

  const sep = decoded.indexOf(':');
  const username = sep === -1 ? decoded : decoded.slice(0, sep);
  const password = sep === -1 ? '' : decoded.slice(sep + 1);

  if (!safeEqual(username, expectedUser) || !safeEqual(password, expectedPass)) {
    return { ok: false, status: 401, error: 'Unauthorized' };
  }
  return { ok: true };
}

// --------------------------------------------------------------------------
// GitHub Contents API
// --------------------------------------------------------------------------

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const TOKEN = process.env.GITHUB_TOKEN;
const BRANCH = process.env.GITHUB_BRANCH || 'main';

function githubReady() {
  return Boolean(OWNER && REPO && TOKEN);
}

const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  // GitHub rejects requests without a User-Agent.
  'User-Agent': 'colours-life-manpower-edit-console',
};

function readUrl(path) {
  // ?t= busts any intermediary cache; api.github.com (not raw) always
  // returns the latest commit.
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path).replace(/%2F/gi, '/')}?ref=${encodeURIComponent(BRANCH)}&t=${Date.now()}`;
}

function writeUrl(path) {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path).replace(/%2F/gi, '/')}`;
}

async function githubError(res) {
  let message = res.statusText || `GitHub API error (${res.status})`;
  try {
    const body = await res.json();
    if (body && body.message) message = body.message;
  } catch {
    /* non-JSON */
  }
  return message;
}

// --------------------------------------------------------------------------
// GET — read one data file
// --------------------------------------------------------------------------

export async function GET(request) {
  const auth = checkAuth(request);
  if (!auth.ok) return json({ error: auth.error }, auth.status);

  if (!githubReady()) {
    return json({ error: 'GitHub is not configured' }, 500);
  }

  const path = new URL(request.url).searchParams.get('path');
  if (!path) return json({ error: 'Missing path' }, 400);
  if (!isAllowedPath(path)) return json({ error: 'Path not allowed' }, 403);

  try {
    const res = await fetch(readUrl(path), { headers: HEADERS, cache: 'no-store' });
    if (!res.ok) {
      return json({ error: await githubError(res) }, res.status === 404 ? 404 : 502);
    }
    const data = await res.json();
    if (data.type !== 'file' || typeof data.content !== 'string') {
      return json({ error: 'Not a readable file' }, 502);
    }
    // GitHub returns base64 with embedded newlines; Buffer ignores them.
    const content = Buffer.from(data.content, 'base64').toString('utf8');
    return json({ content, sha: data.sha }, 200);
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Unknown error' }, 500);
  }
}

// --------------------------------------------------------------------------
// PUT — write one data file (optimistic-locked by sha)
// --------------------------------------------------------------------------

export async function PUT(request) {
  const auth = checkAuth(request);
  if (!auth.ok) return json({ error: auth.error }, auth.status);

  if (!githubReady()) {
    return json({ error: 'GitHub is not configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  const { path, content, sha, message } = body || {};

  if (!path) return json({ error: 'Missing path' }, 400);
  if (!isAllowedPath(path)) return json({ error: 'Path not allowed' }, 403);
  if (typeof content !== 'string') return json({ error: 'Missing content' }, 400);
  if (!sha) return json({ error: 'Missing sha' }, 400);
  if (typeof message !== 'string' || !message.trim()) {
    return json({ error: 'Missing commit message' }, 400);
  }

  // Guard against a corrupted write producing invalid JSON on main.
  try {
    JSON.parse(content);
  } catch {
    return json({ error: 'Content is not valid JSON' }, 400);
  }

  try {
    const res = await fetch(writeUrl(path), {
      method: 'PUT',
      headers: HEADERS,
      cache: 'no-store',
      body: JSON.stringify({
        message: message.trim(),
        content: Buffer.from(content, 'utf8').toString('base64'),
        sha,
        branch: BRANCH,
      }),
    });

    if (!res.ok) {
      const error = await githubError(res);
      return json({ error, shaMismatch: res.status === 409 }, res.status === 409 ? 409 : 502);
    }

    const data = await res.json();
    return json({ newSha: data.content.sha }, 200);
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Unknown error' }, 500);
  }
}
