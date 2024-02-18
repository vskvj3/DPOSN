import React, { useState, useContext, useEffect } from 'react'
// import { user } from '../../assets/tempdata'
import PostCard from './PostCard'
import NewPost from './NewPost'
import EthContext from '../../contexts/EthContext'
import Web3 from 'web3'

// const posts = {
//   _id: '1',
//   description: 'This is a post',
//   userId: user,
//   createdAt: '2023-05-25',
// }

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function MainSection() {
  const [posts, setPosts] = useState([])
  const [allPostData, setAllPostData] = useState([])
  const [postContent, setPostContent] = useState([])

  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  async function fetchUserData() {
    const data = await contract.methods
      .getUser(accounts[0])
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
    console.log(allPostData)
    return allPostData
  }

  async function fetchContentFromIPFS(postCID) {
    const content = await fetch(`${PINATA_GATEWAY}/ipfs/${postCID}`, {
      method: 'GET',
      headers: { accept: 'text/plain' },
    })
    return await content.json()
  }

  useEffect(() => {
    if (contract != null) {
      const fetchedData = fetchAllPosts()
      fetchedData.then((data) => {
        setAllPostData(data)
      })
    }
  }, [contract])

  const tempContent = []

  useEffect(() => {
    if (allPostData.length != 0 && postContent.length === 0) {
      for (let i = 0; i < allPostData.length; i++) {
        const fetchedContent = fetchContentFromIPFS(allPostData[i].postCID)

        fetchedContent.then((data) => {
          tempContent.push(data)
          setPostContent(tempContent)
        })
      }
    }
  }, [allPostData])

  const tempPosts = []
  useEffect(() => {
    if (postContent.length != 0) {
      for (let i = 0; i < postContent.length; i++) {
        const fetchedUserData = fetchUserData(allPostData.userAddress)
        fetchedUserData.then((data) =>
          tempPosts.push({
            _id: allPostData[i].postCID,
            profileUrl: data.imageCID
              ? `${PINATA_GATEWAY}/ipfs/${data.imageCID}`
              : '',
            UserName: Web3.utils
              .hexToAscii(data.userName)
              .replace(/\0.*$/g, ''),
            createdAt: postContent[i].time,
            image: postContent[i].image
              ? `${PINATA_GATEWAY}/ipfs/${postContent[i].image}`
              : '',
            description: postContent[i].post,
          })
        )
      }
      setPosts(tempPosts)
    }
  }, [postContent])

  return (
    <div>
      <NewPost />
      {posts?.map((post) => (
        <PostCard
          key={post?._id}
          post={post}
          deletePost={() => {}}
          likePost={() => {}}
        />
      ))}
    </div>
  )
}

export default MainSection
