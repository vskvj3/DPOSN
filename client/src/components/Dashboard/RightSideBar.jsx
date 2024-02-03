import React from 'react'
import { request } from '../../assets/tempdata'

function RightSideBar() {
  return (
    <div>
      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
          <span> Friend Request</span>
          <span>{friendRequest?.length}</span>
        </div>
      </div>
    </div>
  )
}

export default RightSideBar
