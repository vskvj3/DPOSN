import React, { useState, useContext, useEffect } from 'react'
// import { user } from '../../assets/tempdata'
import PostCard from './PostCard'
import NewPost from './NewPost'
import EthContext from '../../contexts/EthContext'
import Web3 from 'web3'
import { fetchJSONFromIPFS } from '../../utils/PinataUtils'

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

  // async function fetchContentFromIPFS(postCID) {
  //   const content = await fetch(`${PINATA_GATEWAY}/ipfs/${postCID}`, {
  //     method: 'GET',
  //     headers: { accept: 'text/plain' },
  //   })
  //   return await content.json()
  // }

  async function fetchPosts() {
    const allPostData = await fetchAllPosts()

    const postContent = []

    if (allPostData.length != 0) {
      for (let i = 0; i < allPostData.length; i++) {
        const fetchedContent = await fetchJSONFromIPFS(allPostData[i].postCID)
        const fetchedUserData = await fetchUserData(allPostData[i].userAddress)
        if (fetchedContent != null) {
          postContent.push({ ...fetchedContent, ...fetchedUserData })
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

      setPosts(tempPosts)
    }
  }

  const [comment, setComment] = useState()

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
          comments={post.comment}
          likes={post.likes}
          reports={post.reports}
        />
      ))}
    </div>
  )
}

export default MainSection
