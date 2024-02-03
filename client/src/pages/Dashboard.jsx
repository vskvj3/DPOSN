import React from 'react'
import Navbar from '../components/navbar/Navbar'
import LeftSideBar from '../components/Dashboard/LeftSideBar'
import RightSideBar from '../components/Dashboard/RightSideBar'
import MainSection from '../components/Dashboard/MainSection'

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-slate-200 lg:rounded-lg h-screen overflow-hidden">
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full bg-slate-300">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto shadow-lg bg-slate-500 rounded-md">
            <LeftSideBar />
          </div>

          {/* CENTER */}
          <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            <MainSection />
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
