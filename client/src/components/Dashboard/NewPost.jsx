import React, { useState, useContext } from 'react'
import { BiImages } from 'react-icons/bi'
import NoProfile from '../../assets/images/userprofile.png'
import { user } from '../../assets/tempdata'
import CustomButton from './CustomButton'
import { func } from 'prop-types'
import EthContext from '../../contexts/EthContext'

import { pinFileToIPFS, pinJSONToIPFS } from '../../utils/PinataUtils'

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function NewPost() {
  const [file, setFile] = useState(null)
  const [postText, setPostText] = useState('')
  const [error, setError] = useState('')
  const [posting, setPosting] = useState(false)

  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  async function handleSubmit(e) {
    e.preventDefault()
    let imageCID = ''

    if (postText === '' && !file) {
      setError('Please enter a post or upload an image')
      return
    }

    setPosting(true)

    if (file) {
      imageCID = await pinFileToIPFS(file)
      console.log(imageCID)
    }
    const postTime = new Date().toISOString()

    const postCID = await pinJSONToIPFS({
      post: postText,
      image: imageCID,
      time: postTime,
    })
    console.log(postCID)

    // const content = await fetch(`${PINATA_GATEWAY}/ipfs/${postCID}`, {
    //   method: 'GET',
    //   headers: { accept: 'text/plain' },
    // })
    // console.log(await content.json())

    await contract.methods.addPost(postCID).send({ from: accounts[0] })

    setPostText('')
    setFile(null)
    setPosting(false)
  }

  return (
    <div className="pb-2 sticky">
      <form className="bg-primary px-4 rounded-xl shadow-xl w-full">
        <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
          {/* <img
            src={user?.profileUrl ?? NoProfile}
            alt="User Image"
            className="w-14 h-14 rounded-full object-cover"
          /> */}

          <div className="w-full flex flex-col mt-2">
            <div>
              <input
                name="description"
                placeholder="type something here"
                className="bg-secondary border border-[#66666690] outline-none text-sm text-ascent-1 px-3 placeholder:text-[#666] w-full rounded-xl py-5"
                //   aria-invalid={false ? 'true' : 'false'}
                value={postText}
                onChange={(e) => {
                  e.preventDefault()
                  setPostText(e.target.value)
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            {posting ? (
              <CustomButton
                type="disabled"
                title="Posting..."
                containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-md font-semibold text-sm"
              />
            ) : (
              <CustomButton
                type="submit"
                title="Post"
                containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-md font-semibold text-sm"
                onClick={handleSubmit}
              />
            )}
          </div>

          <label
            htmlFor="imgUpload"
            className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
          >
            <input
              type="file"
              onChange={(e) => {
                e.preventDefault()
                setFile(e.target.files[0])
                console.log(e.target.files[0])
              }}
              className="hidden"
              id="imgUpload"
              data-max-size="5120"
              accept=".jpg, .png, .jpeg"
            />
            <BiImages />
            <span>Image</span>
          </label>
        </div>
        <p className="text-red-700 pb-3">{error}</p>
      </form>
    </div>
  )
}

export default NewPost
