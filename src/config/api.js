/**
 * API Configuration
 *
 * Centralized configuration for backend API endpoints.
 * Backend: Rails API hosted on Render
 */

// Base URL for the Rails backend
export const API_BASE_URL = 'https://passforge-api.onrender.com'

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication endpoints
  auth: {
    register: '/api/auth/register',    // POST - Create new user account
    login: '/api/auth/login',          // POST - Login and get JWT token
    logout: '/api/auth/logout',        // POST - Logout (invalidate token)
    refresh: '/api/auth/refresh'       // POST - Refresh JWT token
  },

  // Vault endpoints
  vault: {
    get: '/api/vault',                 // GET - Retrieve encrypted vault
    update: '/api/vault',              // PUT/PATCH - Update encrypted vault
    sync: '/api/vault/sync'            // POST - Sync vault with server
  },

  // User endpoints
  user: {
    profile: '/api/user/profile',      // GET - Get user profile
    settings: '/api/user/settings',    // PUT - Update user settings
    delete: '/api/user'                // DELETE - Delete user account
  }
}

/**
 * Build full API URL
 * @param {string} endpoint - Endpoint path (e.g., API_ENDPOINTS.vault.get)
 * @returns {string} Full URL
 */
export function buildApiUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`
}

/**
 * Get auth headers with JWT token
 * @returns {Object} Headers object
 */
export function getAuthHeaders() {
  const token = localStorage.getItem('jwt_token')
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  }
}

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  buildApiUrl,
  getAuthHeaders
}
