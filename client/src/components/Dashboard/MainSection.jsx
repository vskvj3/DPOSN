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

  async function fetchPosts() {
    if (postContent.length != 0 && posts.length === 0) {
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

      setPosts(tempPosts)
    }
  }

  useEffect(() => {
    if (postContent.length != 0 && posts.length === 0) {
      fetchPosts()
    }
  }, [postContent])

  // useEffect(() => {
  //   console.log(posts)
  // }, [posts])


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
