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

  const {
    state: { contract, accounts },
  } = useContext(EthContext)

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

  async function fetchContentFromIPFS(postCID) {
    const content = await fetch(`${PINATA_GATEWAY}/ipfs/${postCID}`, {
      method: 'GET',
      headers: { accept: 'text/plain' },
    })
    return await content.json()
  }

  async function fetchPosts() {
    const allPostData = await fetchAllPosts()

    const postContent = []

    if (allPostData.length != 0) {
      for (let i = 0; i < allPostData.length; i++) {
        const fetchedContent = await fetchContentFromIPFS(
          allPostData[i].postCID
        )
        postContent.push(fetchedContent)
      }

      const tempPosts = []

      for (let i = 0; i < postContent.length; i++) {
        const fetchedUserData = await fetchUserData(allPostData[i].userAddress)
        console.log(fetchedUserData)

        tempPosts.push({
          _id: allPostData[i].postCID,
          profileUrl: fetchedUserData.imageCID
            ? `${PINATA_GATEWAY}/ipfs/${fetchedUserData.imageCID}`
            : '',

          userName: Web3.utils
            .hexToAscii(fetchedUserData.userName)
            .replace(/\0.*$/g, ''),
          createdAt: postContent[i].time,
          image: postContent[i].image
            ? `${PINATA_GATEWAY}/ipfs/${postContent[i].image}`
            : '',
          description: postContent[i].post,
        })
      }

      console.log('posts from mainsection:')
      console.log(tempPosts)
      tempPosts.reverse()

      setPosts(tempPosts)
    }
  }

  useEffect(() => {
    if (contract != null) {
      fetchPosts()
    }
  }, [contract])

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
