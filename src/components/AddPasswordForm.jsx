import { useState } from 'react'
import FormField from './FormField'

function AddPasswordForm() {
  const [title, setTitle] = useState('')

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
        </form>
      </div>
    </div>
  )
}

export default AddPasswordForm
