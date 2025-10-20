import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Modal.css'; // Reuse the modal styles

const PasswordConfirmModal = ({ isOpen, onClose, onSuccess }) => {
  const { token } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setError('');
    try {
      // This endpoint needs to be created on the Rails backend
      const response = await fetch('https://passforge-api.onrender.com/users/confirm_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password: password }),
      });

      if (!response.ok) {
        throw new Error('Incorrect password.');
      }

      // If password is correct, call the onSuccess callback
      onSuccess();

    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Your Identity</h2>
        <p>Please enter your password to continue.</p>
        
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="password-confirm">Password</label>
          <input 
            id="password-confirm" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={handleConfirm}>Confirm</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirmModal;
