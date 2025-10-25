import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import use2FAApi from '../../hooks/use2FAApi';
import useRefreshUser from '../../hooks/useRefreshUser';
import Setup2FAModal from './Setup2FAModal';
import { useContext } from 'react';

const TwoFactorToggle = () => {
  const navigate = useNavigate();
  const { user, token, setUser } = useContext(AuthContext);
  const twoFAApi = use2FAApi();
  const refreshUser = useRefreshUser();
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pendingAction, setPendingAction] = useState('');

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

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'Signature has expired') {
          alert('Your session has expired. Please log in again.');
          setUser(null);
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          navigate('/');
          return false;
        }
        throw new Error(data.error || 'Incorrect password.');
      }

      return true;
    } catch (err) {
      console.error('Error in verifyPassword:', err);
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
      await twoFAApi.disable();
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
      <div className="two-fa">
        <div>
          <strong>Two-Factor Authentication</strong>
          <p className={is2FAEnabled ? "enabled" : "disabled"}>
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
      
      {error && <p className="error-message">{error}</p>}

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
              <div className="form-groups">
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
                <button type="button" className="btn" onClick={() => { setShowPasswordModal(false); setPassword(''); setPasswordError(''); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFactorToggle;
