import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Setup2FAModal from './Setup2FAModal';
import PasswordConfirmModal from './PasswordConfirmModal'; // Import the new modal
import './ToggleSwitch.css'; // Import the CSS for the toggle switch

const TwoFALink = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [error, setError] = useState('');

  const is2FAEnabled = user?.two_factor_enabled || false;

  const handleDisable = async () => {
    setError('');
    if (window.confirm("Are you sure you want to disable two-factor authentication?")) {
      try {
        const response = await fetch('https://passforge-api.onrender.com/2fa/disable', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to disable 2FA.');
        }

        const updatedUser = await response.json();
        setUser(updatedUser.user);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleToggleChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // If user intends to enable 2FA, open the password confirmation modal first
      setIsPasswordModalOpen(true);
    } else {
      // If user intends to disable 2FA, start the disable process
      handleDisable();
    }
  };

  const onPasswordSuccess = () => {
    // When password is confirmed, close password modal and open setup modal
    setIsPasswordModalOpen(false);
    setIsSetupModalOpen(true);
  };

  return (
    <div className="two-fa-section">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <strong>Two-Factor Authentication</strong>
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

      <PasswordConfirmModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
        onSuccess={onPasswordSuccess} 
      />

      <Setup2FAModal 
        isOpen={isSetupModalOpen} 
        onClose={() => setIsSetupModalOpen(false)} 
      />
    </div>
  );
};

export default TwoFALink;
