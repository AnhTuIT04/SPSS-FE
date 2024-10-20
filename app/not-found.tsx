export default function NotFound() {
  return (
    <div
      style={{
        height: 'calc(100vh - 16px)',
        backgroundColor: '#f3f4f6', // gray-100
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '28rem',
          width: '100%',
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        <div>
          <h2
            style={{
              marginTop: '24px',
              fontSize: '4rem', // 6xl
              fontWeight: '800',
              color: '#111827', // gray-900
            }}
          >
            404
          </h2>
          <p
            style={{
              marginTop: '8px',
              fontSize: '1.875rem', // 3xl
              fontWeight: '700',
              color: '#111827', // gray-900
            }}
          >
            Page not found
          </p>
          <p
            style={{
              marginTop: '8px',
              fontSize: '0.875rem', // sm
              color: '#6b7280', // gray-600
            }}
          >
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div style={{ marginTop: '32px' }}>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderRadius: '0.375rem', // rounded-md
              backgroundColor: '#4f46e5', // indigo-600
              color: 'white',
              fontSize: '1rem', // base
              fontWeight: '500',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <svg
              style={{ marginRight: '8px', height: '20px', width: '20px' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12h18m-9-9l9 9-9 9"
              />
            </svg>
            Go back home
          </a>
        </div>
      </div>

      <div style={{ marginTop: '64px', width: '100%', maxWidth: '42rem' }}>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
            }}
            aria-hidden="true"
          >
            <div
              style={{
                width: '100%',
                borderTop: '1px solid #d1d5db', // gray-300
              }}
            ></div>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <span
              style={{
                padding: '4px 8px',
                backgroundColor: '#f3f4f6', // gray-100
                fontSize: '0.875rem', // sm
                color: '#6b7280', // gray-500
              }}
            >
              If you think this is a mistake, please contact support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
