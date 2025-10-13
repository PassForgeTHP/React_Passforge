import { create } from 'zustand'
import {
  generateSalt,
  generateIV,
  deriveKey,
  encryptData,
  decryptData
} from '../services/cryptoService.js'
import { vaultOperations } from '../services/indexedDB.js'

const useVaultStore = create((set, get) => ({
  // State
  isLocked: true,
  passwords: [],
  masterKey: null, // CryptoKey object stored in RAM while unlocked
  salt: null, // 32-byte salt for PBKDF2 key derivation
  iv: null, // 12-byte IV for AES-GCM encryption (changes on each save)

  // Actions
  unlock: async (masterPassword) => {
    try {
      // Step 1: Retrieve encrypted vault from IndexedDB
      const storedVault = await vaultOperations.get()

      // Handle first-time unlock (no vault exists yet)
      if (!storedVault) {
        // Generate new salt for this user
        const newSalt = generateSalt()

        // Create empty vault
        const emptyVault = {
          passwords: [],
          version: '1.0',
          createdAt: new Date().toISOString()
        }

        // Derive key from master password
        const key = await deriveKey(masterPassword, newSalt)

        // Serialize vault to JSON
        const vaultJSON = JSON.stringify(emptyVault)

        // Encrypt with new IV
        const { encrypted, iv } = await encryptData(vaultJSON, key)

        // Save to IndexedDB
        await vaultOperations.set({
          encrypted_vault: encrypted,
          iv: iv,
          salt: newSalt,
          version: '1.0',
          updatedAt: new Date().toISOString()
        })

        // Set state for unlocked empty vault
        set({
          isLocked: false,
          passwords: [],
          masterKey: key,
          salt: newSalt,
          iv: iv
        })

        return { success: true, message: 'Vault created and unlocked' }
      }

      // Step 2: Decrypt existing vault
      // Derive key from master password and stored salt
      const key = await deriveKey(masterPassword, storedVault.salt)

      // Decrypt vault using stored IV
      const decryptedJSON = await decryptData(
        storedVault.encrypted_vault,
        key,
        storedVault.iv
      )

      // Parse decrypted JSON
      const vaultData = JSON.parse(decryptedJSON)

      // Step 3: Load passwords into RAM
      set({
        isLocked: false,
        passwords: vaultData.passwords || [],
        masterKey: key,
        salt: storedVault.salt,
        iv: storedVault.iv
      })

      return { success: true, message: 'Vault unlocked successfully' }
    } catch (error) {
      console.error('Unlock failed:', error)
      return { success: false, error: error.message }
    }
  },

  lock: () => {
    // Clear all sensitive data from RAM
    set({
      isLocked: true,
      passwords: [] // Clear decrypted passwords
    })
  },

  addPassword: (passwordData) => {
    const { passwords } = get()

    const newPassword = {
      id: Date.now(),
      ...passwordData,
      created_at: new Date().toISOString()
    }

    set({
      passwords: [...passwords, newPassword]
    })

    // TODO: Will save to IndexedDB in [S1-04]
    return { success: true, password: newPassword }
  },

  updatePassword: (id, updatedData) => {
    const { passwords } = get()

    const updatedPasswords = passwords.map(pwd =>
      pwd.id === id ? { ...pwd, ...updatedData } : pwd
    )

    set({ passwords: updatedPasswords })

    // TODO: Will update in IndexedDB in [S1-04]
    return { success: true }
  },

  deletePassword: (id) => {
    const { passwords } = get()

    const filteredPasswords = passwords.filter(pwd => pwd.id !== id)

    set({ passwords: filteredPasswords })

    // TODO: Will delete from IndexedDB in [S1-04]
    return { success: true }
  },

  searchPasswords: (query) => {
    const { passwords } = get()

    if (!query) return passwords

    const lowerQuery = query.toLowerCase()
    return passwords.filter(pwd =>
      pwd.title.toLowerCase().includes(lowerQuery) ||
      pwd.domain.toLowerCase().includes(lowerQuery) ||
      pwd.username.toLowerCase().includes(lowerQuery)
    )
  }
}))

export default useVaultStore
