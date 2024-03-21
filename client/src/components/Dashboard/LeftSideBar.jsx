import ProfileCard from './ProfileCard'
import React from 'react'
import UserListCard from './UserListCard'

function LeftSideBar() {
  return (
    <div>
      <div className="w-full pl-6 lg:pl-0">
        <ProfileCard />
      </div>
      <div>
        <UserListCard />
      </div>
    </div>
  )
}

export default LeftSideBar
