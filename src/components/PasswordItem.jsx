function PasswordItem({ password }) {
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
      </div>
    </div>
  )
}

export default PasswordItem
