import React from 'react'

import { posts, user } from '../../assets/tempdata'
import PostCard from './PostCard'

function MainSection() {
  return (
    <div>
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
