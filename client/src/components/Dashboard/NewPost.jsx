import React from 'react'
import { BiImages } from 'react-icons/bi'
import NoProfile from '../../assets/images/userprofile.png'
import { user } from '../../assets/tempdata'
import CustomButton from './CustomButton'
import { useState } from 'react'

function NewPost() {
  const [file, setFile] = useState(null)

  return (
    <div className="pb-2 sticky">
      <form
        onSubmit={console.log('submit')}
        className="bg-primary px-4 rounded-xl shadow-xl w-full"
      >
        <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
          <img
            src={user?.profileUrl ?? NoProfile}
            alt="User Image"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div className="w-full flex flex-col mt-2">
            <div>
              <input
                name="description"
                placeholder="type something here"
                className="bg-secondary border border-[#66666690] outline-none text-sm text-ascent-1 px-3 placeholder:text-[#666] w-full rounded-xl py-5"
                //   aria-invalid={false ? 'true' : 'false'}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <CustomButton
              type="submit"
              title="Post"
              containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-md font-semibold text-sm"
              onClick={() => console.log('post')}
            />
          </div>

          <label
            htmlFor="imgUpload"
            className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="imgUpload"
              data-max-size="5120"
              accept=".jpg, .png, .jpeg"
            />
            <BiImages />
            <span>Image</span>
          </label>
        </div>
      </form>
    </div>
  )
}

export default NewPost
