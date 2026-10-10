import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'var(--ink-on-light)',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '2rem', margin: '0 0 12px' }}>Page not found.</h1>
      <p style={{ fontSize: '1rem', margin: '0 0 24px', maxWidth: '52ch', color: 'var(--ink-on-light-muted)' }}>
        The page you are looking for has moved or does not exist. Head back to the home page to find what you need.
      </p>
      <Link
        href="/"
        style={{
          padding: '12px 22px',
          borderRadius: '999px',
          background: 'var(--blue-500)',
          color: 'var(--ink-900)',
          fontSize: '0.95rem',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}