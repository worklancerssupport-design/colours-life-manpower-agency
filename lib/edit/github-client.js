// Client-side GitHub data file access. Talks ONLY to our own /api route
// handlers — the PAT never reaches this bundle.

const API_BASE = '/api/github-file/';

// In-memory credentials. Not persisted anywhere: a page refresh logs you out,
// which is the documented behaviour.
let basicAuth = null;

function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export function setCredentials(username, password) {
  basicAuth = `Basic ${toBase64(`${username}:${password}`)}`;
}

export function clearCredentials() {
  basicAuth = null;
}

export function hasCredentials() {
  return basicAuth !== null;
}

function authHeaders(extra) {
  return basicAuth ? { Authorization: basicAuth, ...extra } : { ...extra };
}

async function readError(res) {
  let message = `Request failed (${res.status})`;
  if (res.status === 401) message = 'Not authorised';
  if (res.status === 403) message = 'Path not allowed';
  if (res.status === 404) message = 'File not found';
  if (res.status === 409) message = 'File changed elsewhere — refresh and retry';
  try {
    const body = await res.json();
    if (body && body.error) message = body.error;
  } catch {
    /* non-JSON error body */
  }
  const err = new Error(message);
  err.status = res.status;
  return err;
}

/**
 * @param {string} path repo-relative path, e.g. "data/agency.json"
 * @returns {Promise<{content: string, sha: string}>}
 */
export async function fetchFileFromGitHub(path) {
  const res = await fetch(`${API_BASE}?path=${encodeURIComponent(path)}`, {
    headers: authHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw await readError(res);
  return res.json();
}

/**
 * @param {{path: string, content: string, sha: string, message: string}} input
 * @returns {Promise<{newSha: string}>}
 */
export async function saveFileToGitHub({ path, content, sha, message }) {
  const res = await fetch(API_BASE, {
    method: 'PUT',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    cache: 'no-store',
    body: JSON.stringify({ path, content, sha, message }),
  });
  if (!res.ok) throw await readError(res);
  return res.json();
}
