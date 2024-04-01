import React, { useContext } from 'react'
import { LiaEditSolid } from 'react-icons/lia'
import moment from 'moment'
import UserContext from '../../contexts/UserContext'
import NoProfile from '../../assets/images/userprofile.png'
import { Link } from 'react-router-dom'

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function ProfileCard() {
  const user = useContext(UserContext)

  console.log('user :', user)
  return (
    /* Rainbow border */
    <div className="w-full rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
      {/* Actual Component */}
      <Link to="/profilecreation">
        <div
          className="w-full bg-primary flex flex-col items-center rounded-xl px-6 py-4"
          onClick={() => console.log('cliec')}
        >
          {/* Profile Badge */}
          <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645]">
            <img
              src={
                user.imageCID
                  ? `${PINATA_GATEWAY}/ipfs/${user.imageCID}`
                  : NoProfile
              }
              alt="avatar"
              className="w-14 h-14 object-cover rounded-full"
            />
            {/* {console.log(`${PINATA_GATEWAY}/ipfs/${user.imageCID}`)} */}
            {/* {console.log(user.imageCID)} */}
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium text-ascent-1">
                {user.userName}
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
            <p className="text-md text-ascent-1">
              {user?.followers?.length} Peers
            </p>

            <div className="flex items-center justify-between">
              <span className="text-ascent-2">Joined</span>
              <span className="text-ascent-1 text-base">
                {moment(user?.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProfileCard
