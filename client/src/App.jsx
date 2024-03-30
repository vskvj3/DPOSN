import { Routes, Route } from 'react-router-dom'
import './App.css'
import React, { useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfileCreation from './pages/ProfileCreation'
import Pages from './pages/Pages'
import ProfilePage from './pages/Profile'
import Cookies from 'js-cookie'

function App() {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        Cookies.remove('user')
        Cookies.remove('loggedIn')
        window.location.reload()
      })
      window.ethereum.on('accountsChanged', () => {
        console.log('changed')
        Cookies.remove('user')
        Cookies.remove('loggedIn')
        window.location.reload()
      })
    }
  })

  return (
    <>
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profilecreation" element={<ProfileCreation />} />
        <Route element={<Pages />} />
      </Routes>
    </>
  )
}

export default App
