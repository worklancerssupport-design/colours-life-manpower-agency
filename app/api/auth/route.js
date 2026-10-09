import { timingSafeEqual } from 'node:crypto';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function safeEqual(a, b) {
  const left = Buffer.from(String(a ?? ''), 'utf8');
  const right = Buffer.from(String(b ?? ''), 'utf8');
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

const NO_STORE = {
  'Cache-Control': 'no-store, max-age=0',
  'Content-Type': 'application/json',
};

function json(body, status) {
  return new Response(JSON.stringify(body), { status, headers: NO_STORE });
}

export async function POST(request) {
  const expectedUser = process.env.EDIT_USERNAME;
  const expectedPass = process.env.EDIT_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return json({ success: false, error: 'Edit console is not configured' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid request body' }, 400);
  }

  const ok = safeEqual(body?.username, expectedUser) && safeEqual(body?.password, expectedPass);

  if (!ok) {
    return json({ success: false, error: 'Invalid username or password' }, 401);
  }

  return json({ success: true }, 200);
}
