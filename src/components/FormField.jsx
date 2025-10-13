function FormField({ label, type = "text", value, onChange, placeholder, required = false }) {
  return (
    <div className="form-group">
      <label>
        {label}
        {required && <span style={{ color: 'var(--medium-red)' }}> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default FormField
