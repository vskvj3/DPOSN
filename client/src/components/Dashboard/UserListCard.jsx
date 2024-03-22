import React, { useEffect, useState, useContext } from 'react'
import EthContext from '../../contexts/EthContext'
import Web3 from 'web3'
import NoProfile from '/src/assets/images/userprofile.png'

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function UserListCard() {
  const [allUsersAddress, setAllUsersAddress] = useState([])
  const [users, setUsers] = useState([])
  const tempUserList = []
  const {
    state: { contract, accounts },
  } = useContext(EthContext)
  useEffect(() => {
    if (contract != null) {
      const fetchedData = fetchAllUsers()
      fetchedData.then((data) => {
        setAllUsersAddress(data)
      })
    }
  }, [contract])

  useEffect(() => {
    if (allUsersAddress) {
      fetchUsers()
    }
  }, [allUsersAddress])

  async function fetchAllUsers() {
    const allUsers = await contract.methods
      .getAllUsers()
      .call({ from: accounts[0] })

    return allUsers
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
    if (allUsersAddress) {
      for (let i = 0; i < allUsersAddress.length; i++) {
        if (allUsersAddress[i].toLowerCase() === accounts[0].toLowerCase()) {
          console.log('user found')
          continue
        }
        const fetchedUserData = await fetchUserData(allUsersAddress[i])
        console.log(fetchedUserData)

        tempUserList.push({
          _id: fetchedUserData.userAddress,
          profileUrl: fetchedUserData.imageCID
            ? `${PINATA_GATEWAY}/ipfs/${fetchedUserData.imageCID}`
            : '',
          userName: Web3.utils
            .hexToAscii(fetchedUserData.userName)
            .replace(/\0.*$/g, ''),
          status: Web3.utils
            .hexToAscii(fetchedUserData.status)
            .replace(/\0.*$/g, ''),
        })
      }
      console.log('posts from mainsection:')
      console.log(tempUserList)
      setUsers(tempUserList)
    }
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
            <button className="hover:bg-primary-600 bg-[#0444a4] text-white font-semibold py-1 px-2 rounded-md">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserListCard
