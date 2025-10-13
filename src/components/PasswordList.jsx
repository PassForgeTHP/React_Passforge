import { useState } from 'react'
import useVaultStore from '../stores/vaultStore'
import PasswordItem from './PasswordItem'

function PasswordList() {
  const passwords = useVaultStore((state) => state.passwords)
  const deletePassword = useVaultStore((state) => state.deletePassword)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [sortOrder, setSortOrder] = useState('newest') // 'newest' or 'oldest'

  const handleEdit = (password) => {
    // TODO: Implement edit modal
    console.log('Edit password:', password)
    alert('Edit functionality coming soon')
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      setIsDeleting(true)
      try {
        await deletePassword(id)
      } catch (error) {
        console.error('Failed to delete password:', error)
        alert('Failed to delete password')
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const filteredPasswords = passwords
    .filter(pwd =>
      pwd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pwd.username && pwd.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pwd.domain && pwd.domain.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <h2 style={{ color: 'var(--light)', margin: 0 }}>
          My Passwords ({passwords.length})
        </h2>
        <button
          onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
          style={{
            padding: '8px 16px',
            backgroundColor: 'var(--medium-red)',
            color: 'var(--light)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
        </button>
      </div>

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
          fontSize: '14px',
          transition: 'border-color 0.2s ease',
          outline: 'none'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--medium-red)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--base-red)'}
      />

      {isDeleting && (
        <div style={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: 'var(--dark-red)',
          color: 'var(--light)',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          Deleting password...
        </div>
      )}

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
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default PasswordList
