import { useState } from 'react'
import AddPasswordForm from '../components/AddPasswordForm'
import PasswordList from '../components/PasswordList'

function Dashboard() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
