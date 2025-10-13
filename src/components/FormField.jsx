function FormField({ label, type = "text", value, onChange, placeholder, required = false, as = "input" }) {
  const InputElement = as

  return (
    <div className="form-group">
      <label>
        {label}
        {required && <span style={{ color: 'var(--medium-red)' }}> *</span>}
      </label>
      <InputElement
        type={as === "input" ? type : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default FormField
