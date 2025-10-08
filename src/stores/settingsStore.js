import { create } from 'zustand'

const useSettingsStore = create((set, get) => ({
  // State
  theme: 'dark',
  language: 'en',
  autoLockTimeout: 5,

  // Actions
  setTheme: (theme) => {
    set({ theme })
    // TODO: Will persist to IndexedDB in [S1-04]
  },

  setLanguage: (language) => {
    set({ language })
    // TODO: Will persist to IndexedDB in [S1-04]
  },

  setAutoLockTimeout: (minutes) => {
    set({ autoLockTimeout: minutes })
    // TODO: Will persist to IndexedDB in [S1-04]
  },

  updateSettings: (settings) => {
    set(settings)
    // TODO: Will persist to IndexedDB in [S1-04]
  },

  resetSettings: () => {
    set({
      theme: 'dark',
      language: 'en',
      autoLockTimeout: 5
    })
    // TODO: Will persist to IndexedDB in [S1-04]
  }
}))

export default useSettingsStore
