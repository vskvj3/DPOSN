import React, { useEffect, useState, useContext } from 'react'
import EthContext from '../../contexts/EthContext'
import Web3 from 'web3'
import NoProfile from '/src/assets/images/userprofile.png'
import { Link } from 'react-router-dom'

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

import {
  pinFileToIPFS,
  pinJSONToIPFS,
  fetchJSONFromIPFS,
} from '../../utils/PinataUtils'

function RightSideBar() {
  const [followedUsers, setFollowedUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [chatHistory, setChatHistory] = useState([])
  const [newMessage, setNewMessage] = useState('')
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

  const sendMessage = async () => {
    if (!newMessage || !selectedUser) return
    try {
      chatHistory.push({ sender: accounts[0], newMessage })

      const chatCID = await pinJSONToIPFS(chatHistory)

      await contract.methods
        .sendMessage(accounts[0], selectedUser._id, chatCID)
        .send({ from: accounts[0] })
      setNewMessage('')
      loadChatHistory()
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const loadChatHistory = async () => {
    if (!selectedUser) return
    try {
      const chatCID = await contract.methods
        .getMessage(accounts[0], selectedUser._id)
        .call({ from: accounts[0] })

      if (chatCID) {
        const chat = await fetchJSONFromIPFS(chatCID)

        console.log(chat)

        if (Array.isArray(chat)) {
          setChatHistory(chat)
        } else {
          setChatHistory([])
        }
      }
    } catch (error) {
      console.error('Error fetching chat history:', error)
      setChatHistory([])
    }
  }

  function handleUserClick(user) {
    setSelectedUser(user)
    loadChatHistory()
  }

  return (
    <div>
      <div className="w-full bg-white shadow-xl rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-xl pb-2 border-b border-[#66666645]">
          <span> Circle </span>
          <span>{followedUsers.length}</span>
        </div>
        <div
          className="w-full flex flex-col gap-4 pt-4"
          // style={{
          //   maxHeight: '240px', // Adjust as needed
          //   overflowY: 'scroll',
          //   scrollbarWidth: 'none', // Firefox
          //   msOverflowStyle: 'none', // IE and Edge
          // }}
        >
          {followedUsers.map((user) => (
            <div
              key={user?._id}
              className="flex items-center justify-between"
              onClick={() => handleUserClick(user)}
            >
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
      <div className="w-full bg-white shadow-xl rounded-lg px-6 py-5 mt-4 h-full">
        <div className="text-xl pb-2 border-b border-[#66666645]">
          <span> Chat with {selectedUser?.userName}</span>
        </div>
        <div
          className="px-4 py-2 overflow-y-auto bg-slate-100 rounded-md max-h-[240px] mt-2" // Adjusted max height to accommodate the send button
        >
          {chatHistory.map((message, index) => (
            <div key={index} className="mb-2">
              <span
                className={
                  message.sender === accounts[0] ? 'text-right block' : 'block'
                }
              >
                {message.newMessage}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#66666645] mt-2">
          <div className="flex mt-3 justify-between">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="px-4 py-2 bg-slate-200 rounded-md"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue text-white rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSideBar
