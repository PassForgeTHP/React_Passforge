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
        {passwords.map((password) => (
          <PasswordItem key={password.id} password={password} />
        ))}
      </div>
    </div>
  )
}

export default PasswordList
