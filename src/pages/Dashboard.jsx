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
    <div style={{ padding: '20px' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ color: 'var(--light)', margin: 0 }}>Password Manager</h1>
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
              fontWeight: 'bold'
            }}
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
