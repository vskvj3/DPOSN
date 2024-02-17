import React from 'react'
import NoProfile from '../../assets/images/userprofile.png'

function CommentSection(comment) {
  return (
    <div>
      <div key={comment?._id} className="flex gap-2 items-center mt-2">
        <img
          src={comment?.userId?.profileUrl ?? NoProfile}
          alt={comment?.userId?.firstName}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div>
          <p className="text-base font-medium text-ascent-1">
            {comment?.userId?.firstName} {comment?.userId?.lastName}
          </p>
          <span className="text-sm text-ascent-2">{comment?.comment}</span>
        </div>
      </div>
    </div>
  )
}

export default CommentSection
