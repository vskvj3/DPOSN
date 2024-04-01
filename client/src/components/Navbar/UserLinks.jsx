import React, { useEffect } from 'react'
import { FaEthereum } from 'react-icons/fa'
import { BiLogOutCircle } from 'react-icons/bi'
import Cookies from 'js-cookie'

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

  function logoutUser() {
    console.log('logging out')
    Cookies.remove('user')
    Cookies.remove('loggedIn')
    window.location.reload()
  }
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
        <div>
          <BiLogOutCircle onClick={() => logoutUser()} size={28} />
        </div>
      </div>
    </>
  )
}

export default UserLinks
