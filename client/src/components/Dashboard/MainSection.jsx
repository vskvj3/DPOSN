import React, { useState } from 'react'
import { posts, user } from '../../assets/tempdata'
import PostCard from './PostCard'
import NewPost from './NewPost'

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
