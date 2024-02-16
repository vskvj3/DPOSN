import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar/Navbar'
import EthContext from '../contexts/EthContext'

import Web3 from 'web3'
function ProfilePage() {
  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  const [user, setUser] = useState({
    fname: 'sdfd',
    lname: 'xkdngwkdebng',
    followers: [],
    following: [],
  })
  const [posts, setPosts] = useState([])

  async function init() {
    const data = await contract.methods
      .getUser(accounts[0])
      .call({ from: accounts[0] })
    return data
  }

  useEffect(() => {
    if (contract != null) {
      const userData = init()
      userData.then((data) => {
        setUser({
          ...user,
          fname: Web3.utils.hexToAscii(data.firstName).replace(/\0.*$/g, ''),
          lname: Web3.utils.hexToAscii(data.lastName).replace(/\0.*$/g, ''),
        })
      })
    }
  }, [contract])

  if (!user) {
    return <div>User Data Not Found...</div>
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <Navbar />
        <div className="grid place-content-center w-screen h-screen bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
          <div className="bg-white w-[23rem] h-[24rem]  sm:w-[26rem] sm:h-[25rem]  flex flex-col items-center rounded-lg">
            <img
              className="w-20 h-20 rounded-full mt-4"
              src={user.profilePicture}
              alt="Profile"
            />
            <h1 className="mt-4 text-xl">
              {user.fname} {user.lname}
            </h1>
            <p className="mt-2 text-xs text-gray-500 h-3px">
              {user.followers.length} followers
            </p>
            <p className="mt-2 text-xs text-gray-500 h-3px">
              {user.following.length} followings
            </p>
            <p className="mt-2 text-xs text-gray-500 h-3px">
              {posts.length} posts
            </p>

            <button className="h-10 bg-pink-600 mt-5 rounded-lg text-white">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid place-content-center w-screen h-screen bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
        <div className="bg-white w-[23rem] h-[24rem]  sm:w-[26rem] sm:h-[25rem]  flex flex-col items-center rounded-lg">
          <h1 className="mt-4 text-xl">Posts</h1>
          {posts.map((post) => (
            <div key={post.id} className="w-80 h-20 mt-4 flex flex-col">
              <img
                className="w-full h-full object-cover"
                src={post.image}
                alt="Post"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProfilePage
