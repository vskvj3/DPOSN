import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

function Home() {
  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r to-red-300 from-slate-300 overflow-hidden">
        <Navbar />
        <div className="grid place-content-center h-full">
          <div className="bg-white w-[23rem] h-[26rem]  sm:w-[26rem] sm:h-[26rem]  flex flex-col items-center place-content-center rounded-lg shadow-xl">
            <h1 className=" my-16 text-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-slate-600">
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
                  <button className="h-10 bg-pink-600 mt-5 min-w-60 rounded-lg text-white">
                    Login here
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
