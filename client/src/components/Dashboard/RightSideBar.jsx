import React, { useEffect, useState, useContext } from 'react'
import EthContext from '../../contexts/EthContext'
import Web3 from 'web3'
import NoProfile from '/src/assets/images/userprofile.png'

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function RightSideBar() {
  const [followedUsers, setFollowedUsers] = useState([])
  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  useEffect(() => {
    if (contract != null) {
      fetchFollowedUsers()
    }
  }, [contract])

  async function fetchFollowedUsers() {
    try {
      const followedUsers = await contract.methods
        .getFollowedUsers()
        .call({ from: accounts[0] })
      const tempUserLists = []

      for (const userAddress of followedUsers) {
        const userData = await fetchUserData(userAddress)
        tempUserLists.push({
          _id: userData.userAddress,
          profileUrl: userData.imageCID
            ? `${PINATA_GATEWAY}/ipfs/${userData.imageCID}`
            : '',
          userName: Web3.utils
            .hexToAscii(userData.userName)
            .replace(/\0.*$/g, ''),
          status: Web3.utils.hexToAscii(userData.status).replace(/\0.*$/g, ''),
        })
      }

      setFollowedUsers(tempUserLists)
    } catch (error) {
      console.error('Error fetching followed users:', error)
    }
  }

  async function fetchUserData(userAddress) {
    const data = await contract.methods
      .getUser(userAddress)
      .call({ from: accounts[0] })
      .catch((err) => {
        console.log(err)
      })
    return data
  }

  return (
    <div>
      <div className="w-full bg-white shadow-xl rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-xl pb-2 border-b border-[#66666645]">
          <span> Circle </span>
          <span>{followedUsers.length}</span>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {followedUsers.map((user) => (
            <div key={user?._id} className="flex items-center justify-between">
              <img
                src={user?.profileUrl ? user?.profileUrl : NoProfile}
                alt={user?.userName}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1 ml-4">
                <p className="text-base font-medium text-ascent-1">
                  {user?.userName ? user?.userName : 'User Name'}
                </p>
                <span className="text-sm text-ascent-2">
                  {user?.status ? user?.status : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RightSideBar
