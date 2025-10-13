import { useState } from 'react'
import FormField from './FormField'
import useVaultStore from '../stores/vaultStore'

function AddPasswordForm() {
  const addPassword = useVaultStore((state) => state.addPassword)
  const [title, setTitle] = useState('')
  const [domain, setDomain] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await addPassword({
        title,
        domain,
        username,
        password,
        notes
      })
    } catch (err) {
      setError(err.message || 'Failed to save password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <h2>Add New Password</h2>
        <form onSubmit={handleSubmit}>
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
