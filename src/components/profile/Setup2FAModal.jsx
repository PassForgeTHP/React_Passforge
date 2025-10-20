import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './Modal.css'; // Import the CSS for the modal

const Setup2FAModal = ({ isOpen, onClose }) => {
  const { token, user, setUser } = useContext(AuthContext);
  const [qrCode, setQrCode] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const fetchQRCode = async () => {
        try {
          const response = await fetch('https://passforge-api.onrender.com/2fa/setup', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch QR code.');
          const data = await response.json();
          setQrCode(data.qr_code_svg);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchQRCode();
    }
  }, [isOpen, token]);

  const handleVerify = async () => {
    try {
      const response = await fetch('https://passforge-api.onrender.com/2fa/enable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ otp_code: otp }),
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
        
        <div className="qr-code-display" dangerouslySetInnerHTML={{ __html: qrCode || '<p>Loading QR code...</p>' }} />
        
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
