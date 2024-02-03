import React from 'react'
import { Avatar } from '@material-tailwind/react'
import { Button } from '@material-tailwind/react'

function FeedSection() {
  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-gray-300 pb-4 pl-4 w-full">
          <form className="w-full">
            <div className="flex justify-between">
              <div className="w-full mx-4">
                <div className="flex justify-around">
                  <Avatar
                    className="self-center"
                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                    alt="avatar"
                    size="sm"
                  />
                  <textarea
                    className="outline-none w-full ml-3 pl-4  py-4 placeholder-gray-500  bg-slate-200 rounded-xl"
                    name="text"
                    type="text"
                    placeholder="Share something!"
                  />
                </div>
              </div>
              <div className="self-center bg-slate-200 mr-4 rounded-md">
                <Button color="amber" variant="text" type="submit">
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FeedSection
