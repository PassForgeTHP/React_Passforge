import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Hook to refresh user data from the server
 * Useful after 2FA changes or profile updates
 *
 * @returns {Function} refreshUser - Function to refresh user data
 */
export const useRefreshUser = () => {
  const { token, setUser } = useContext(AuthContext);

  const refreshUser = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
      const response = await fetch(`${apiUrl}/member-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        throw new Error('Failed to refresh user data');
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      return { success: false, error: error.message };
    }
  };

  return refreshUser;
};

export default useRefreshUser;
