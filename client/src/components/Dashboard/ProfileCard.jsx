import React from 'react'
import { LiaEditSolid } from 'react-icons/lia'
import moment from 'moment'

let user = {
  firstName: 'Visak',
  lastName: 'Vijay',
  image: 'https://docs.material-tailwind.com/img/face-2.jpg',
  friends: ['one', 'two'],
  views: 5,
  createdAt: '2015-03-25',
  status: 'being me',
}

function ProfileCard() {
  return (
    <div>
      <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4 ">
        {/* Profile Badge */}
        <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645]">
          <img
            src={user?.image}
            alt="avatar"
            className="w-14 h-14 object-cover rounded-full"
          />
          <div className="flex flex-col justify-center">
            <p className="text-lg font-medium text-ascent-1">
              {user?.firstName} {user?.lastName}
            </p>
            <span className="text-ascent-2">{user?.status ?? ''}</span>
          </div>

          <div className="">
            <LiaEditSolid
              size={22}
              className="text-blue cursor-pointer"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Profile Status */}
        <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
          <p className="text-xl text-ascent-1 font-semibold">
            {user?.friends?.length} Friends
          </p>
          <div className="flex items-center justify-between">
            <span className="text-ascent-2">Profile Views</span>
            <span className="text-ascent-1 text-lg">{user?.views}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ascent-2">Joined</span>
            <span className="text-ascent-1 text-base">
              {moment(user?.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
