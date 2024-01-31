import React from 'react'
import Navbar from '../components/navbar/Navbar'
import LeftSideBar from '../components/Dashboard/LeftSideBar'
import RightSideBar from '../components/Dashboard/RightSideBar'

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="fixed top-0 z-10 w-full bg-white"></div>
        <div className="flex bg-gray-100 ">
          <div className="flex-auto w-[20%] fixed top-12">
            <LeftSideBar />
          </div>
          <div className="flex-auto w-[20%] fixed right-0 top-12">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
