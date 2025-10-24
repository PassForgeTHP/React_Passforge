import { create } from 'zustand'

const useSyncStore = create((set) => ({
  // State
  isSyncing: false,
  lastSync: null,
  syncError: null,

  // Actions
  syncToServer: async () => {
    try {
      set({ isSyncing: true, syncError: null })

      // TODO: Will sync with Rails API when backend is ready
      // For now, simulate sync
      await new Promise(resolve => setTimeout(resolve, 1500))

      set({
        isSyncing: false,
        lastSync: new Date().toISOString()
      })

      return { success: true }
    } catch (error) {
      console.error('Sync to server failed:', error)
      set({
        isSyncing: false,
        syncError: error.message
      })
      return { success: false, error: error.message }
    }
  },

  syncFromServer: async () => {
    try {
      set({ isSyncing: true, syncError: null })

      // TODO: Will fetch data from Rails API when backend is ready
      // For now, simulate sync
      await new Promise(resolve => setTimeout(resolve, 1500))

      set({
        isSyncing: false,
        lastSync: new Date().toISOString()
      })

      return { success: true }
    } catch (error) {
      console.error('Sync from server failed:', error)
      set({
        isSyncing: false,
        syncError: error.message
      })
      return { success: false, error: error.message }
    }
  },

  clearSyncError: () => {
    set({ syncError: null })
  }
}))

export default useSyncStore
