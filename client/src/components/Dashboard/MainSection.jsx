import React, { useState } from 'react'
import { user } from '../../assets/tempdata'
import PostCard from './PostCard'
import NewPost from './NewPost'

const posts = {
  _id: '1',
  description: 'This is a post',
  userId: user,
  createdAt: '2023-05-25',
}

async function fetchPosts() {
  return [posts]
}

function MainSection() {
  // const [posts, setPosts] = useState([])
  // const [user, setUser] = useState([])

  // useEffect(() => {
  //   const { posts, user } = {}
  // }, [])

  return (
    <div>
      <NewPost />
      {posts?.map((post) => (
        <PostCard
          key={post?._id}
          post={post}
          user={user}
          deletePost={() => {}}
          likePost={() => {}}
        />
      ))}
    </div>
  )
}

export default MainSection
