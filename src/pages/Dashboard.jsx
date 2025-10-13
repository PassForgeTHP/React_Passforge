import { useState, useEffect } from 'react'
import AddPasswordForm from '../components/AddPasswordForm'
import PasswordList from '../components/PasswordList'
import useVaultStore from '../stores/vaultStore'

function Dashboard() {
  const [showForm, setShowForm] = useState(false)
  const passwords = useVaultStore((state) => state.passwords)
  const [prevPasswordCount, setPrevPasswordCount] = useState(passwords.length)

  useEffect(() => {
    // Auto-switch to list view when a new password is added
    if (passwords.length > prevPasswordCount) {
      setShowForm(false)
    }
    setPrevPasswordCount(passwords.length)
  }, [passwords.length, prevPasswordCount])

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: 'var(--dark)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <h1 style={{
            color: 'var(--light)',
            margin: 0,
            fontSize: 'clamp(24px, 5vw, 32px)'
          }}>
            Password Manager
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--medium-red)',
              color: 'var(--light)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--base-red)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--medium-red)'}
          >
            {showForm ? 'View Passwords' : 'Add Password'}
          </button>
        </div>

        {showForm ? <AddPasswordForm /> : <PasswordList />}
      </div>
    </div>
  )
}

export default Dashboard
