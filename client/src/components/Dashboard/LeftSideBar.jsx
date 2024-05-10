import ProfileCard from './ProfileCard'
import React from 'react'
import UserListCard from './UserListCard'

function LeftSideBar({ handleUserListAndFollowListReload }) {
  return (
    <div>
      <div className="w-full pl-6 lg:pl-0">
        <ProfileCard />
      </div>
      <div>
        <UserListCard
          handleUserListAndFollowListReload={handleUserListAndFollowListReload}
        />
      </div>
    </div>
  )
}

export default LeftSideBar
