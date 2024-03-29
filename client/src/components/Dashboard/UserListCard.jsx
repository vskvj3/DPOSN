import React, { useEffect, useState, useContext } from 'react'
import EthContext from '../../contexts/EthContext'
import Web3 from 'web3'
import NoProfile from '/src/assets/images/userprofile.png'

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function UserListCard() {
  const [allUsersAddress, setAllUsersAddress] = useState([])
  const [users, setUsers] = useState([])
  const {
    state: { contract, accounts, currentUserFollowing },
    dispatch,
  } = useContext(EthContext)
  useEffect(() => {
    if (contract != null) {
      fetchAllUsers()
    }
  }, [contract])

  useEffect(() => {
    if (allUsersAddress.length > 0 && currentUserFollowing != undefined) {
      fetchUsers()
    }
  }, [allUsersAddress, currentUserFollowing])

  async function fetchAllUsers() {
    const allUsers = await contract.methods
      .getAllUsers()
      .call({ from: accounts[0] })
    setAllUsersAddress(allUsers)
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
  async function fetchUsers() {
    const tempUserLists = []

    for (const userAddress of allUsersAddress) {
      if (
        currentUserFollowing != undefined &&
        !currentUserFollowing.includes(userAddress) &&
        userAddress.toLowerCase() !== accounts[0].toLowerCase()
      ) {
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
    }

    setUsers(tempUserLists)
  }

  async function followUser(userAddress) {
    try {
      if (!userAddress) {
        throw new Error('User address is required')
      }
      console.log('Following user:', userAddress)
      // Add logging for contract method call
      console.log('Calling followUser method with address:', userAddress)
      await contract.methods
        .followUser(accounts[0], userAddress)
        .send({ from: accounts[0] })
      dispatch({ type: 'FOLLOW_USER', payload: userAddress })
      fetchUsers() // Assuming this function updates the user list after following a user
      window.location.reload()
    } catch (error) {
      console.error('Error following user:', error.message)
      // Handle the error (e.g., display an error message to the user)
    }
  }

  if (currentUserFollowing === undefined) {
    return <div>Loading...</div>
  }
  return (
    <div className="w-full bg-white shadow-xl rounded-lg px-6 py-5 mt-4">
      <div className="flex items-center justify-between text-xl pb-2 border-b border-[#66666645]">
        <span> Users </span>
        <span>{users?.length}</span>
      </div>

      <div className="w-full flex flex-col gap-4 pt-4">
        {users?.map((user) => (
          <div key={user?._id} className="flex items-center justify-between">
            <img
              src={user?.profileUrl ? user?.profileUrl : NoProfile}
              alt={user?.userName}
              className="w-10 h-10 object-cover rounded-full"
            />
            <div className="flex-1 ml-4 mt-2">
              <p className="text-base font-medium text-ascent-1">
                {user?.userName ? user?.userName : 'User Name'}
              </p>
              <span className="text-sm text-ascent-2">
                {user?.status ? user?.status : ''}
              </span>
            </div>
            <button
              onClick={() => followUser(user._id)}
              className="hover:bg-primary-600 bg-[#0444a4] text-white font-semibold py-1 px-2 rounded-md"
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserListCard
