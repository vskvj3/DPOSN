import React from 'react'
import Navbar from '../compments/navbar/Navbar'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <Navbar />
      <div>
        <ul>
          <li>
            <Link to="/signup">Create account</Link>
          </li>
          <li>
            <Link to="/login">Login here</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Home
