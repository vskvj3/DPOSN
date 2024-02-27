import React, { useContext, useState, useEffect } from 'react'
import { LiaEditSolid } from 'react-icons/lia'
import moment from 'moment'
import EthContext from '../../contexts/EthContext'
import Web3 from 'web3'
import NoProfile from '../../assets/images/userprofile.png'
import { fetchUserData } from '../../utils/web3Utils'
const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function ProfileCard() {
  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  const [user, setUser] = useState({
    userName: '',
    imageCID: '',
    firstName: '',
    lastName: '',
    image: 'https://docs.material-tailwind.com/img/face-2.jpg',
    friends: [],
    views: null,
    createdAt: '',
    status: '',
  })

  useEffect(() => {
    if (contract != null) {
      const userData = fetchUserData(accounts[0], contract, accounts)
      userData.then((data) => {
        setUser({
          ...user,
          userName: Web3.utils.hexToAscii(data.userName).replace(/\0.*$/g, ''),
          firstName: Web3.utils
            .hexToAscii(data.firstName)
            .replace(/\0.*$/g, ''),
          lastName: Web3.utils.hexToAscii(data.lastName).replace(/\0.*$/g, ''),
          imageCID: data.imageCID,
          status: Web3.utils.hexToAscii(data.status).replace(/\0.*$/g, ''),
        })
        // console.log(data)
        console.log(data.imageCID)
      })
    }
  }, [contract])

  return (
    /* Rainbow border */
    <div className="w-full rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
      {/* Actual Component */}
      <div className="w-full bg-primary flex flex-col items-center rounded-xl px-6 py-4">
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
            <p className="text-lg font-medium text-ascent-1">{user.userName}</p>
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
          {/* <p className="text-xl text-ascent-1 font-semibold">
            {user?.friends?.length} Friends
          </p> */}

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
