import React, { useContext } from 'react'
import UserLinks from './UserLinks'
import EthContext from '../../contexts/EthContext'
import { FaEthereum } from 'react-icons/fa'

function Navbar() {
  const {
    state: { contract, accounts, web3, networkID },
  } = useContext(EthContext)

  return (
    // move the userlinks to left most position
    <div className="flex justify-between items-center border-b border-gray-100 w-full lg:rounded-b-md  md:px-44 px-5 py-2 bg-white">
      <div className="text-3xl text-gray-900 dark:text-white font-roboto">
        <span className="text-black">DPOSN</span>
      </div>

      <div className="flex justify-center item-center ">
        <div className=" mr-5">
          {networkID ? (
            <div className="bg-slate-200 rounded-md p-3">
              <FaEthereum color="green" />
            </div>
          ) : (
            <div className="bg-slate-200 rounded-md p-3">
              <FaEthereum className=" text-red-700" />
            </div>
          )}
        </div>
        <UserLinks />
      </div>
    </div>
  )
}

export default Navbar
