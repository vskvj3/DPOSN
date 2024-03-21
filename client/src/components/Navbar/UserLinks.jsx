import React, { useEffect } from 'react'
import { FaEthereum } from 'react-icons/fa'

function UserLinks() {
  // check status of metamask connection
  const [connectionStatus, setConnectionStatus] = React.useState(false)

  useEffect(() => {
    if (window.ethereum) {
      if (window.ethereum.isMetaMask) {
        window.ethereum
          .request({ method: 'eth_accounts' })
          .then((accounts) => {
            if (accounts.length > 0) {
              setConnectionStatus(true)
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }, [window.ethereum])

  return (
    <>
      <div className="flex justify-center items-center cursor-pointer">
        {connectionStatus ? (
          <div className=" bg-green-400 rounded-xl py-1 px-3 mr-1 text-gray-700">
            <FaEthereum />
          </div>
        ) : (
          <div className=" bg-red-400 rounded-xl py-1 px-3 mr-1 text-gray-700">
            <FaEthereum />
          </div>
        )}
        <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mx-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
      </div>
    </>
  )
}

export default UserLinks
