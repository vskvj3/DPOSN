import React from 'react'
import { Avatar } from '@material-tailwind/react'
import { Button } from '@material-tailwind/react'

function FeedSection() {
  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <div>
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              size="sm"
            />
          </div>

          <form className="w-full">
            <div className="flex justify-between items-center">
              <div className="w-full mx-4">
                <input
                  className="outline-none w-full bg-slate-400 rounded-md"
                  name="text"
                  type="text"
                />
                <div className="mx-4 ">{/* put preview */}</div>
                <div className="mr-4">
                  <Button variant="text" type="submit">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeedSection
