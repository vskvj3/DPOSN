import React, { useContext, useEffect, useState } from 'react'
import userContext from './UserContext'
import EthContext from './EthContext'
import Web3 from 'web3'
import { fetchUserData } from '../utils/web3Utils'
import NoProfile from '../assets/images/userprofile.png'

function UserProvider({ children }) {
  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  const [user, setUser] = useState({
    userName: '',
    imageCID: '',
    firstName: '',
    lastName: '',
    image: NoProfile,
    followers: [],
    following: [],
    createdAt: '',
    status: '',
  })

  useEffect(() => {
    if (contract != null) {
      const userData = fetchUserData(accounts[0], contract, accounts)
      userData.then((data) => {
        setUser({
          ...user,
          userName: Web3.utils.hexToAscii(data.userName).replace(/\0.*$/g, ''),
          firstName: Web3.utils
            .hexToAscii(data.firstName)
            .replace(/\0.*$/g, ''),
          lastName: Web3.utils.hexToAscii(data.lastName).replace(/\0.*$/g, ''),
          imageCID: data.imageCID,
          status: Web3.utils.hexToAscii(data.status).replace(/\0.*$/g, ''),
          createdAt: data.createdAt,
          address: accounts[0],
          followers: data.followers,
          following: data.following,
        })
        // console.log(data)
        console.log(data.followers)
      })
    }
  }, [contract])

  return <userContext.Provider value={user}>{children}</userContext.Provider>
}

export default UserProvider
