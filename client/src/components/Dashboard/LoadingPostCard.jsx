import React from 'react'

function LoadingPostCard() {
  return (
    <div>
      <div className="mb-2 bg-primary p-4 rounded-xl shadow-xl">
        <div className="flex gap-3 items-center mb-2">
          <div className="w-14 h-14 object-cover rounded-full" />
          <div className="w-full flex justify-between">
            <div className="">
              <p className="font-medium text-lg text-ascent-1">username</p>
              <span className="text-ascent-2">{''}</span>
            </div>

            <span className="text-ascent-2">time</span>
          </div>
        </div>

        <div>
          <p className="text-ascent-2">post content</p>

          <div className="w-full mt-2 rounded-lg bg-slate-400" />
        </div>

        {}
        <div
          className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
      text-base border-t border-[#66666645]"
        ></div>
      </div>
    </div>
  )
}

export default LoadingPostCard
