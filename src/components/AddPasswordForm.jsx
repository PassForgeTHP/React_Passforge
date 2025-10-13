import { useState } from 'react'
import FormField from './FormField'

function AddPasswordForm() {
  const [title, setTitle] = useState('')
  const [domain, setDomain] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <div className="container">
      <div className="form-card">
        <h2>Add New Password</h2>
        <form>
          <FormField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., GitHub Account"
            required
          />

          <FormField
            label="Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g., github.com"
          />

          <FormField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., user@example.com"
          />

          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <FormField
            label="Notes"
            as="textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional notes (optional)"
          />
        </form>
      </div>
    </div>
  )
}

export default AddPasswordForm
