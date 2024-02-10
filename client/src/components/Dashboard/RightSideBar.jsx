import React from 'react'
import { user, friends } from '../../assets/tempdata'
import NoProfile from '/src/assets/images/userprofile.png'

function RightSideBar() {
  return (
    <div>
      <div className="w-full bg-white shadow-xl rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-xl pb-2 border-b border-[#66666645]">
          <span> Circle </span>
          <span>{friends?.length}</span>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {friends?.map((friend) => (
            <div
              key={friend?._id}
              className="flex items-center justify-between"
            >
              <img
                src={friend?.profileUrl ?? NoProfile}
                alt={friend?.firstName}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1 ml-4">
                <p className="text-base font-medium text-ascent-1">
                  {friend?.firstName} {friend?.lastName}
                </p>
                <span className="text-sm text-ascent-2">
                  {friend?.profession ?? 'No Profession'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RightSideBar
