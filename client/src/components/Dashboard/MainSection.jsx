import React from 'react'
import { posts, user } from '../../assets/tempdata'
import PostCard from './PostCard'
import NewPost from './NewPost'

function MainSection() {
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
