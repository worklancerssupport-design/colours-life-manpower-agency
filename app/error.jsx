'use client';

export default function Error({ error, reset }) {
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
      <h1 style={{ fontSize: '1.75rem', margin: '0 0 12px' }}>Something went wrong loading this page.</h1>
      <p style={{ fontSize: '1rem', margin: '0 0 24px', maxWidth: '52ch', color: 'var(--ink-on-light-muted)' }}>
        A momentary resource failed to fetch. Reload to try again, or message us on WhatsApp for direct help.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '12px 22px',
          borderRadius: '999px',
          border: 'none',
          background: 'var(--blue-500)',
          color: 'var(--ink-900)',
          fontSize: '0.95rem',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Reload page
      </button>
    </div>
  );
}