import React from 'react'
import Home from './Home'
import Dashboard from './Dashboard'

let logedIn = false

function Pages() {
  return <>{logedIn ? <Dashboard /> : <Home />}</>
}

export default Pages
