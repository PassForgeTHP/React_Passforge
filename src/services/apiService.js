/**
 * API Service
 *
 * Handles all HTTP requests to the Rails backend.
 * Provides methods for GET, POST, PUT, DELETE with
 * authentication and error handling.
 */

import { buildApiUrl, getAuthHeaders } from '../config/api.js'

/**
 * Generic API request handler
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
async function apiRequest(endpoint, options = {}) {
  const url = buildApiUrl(endpoint)

  const config = {
    headers: getAuthHeaders(),
    ...options
  }

  try {
    const response = await fetch(url, config)

    // Parse response
    const data = await response.json().catch(() => ({}))

    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(data.error || data.message || `HTTP ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

/**
 * GET request
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Object>} Response data
 */
export async function get(endpoint) {
  return apiRequest(endpoint, {
    method: 'GET'
  })
}

/**
 * POST request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body
 * @returns {Promise<Object>} Response data
 */
export async function post(endpoint, data) {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

/**
 * PUT request
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body
 * @returns {Promise<Object>} Response data
 */
export async function put(endpoint, data) {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

/**
 * DELETE request
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Object>} Response data
 */
export async function deleteRequest(endpoint) {
  return apiRequest(endpoint, {
    method: 'DELETE'
  })
}

/**
 * Upload encrypted vault to backend
 * @param {Object} vaultData - Encrypted vault data (encrypted_vault, iv, salt)
 * @returns {Promise<Object>} Response data
 */
export async function uploadVault(vaultData) {
  // Convert ArrayBuffer and Uint8Array to base64 for JSON transfer
  const payload = {
    encrypted_vault: arrayBufferToBase64(vaultData.encrypted_vault),
    iv: uint8ArrayToBase64(vaultData.iv),
    salt: uint8ArrayToBase64(vaultData.salt),
    version: vaultData.version,
    updatedAt: vaultData.updatedAt
  }

  return put('/api/vault', payload)
}

/**
 * Download encrypted vault from backend
 * @returns {Promise<Object>} Vault data with ArrayBuffer and Uint8Array restored
 */
export async function downloadVault() {
  const data = await get('/api/vault')

  // Convert base64 back to ArrayBuffer and Uint8Array
  return {
    encrypted_vault: base64ToArrayBuffer(data.encrypted_vault),
    iv: base64ToUint8Array(data.iv),
    salt: base64ToUint8Array(data.salt),
    version: data.version,
    updatedAt: data.updatedAt
  }
}

// Helper functions for binary data conversion
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function uint8ArrayToBase64(array) {
  let binary = ''
  for (let i = 0; i < array.length; i++) {
    binary += String.fromCharCode(array[i])
  }
  return btoa(binary)
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

function base64ToUint8Array(base64) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export default {
  get,
  post,
  put,
  deleteRequest,
  uploadVault,
  downloadVault
}
