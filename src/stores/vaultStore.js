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
      // TODO: Will decrypt vault from IndexedDB in [S1-04]
      // For now, simulate unlocking with mock data
      await new Promise(resolve => setTimeout(resolve, 500))

      const mockPasswords = [
        {
          id: 1,
          title: 'GitHub',
          domain: 'github.com',
          username: 'user@example.com',
          password: 'encrypted-password-1',
          notes: 'My GitHub account',
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Gmail',
          domain: 'gmail.com',
          username: 'user@gmail.com',
          password: 'encrypted-password-2',
          notes: '',
          created_at: new Date().toISOString()
        }
      ]

      set({
        isLocked: false,
        passwords: mockPasswords
      })

      return { success: true }
    } catch (error) {
      console.error('Unlock failed:', error)
      return { success: false, error: error.message }
    }
  },

  lock: () => {
    set({
      isLocked: true,
      passwords: []
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
