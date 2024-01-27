import React from 'react'

function Navbar() {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 w-full px-44 py-2">
      {/* <Link to="/"> */}
      <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-roboto">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400">
          DPOSN
        </span>{' '}
        App
      </div>
      {/* </Link> */}
      <div className="flex justify-center item-center mx-auto">
        {/* <NavLinks></NavLinks> */}
        navbar links
      </div>
      <div>
        {/* <UserLinks></UserLinks> */}
        user links
      </div>
    </div>
  )
}

export default Navbar
