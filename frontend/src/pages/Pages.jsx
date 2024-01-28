import React from 'react'
import Home from './Home'
import Navbar from '../compments/navbar/Navbar'
import LoginPage from './LoginPage'

let logedIn = false

function Pages() {
  return (
    <>
      <Navbar />
      {logedIn ? <Home /> : <LoginPage />}
    </>
  )
}

export default Pages
