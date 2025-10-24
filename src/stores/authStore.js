import { create } from 'zustand'

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,

  // Actions
  login: async (email) => {
    try {
      // TODO: Replace with real API call when Rails backend is ready
      // const response = await fetch(`${API_URL}/api/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await response.json()

      // Mock data for testing without backend
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockData = {
        user: {
          id: 1,
          email: email,
          created_at: new Date().toISOString()
        },
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(7)
      }

      set({
        user: mockData.user,
        token: mockData.token,
        isAuthenticated: true
      })

      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: error.message }
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false
    })
  },

  setToken: (token) => {
    set({ token, isAuthenticated: true })
  },

  checkAuth: () => {
    // TODO: Will use IndexedDB in [S1-04]
    const { token } = get()
    return token !== null
  }
}))

export default useAuthStore
