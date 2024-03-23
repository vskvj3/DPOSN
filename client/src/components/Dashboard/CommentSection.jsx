import React from 'react'
import NoProfile from '../../assets/images/userprofile.png'

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

function CommentSection({ comment }) {
  return (
    <div className="mt">
      <div className="flex gap-2 items-center mt-2">
        <img
          src={
            comment.profileUrl
              ? `${PINATA_GATEWAY}/ipfs/${comment.profileUrl}`
              : NoProfile
          }
          alt={comment.userName}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div>
          <p className="text-base font-medium text-ascent-1">
            {comment.userName}
          </p>
          <span className="text-sm text-ascent-2">{comment.comment}</span>
        </div>
      </div>
    </div>
  )
}

export default CommentSection
