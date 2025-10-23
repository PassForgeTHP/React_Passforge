import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Modal.css'; // Import the CSS for the modal

const Setup2FAModal = ({ isOpen, onClose }) => {
  const { token, setUser } = useContext(AuthContext);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchQRCode = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
          const fetchOptions = {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          };
          const response = await fetch(`${apiUrl}/api/auth/two_factor/setup`, fetchOptions);
          if (!response.ok) throw new Error('Failed to fetch QR code.');
          const data = await response.json();
          setQrCode(data.qr_base64);
          setSecret(data.secret);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchQRCode();
    }
  }, [isOpen, token]);

  const handleVerify = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
      const response = await fetch(`${apiUrl}/api/auth/two_factor/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ secret: secret, code: otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid OTP code.');
      }

      const updatedUser = await response.json();
      setUser(updatedUser.user);
      onClose(); // Close modal on success
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
        <h2>Set up Two-Factor Authentication</h2>
        <p>Scan this QR code with your authenticator app (e.g., 2FAS, Google Authenticator).</p>

        {qrCode ? (
          <div className="qr-code-display">
            <img src={qrCode} alt="2FA QR Code" style={{ width: '300px', height: '300px' }} />
          </div>
        ) : (
          <p>Loading QR code...</p>
        )}

        {secret && (
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
            <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>Or enter this secret key manually:</p>
            <p style={{ margin: '5px 0', fontFamily: 'monospace', fontSize: '14px', wordBreak: 'break-all' }}>
              <strong>{secret}</strong>
            </p>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        <p>Then, enter the 6-digit code from your app to verify the setup.</p>
        
        <div className="form-group">
          <label htmlFor="otp-code">Verification Code</label>
          <input 
            id="otp-code" 
            type="text" 
            maxLength="6" 
            placeholder="123456" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={handleVerify}>Verify & Enable</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Setup2FAModal;
