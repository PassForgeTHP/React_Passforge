import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import './styles/App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { initDB } from './services/indexedDB'

function App() {
  // Initialize IndexedDB on app startup
  useEffect(() => {
    initDB()
      .then(() => {
        console.log('IndexedDB initialized successfully')
      })
      .catch((error) => {
        console.error('Failed to initialize IndexedDB:', error)
      })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
