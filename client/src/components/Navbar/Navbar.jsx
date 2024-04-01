import React from 'react'
import UserLinks from './UserLinks'
import Hamburger from './Hamburger'
import './index.css'

function Navbar() {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 w-full lg:rounded-b-md  md:px-44 px-5 py-2 bg-white">
      <div className="text-3xl text-gray-900 dark:text-white font-roboto">
        <span className="text-black">DPOSN</span>
      </div>
      <div className="flex justify-center item-center ">
        <UserLinks />
      </div>
    </div>
  )
}

export default Navbar
