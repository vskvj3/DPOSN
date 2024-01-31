import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <Navbar />
      <div className="grid place-content-center w-screen h-screen bg-gradient-to-r  to-red-300 from-blue-300">
        <div className="bg-white w-[23rem] h-[23rem]  sm:w-[26rem] sm:h-[23rem]  flex flex-col items-center place-content-center rounded-lg shadow-xl">
          <h1 className="mt-4 text-xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400">
              DPOSN
            </span>
          </h1>
          <ul>
            <li>
              <Link to="/signup">
                <button
                  className="h-10 bg-pink-600 mt-5 min-w-60 rounded-lg text-white"
                  onClick={console.log('Pressed')}
                >
                  Create account
                </button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button
                  className="h-10 bg-pink-600 mt-5 min-w-60 rounded-lg text-white"
                  onClick={console.log('Pressed')}
                >
                  Login here
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home
