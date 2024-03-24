import React, { useContext } from 'react'
import Navbar from '../components/Navbar/Navbar'
import LeftSideBar from '../components/Dashboard/LeftSideBar'
import RightSideBar from '../components/Dashboard/RightSideBar'
import MainSection from '../components/Dashboard/MainSection'

function Dashboard() {
  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-gradient-to-r to-red-300 from-slate-300 lg:rounded-lg h-screen overflow-hidden">
        <Navbar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <LeftSideBar />
          </div>

          {/* CENTER */}
          <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg no-scrollbar">
            <MainSection />
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
