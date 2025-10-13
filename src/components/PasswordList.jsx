import useVaultStore from '../stores/vaultStore'

function PasswordList() {
  const passwords = useVaultStore((state) => state.passwords)

  return (
    <div className="container">
      {/* Password list content will be added */}
      <p style={{ color: 'var(--light)' }}>Total passwords: {passwords.length}</p>
    </div>
  )
}

export default PasswordList
