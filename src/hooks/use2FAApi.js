import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Hook to interact with 2FA API endpoints
 * Centralizes API URL and authentication headers
 *
 * @returns {Object} API methods for 2FA operations
 */
export const use2FAApi = () => {
  const { token } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
  const isLocalhost = apiUrl.includes('localhost');

  const setup = async () => {
    const response = await fetch(`${apiUrl}/api/auth/two_factor/setup`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to setup 2FA');
    }

    return response.json();
  };

  const verify = async (secret, code) => {
    const response = await fetch(`${apiUrl}/api/auth/two_factor/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ secret, code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Invalid verification code');
    }

    return response.json();
  };

  const disable = async () => {
    const response = await fetch(`${apiUrl}/api/auth/two_factor/disable`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to disable 2FA');
    }

    return response.json();
  };

  const verifyLogin = async (code, backupCode = null) => {
    const body = backupCode ? { backup_code: backupCode } : { code };

    const response = await fetch(`${apiUrl}/api/auth/two_factor/verify_login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...(isLocalhost && { credentials: 'include' }),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Invalid verification code');
    }

    return { response, data: await response.json() };
  };

  return {
    setup,
    verify,
    disable,
    verifyLogin,
  };
};

export default use2FAApi;
