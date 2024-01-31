import React from 'react'
import Home from './Home'
import Dashboard from './Dashboard'

let logedIn = true

function Pages() {
  return <>{logedIn ? <Dashboard /> : <Home />}</>
}

export default Pages
