import React, { useState } from 'react'
import NoProfile from '../../assets/images/userprofile.png'
import moment from 'moment'

import { BiComment, BiLike, BiSolidLike } from 'react-icons/bi'
import { MdOutlineDeleteOutline } from 'react-icons/md'

function PostCard({ post, user, deletePost, likePost }) {
  const [showAll, setShowAll] = useState(0)
  const [showReply, setShowReply] = useState(0)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [replyComments, setReplyComments] = useState(0)
  const [showComments, setShowComments] = useState(0)

  return (
    <div>
      <div className="mb-2 bg-primary p-4 rounded-xl">
        <div className="flex gap-3 items-center mb-2">
          <img
            src={post?.userId?.profileUrl ?? NoProfile}
            alt={post?.userId?.firstName ?? 'user name'}
            className="w-14 h-14 object-cover rounded-full"
          />
          <div className="w-full flex justify-between">
            <div className="">
              <p className="font-medium text-lg text-ascent-1">
                {post?.userId?.firstName} {post?.userId?.lastName}
              </p>
              <span className="text-ascent-2">{post?.userId?.location}</span>
            </div>

            <span className="text-ascent-2">
              {moment(post?.createdAt ?? '2023-05-25').fromNow()}
            </span>
          </div>
        </div>

        <div>
          <p className="text-ascent-2">
            {showAll === post?._id
              ? post?.description
              : post?.description.slice(0, 300)}

            {post?.description?.length > 301 &&
              (showAll === post?._id ? (
                <span
                  className="text-blue ml-2 font-mediu cursor-pointer"
                  onClick={() => setShowAll(0)}
                >
                  Show Less
                </span>
              ) : (
                <span
                  className="text-blue ml-2 font-medium cursor-pointer"
                  onClick={() => setShowAll(post?._id)}
                >
                  Show More
                </span>
              ))}
          </p>

          {post?.image && (
            <img
              src={post?.image}
              alt="post image"
              className="w-full mt-2 rounded-lg"
            />
          )}
        </div>

        {}
        <div
          className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
      text-base border-t border-[#66666645]"
        >
          <p className="flex gap-2 items-center text-base cursor-pointer">
            {post?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} color="blue" />
            ) : (
              <BiLike size={20} />
            )}
            {post?.likes?.length} Likes
          </p>

          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => {
              //   setShowComments(showComments === post._id ? null : post._id)
              //   getComments(post?._id)
            }}
          >
            <BiComment size={20} />
            {post?.comments?.length} Comments
          </p>

          {user?._id === post?.userId?._id && (
            <div
              className="flex gap-1 items-center text-base text-ascent-1 cursor-pointer"
              onClick={() => deletePost(post?._id)}
            >
              <MdOutlineDeleteOutline size={20} />
              <span>Delete</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCard
