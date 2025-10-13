import { useState } from 'react'

function PasswordItem({ password }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="password-item" style={{
      backgroundColor: 'var(--dark-red)',
      padding: '16px',
      marginBottom: '12px',
      borderRadius: '8px',
      border: '1px solid var(--base-red)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <h3 style={{
          margin: 0,
          color: 'var(--light)',
          fontSize: '18px'
        }}>
          {password.title}
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            style={{
              padding: '6px 12px',
              backgroundColor: 'var(--medium-red)',
              color: 'var(--light)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Edit
          </button>
          <button
            type="button"
            style={{
              padding: '6px 12px',
              backgroundColor: 'var(--base-red)',
              color: 'var(--light)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div style={{ color: 'var(--light)', fontSize: '14px' }}>
        {password.username && (
          <div style={{ marginBottom: '4px' }}>
            <strong>Username:</strong> {password.username}
          </div>
        )}
        {password.domain && (
          <div style={{ marginBottom: '4px' }}>
            <strong>Domain:</strong> {password.domain}
          </div>
        )}
        <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong>Password:</strong>
          <span>{showPassword ? password.password : '••••••••'}</span>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--medium-red)',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {password.notes && (
          <div style={{ marginTop: '8px' }}>
            <strong>Notes:</strong>
            <div style={{ marginTop: '4px', fontSize: '13px', opacity: 0.9 }}>
              {password.notes}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PasswordItem
