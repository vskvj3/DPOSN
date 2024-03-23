import React from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Cookies from 'js-cookie'

function Pages() {
  let logedIn = Cookies.get('loggedIn')
  console.log('logged in cookie: ' + logedIn)

  return <>{logedIn ? <Dashboard /> : <Home />}</>
}

export default Pages
