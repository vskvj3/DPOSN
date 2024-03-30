import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import EthContext from '../contexts/EthContext'
import Web3 from 'web3'
import NoProfile from '../assets/images/userprofile.png'
import { fetchJSONFromIPFS } from '../utils/PinataUtils'
import PostCard from '../components/Dashboard/PostCard'
const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function ProfilePage() {
  const location = useLocation()
  const userAddress = new URLSearchParams(location.search).get('user')

  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  const [user, setUser] = useState({
    fname: '',
    lname: '',
    followers: [],
    following: [],
  })
  const [posts, setPosts] = useState([])

  async function init() {
    const data = await contract.methods
      .getUser(userAddress)
      .call({ from: accounts[0] })
    return data
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

  async function fetchAllPosts() {
    const allPostData = await contract.methods
      .getPosts()
      .call({ from: accounts[0] })

    return allPostData
  }

  async function fetchPosts() {
    const allPostData = await fetchAllPosts()

    const postContent = []

    if (allPostData.length != 0) {
      const fetchedUserData = await fetchUserData(userAddress)
      for (let i = 0; i < allPostData.length; i++) {
        if (
          allPostData[i].userAddress.toLowerCase() == userAddress.toLowerCase()
        ) {
          const fetchedContent = await fetchJSONFromIPFS(allPostData[i].postCID)
          if (fetchedContent != null) {
            postContent.push({ ...fetchedContent, ...fetchedUserData })
          }
        }
      }

      const tempPosts = []

      console.log(postContent)

      for (let i = 0; i < postContent.length; i++) {
        let commentCID = ''
        let likesCID = ''
        let reportsCID = ''

        try {
          commentCID = await contract.methods
            .getComment(allPostData[i].postCID)
            .call({ from: accounts[0] })
        } catch (error) {
          console.log('in comment: ', error)
        }
        try {
          likesCID = await contract.methods
            .getLikes(allPostData[i].postCID)
            .call({ from: accounts[0] })
        } catch (error) {
          console.log('in likes: ', error)
        }
        try {
          reportsCID = await contract.methods
            .getReports(allPostData[i].postCID)
            .call({ from: accounts[0] })
        } catch (error) {
          console.log('in reports: ', error)
        }

        let commentData = []
        let likesData = []
        let reportsData = []

        if (commentCID) {
          commentData = await fetchJSONFromIPFS(commentCID)
        }

        if (likesCID) {
          likesData = await fetchJSONFromIPFS(likesCID)
        }

        if (reportsCID) {
          reportsData = await fetchJSONFromIPFS(reportsCID)
        }

        tempPosts.push({
          _id: allPostData[i].postCID,
          profileUrl: postContent[i].imageCID
            ? `${PINATA_GATEWAY}/ipfs/${postContent[i].imageCID}`
            : '',

          userName: Web3.utils
            .hexToAscii(postContent[i].userName)
            .replace(/\0.*$/g, ''),
          createdAt: postContent[i].time,
          image: postContent[i].image
            ? `${PINATA_GATEWAY}/ipfs/${postContent[i].image}`
            : '',
          description: postContent[i].post,
          comment: commentData,
          likes: likesData,
          reports: reportsData,
        })
      }

      tempPosts.reverse()
      console.log('tempPost')
      console.log(tempPosts)

      setPosts(tempPosts)
    }
  }

  useEffect(() => {
    if (contract != null) {
      const userData = init()
      userData.then((data) => {
        setUser({
          ...user,
          fname: Web3.utils.hexToAscii(data.firstName).replace(/\0.*$/g, ''),
          lname: Web3.utils.hexToAscii(data.lastName).replace(/\0.*$/g, ''),
          status: Web3.utils.hexToAscii(data.status).replace(/\0.*$/g, ''),
          imageCID: data.imageCID,
          followers: data.followers,
          following: data.following,
        })
      })
    }
  }, [contract])

  useEffect(() => {
    if (contract != null) {
      fetchPosts()
      console.log(posts)
    }
  }, [contract])

  console.log(user)

  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-gradient-to-r to-red-300 from-slate-300 lg:rounded-lg h-screen overflow-hidden">
        <Navbar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            {/* <LeftSideBar /> */}
          </div>

          {/* CENTER */}
          <div className="flex-1 h-full px-4 flex flex-col overflow-y-auto rounded-lg no-scrollbar">
            <div className="bg-white flex flex-col items-center rounded-lg py-5 my-5">
              <img
                className="w-20 h-20 rounded-full mt-4"
                src={user.imageCID ? user.imageCID : NoProfile}
                alt="Profile"
              />

              <h1 className="mt-4 text-xl">
                {user.fname} {user.lname}
              </h1>
              <h2 className=" text-md">{user.status}</h2>
              <p className="mt-2 text-xs text-gray-500 h-3px">
                {user.followers.length} followers
              </p>
              <p className="mt-2 text-xs text-gray-500 h-3px">
                {user.following.length} followings
              </p>
              <p className="mt-2 text-xs text-gray-500 h-3px">
                {posts.length} posts
              </p>
              {console.log('accounts')}
              {console.log(accounts)}
              {user.address == accounts ? (
                <button className="h-10 bg-pink-600 mt-5 rounded-lg text-white">
                  Edit Profile
                </button>
              ) : (
                ''
              )}
            </div>

            {posts?.map((post) => (
              <PostCard
                key={post?._id}
                post={post}
                comments={post.comment}
                likes={post.likes}
                reports={post.reports}
              />
            ))}
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            {/* <RightSideBar /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
