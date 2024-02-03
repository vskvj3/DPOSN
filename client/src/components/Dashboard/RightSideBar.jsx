import React from 'react'
import { requests } from '../../assets/tempdata'
import NoProfile from '/src/assets/images/userprofile.png'

function RightSideBar() {
  return (
    <div>
      <div className="w-full bg-slate-500 shadow-sm rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-xl pb-2 border-b border-[#66666645]">
          <span> Friend Request</span>
          <span>{requests?.length}</span>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {requests?.map(({ _id, requestFrom: from }) => (
            <div key={_id} className="flex items-center justify-between">
              <img
                src={from?.profileUrl ?? NoProfile}
                alt={from?.firstName}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1 ml-4">
                <p className="text-base font-medium text-ascent-1">
                  {from?.firstName} {from?.lastName}
                </p>
                <span className="text-sm text-ascent-2">
                  {from?.profession ?? 'No Profession'}
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
