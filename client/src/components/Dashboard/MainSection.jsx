import React, { useState, useContext, useEffect } from 'react'
import PostCard from './PostCard'
import NewPost from './NewPost'
import EthContext from '../../contexts/EthContext'
import Web3 from 'web3'
import { fetchUserData, fetchAllPosts } from '../../utils/web3Utils'
import { fetchJSONFromIPFS } from '../../utils/PinataUtils'

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function MainSection() {
  const [posts, setPosts] = useState([])
  const [allPostData, setAllPostData] = useState([])
  const [postContent, setPostContent] = useState([])

  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  useEffect(() => {
    if (contract != null) {
      const fetchedData = fetchAllPosts(contract, accounts)
      fetchedData.then((data) => {
        setAllPostData(data)
      })
    }
  }, [contract])

  const tempContent = []

  useEffect(() => {
    if (allPostData.length != 0 && postContent.length === 0) {
      for (let i = 0; i < allPostData.length; i++) {
        const fetchedContent = fetchJSONFromIPFS(allPostData[i].postCID)

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
        const fetchedUserData = await fetchUserData(
          allPostData[i].userAddress,
          contract,
          accounts
        )
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
