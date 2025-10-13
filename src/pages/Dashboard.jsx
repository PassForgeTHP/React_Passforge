import { useState } from 'react'
import AddPasswordForm from '../components/AddPasswordForm'
import PasswordList from '../components/PasswordList'

function Dashboard() {
  const [showForm, setShowForm] = useState(false)

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

        {showForm && <AddPasswordForm />}
      </div>
    </div>
  )
}

export default Dashboard
