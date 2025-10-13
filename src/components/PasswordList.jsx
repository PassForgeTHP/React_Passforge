import useVaultStore from '../stores/vaultStore'
import PasswordItem from './PasswordItem'

function PasswordList() {
  const passwords = useVaultStore((state) => state.passwords)

  return (
    <div className="container">
      <h2 style={{ color: 'var(--light)', marginBottom: '20px' }}>
        My Passwords ({passwords.length})
      </h2>
      <div>
        {passwords.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: 'var(--light)',
            backgroundColor: 'var(--dark-red)',
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>No passwords saved yet</p>
            <p style={{ fontSize: '14px', opacity: 0.7 }}>Add your first password to get started</p>
          </div>
        ) : (
          passwords.map((password) => (
            <PasswordItem key={password.id} password={password} />
          ))
        )}
      </div>
    </div>
  )
}

export default PasswordList
