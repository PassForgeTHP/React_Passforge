import { useState } from 'react'
import useVaultStore from '../stores/vaultStore'
import PasswordItem from './PasswordItem'

function PasswordList() {
  const passwords = useVaultStore((state) => state.passwords)
  const deletePassword = useVaultStore((state) => state.deletePassword)
  const [searchQuery, setSearchQuery] = useState('')

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      try {
        await deletePassword(id)
      } catch (error) {
        console.error('Failed to delete password:', error)
        alert('Failed to delete password')
      }
    }
  }

  const filteredPasswords = passwords.filter(pwd =>
    pwd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (pwd.username && pwd.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (pwd.domain && pwd.domain.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="container">
      <h2 style={{ color: 'var(--light)', marginBottom: '20px' }}>
        My Passwords ({passwords.length})
      </h2>

      <input
        type="text"
        placeholder="Search passwords..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '20px',
          backgroundColor: 'var(--dark-red)',
          border: '1px solid var(--base-red)',
          borderRadius: '8px',
          color: 'var(--light)',
          fontSize: '14px'
        }}
      />

      <div>
        {filteredPasswords.length === 0 && passwords.length === 0 ? (
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
        ) : filteredPasswords.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: 'var(--light)',
            backgroundColor: 'var(--dark-red)',
            borderRadius: '8px'
          }}>
            <p style={{ fontSize: '16px' }}>No passwords match your search</p>
          </div>
        ) : (
          filteredPasswords.map((password) => (
            <PasswordItem
              key={password.id}
              password={password}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default PasswordList
