import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import LeftSideBar from '../components/Dashboard/LeftSideBar'
import UserListCard from '../components/Dashboard/UserListCard'
import ProfileCard from '../components/Dashboard/ProfileCard'
import RightSideBar from '../components/Dashboard/RightSideBar'
import MainSection from '../components/Dashboard/MainSection'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { IoHomeSharp } from "react-icons/io5"
import { IoMdChatbubbles } from "react-icons/io"
import { HiUsers } from "react-icons/hi";
import { MdAccountCircle } from "react-icons/md";

function Dashboard() {
  const [value, setValue] = useState(0)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  console.log('screen width: ', screenWidth)
  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-[110px] lg:pb-10 2xl:px-40 bg-gradient-to-r to-red-300 from-slate-300 lg:rounded-lg h-screen overflow-hidden">
        <Navbar />
        {/* Desktop view */}
        <div className="hidden md:flex w-full gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <LeftSideBar />
          </div>

          {/* CENTER */}
          <div className="flex-1 h-full px-4 flex-col overflow-y-scroll rounded-lg no-scrollbar">
            <MainSection />
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <RightSideBar />
          </div>
        </div>
        {/* Mobile view */}
        {value === 0 && (
          <div className="flex md:hidden w-full gap-2 pt-5 pb-2 h-full">
            <div className="flex-1 h-full px-4 overflow-y-scroll rounded-lg no-scrollbar">
              <MainSection />
            </div>
          </div>
        )}
        {value === 1 && (
          <div className="flex md:hidden w-full gap-2 pt-5 pb-2 h-full">
            <div className="flex-1 h-full px-4 overflow-y-scroll rounded-lg no-scrollbar">
              <RightSideBar />
            </div>
          </div>
        )}
        {value === 2 && (
          <div className="flex md:hidden w-full gap-2 pt-5 pb-2 h-full">
            <div className="flex-1 h-full px-4 overflow-y-scroll rounded-lg no-scrollbar">
              <UserListCard />
            </div>
          </div>
        )}
        {value === 3 && (
          <div className="flex md:hidden w-full gap-2 pt-5 pb-2 h-full">
            <div className="flex-1 h-full px-4 overflow-y-scroll rounded-lg no-scrollbar">
              <ProfileCard />
            </div>
          </div>
        )}
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
            console.log('new value: ', newValue)
            console.log('value: ', value)
          }}
        >
          <BottomNavigationAction label="Home" icon={<IoHomeSharp />} />
          <BottomNavigationAction label="Chat" icon={<IoMdChatbubbles />} />
          <BottomNavigationAction label="Users" icon={<HiUsers />} />
          <BottomNavigationAction label="Account" icon={<MdAccountCircle />} />
        </BottomNavigation>
      </div>
    </>
  )
}

export default Dashboard
