import React, { useState, useContext, useEffect } from 'react'
// import { user } from '../../assets/tempdata'
import PostCard from './PostCard'
import NewPost from './NewPost'
import EthContext from '../../contexts/EthContext'
import Web3 from 'web3'
import { fetchJSONFromIPFS } from '../../utils/PinataUtils'
import { func } from 'prop-types'

// const posts = {
//   _id: '1',
//   description: 'This is a post',
//   userId: user,
//   createdAt: '2023-05-25',
// }

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function MainSection() {
  const [allposts, setAllPosts] = useState([])
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
          postContent.push({
            ...fetchedContent,
            ...fetchedUserData,
            userAddress: allPostData[i].userAddress,
          })
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
          userAddress: postContent[i].userAddress,
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

      setAllPosts(tempPosts)
    }
  }

  const [comment, setComment] = useState()

  useEffect(() => {
    if (contract != null) {
      fetchPosts()
    }
  }, [contract])

  const [postType, setPostType] = useState('Global')

  function handleGlobal() {
    setPostType('Global')
    setPosts(allposts)
  }

  function handleYourPosts() {
    let tempPost = []
    for (let i = 0; i < allposts.length; i++) {
      if (allposts[i].userAddress.toLowerCase() === accounts[0].toLowerCase()) {
        tempPost.push(allposts[i])
      }
    }

    setPostType('Your Posts')
    setPosts(tempPost)
  }

  async function handleFollowing() {
    const currentUserFollowing = await contract.methods
      .getFollowedUsers()
      .call({ from: accounts[0] })

    let tempPost = []
    for (let i = 0; i < allposts.length; i++) {
      for (let j = 0; j < currentUserFollowing.length; j++) {
        if (
          allposts[i].userAddress.toLowerCase() ===
          currentUserFollowing[j].toLowerCase()
        ) {
          tempPost.push(allposts[i])
        }
      }
    }
    setPostType('Following')
    setPosts(tempPost)
  }

  return (
    <div>
      <NewPost />

      <div className="grid grid-flow-col justify-stretch mb-2 bg-primary h-10 rounded-xl shadow-xl">
        <div
          onClick={handleGlobal}
          className={`flex justify-center items-center rounded-l-xl  ${postType === 'Global' ? 'bg-slate-400' : ''}`}
        >
          Global
        </div>
        <div
          onClick={handleYourPosts}
          className={`flex justify-center items-center ${postType === 'Your Posts' ? 'bg-slate-400' : ''}`}
        >
          Your Posts
        </div>
        <div
          onClick={handleFollowing}
          className={`flex justify-center items-center rounded-r-xl ${postType === 'Following' ? 'bg-slate-400' : ''}`}
        >
          Following
        </div>
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
  )
}

export default MainSection
