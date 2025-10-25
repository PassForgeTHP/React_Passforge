import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import useRefreshUser from '../../hooks/useRefreshUser';
import Setup2FAModal from './Setup2FAModal';
import SEO from "../../components/SEO";

const TwoFALink = () => {
  const { user, token } = useContext(AuthContext);
  const refreshUser = useRefreshUser();
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pendingAction, setPendingAction] = useState(''); // 'enable' or 'disable'

  const is2FAEnabled = user?.two_factor_enabled || false;

  const verifyPassword = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
      const response = await fetch(`${apiUrl}/api/users/verify_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('Incorrect password.');
      }

      return true;
    } catch (err) {
      setPasswordError(err.message);
      return false;
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    const isValid = await verifyPassword();
    if (!isValid) return;

    setShowPasswordModal(false);
    setPassword('');

    if (pendingAction === 'enable') {
      setIsSetupModalOpen(true);
    } else if (pendingAction === 'disable') {
      await handleDisable();
    }
  };

  const handleDisable = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
      const response = await fetch(`${apiUrl}/api/auth/two_factor/disable`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Failed to disable 2FA.');
      }

      // Refresh user data to update two_factor_enabled status
      await refreshUser();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleChange = (e) => {
    const isChecked = e.target.checked;
    setPendingAction(isChecked ? 'enable' : 'disable');
    setShowPasswordModal(true);
  };

  return (
    <div className="two-fa-section">
      <SEO
        title="PassForge | two Factor Verify"
        description="Secure your PassForge account with two-factor authentication. Protect your encrypted passwords and ensure only you can access your account."
        canonical="https://pass-forge-en.netlify.app/two-factor-verify"
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p><strong>Two-Factor Authentication</strong></p>
          <p style={{ margin: 0, color: is2FAEnabled ? 'green' : '#666' }}>
            {is2FAEnabled ? "Enabled" : "Disabled"}
          </p>
        </div>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={is2FAEnabled}
            onChange={handleToggleChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
      
      {error && <p className="error-message" style={{ marginTop: '10px' }}>{error}</p>}

      <Setup2FAModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
      />

      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Password</h2>
            <p>Please enter your password to {pendingAction === 'enable' ? 'enable' : 'disable'} 2FA.</p>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
              <div className="modal-actions">
                <button type="submit" className="btn">Confirm</button>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowPasswordModal(false); setPassword(''); setPasswordError(''); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFALink;
