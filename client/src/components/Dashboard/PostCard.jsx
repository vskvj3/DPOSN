import React, { useState } from 'react'
import NoProfile from '../../assets/images/userprofile.png'
import moment from 'moment'
import PropTypes from 'prop-types'
import { postComments } from '../../assets/tempdata'
import { BiComment, BiLike, BiSolidLike } from 'react-icons/bi'
import { MdOutlineDeleteOutline } from 'react-icons/md'

function PostCard({ post, user, deletePost, likePost }) {
  const [showAll, setShowAll] = useState(0)
  // const [showReply, setShowReply] = useState(0)
  const [comments, setComments] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [replyComments, setReplyComments] = useState(0)
  const [showComments, setShowComments] = useState(false)

  return (
    <div>
      <div className="mb-2 bg-primary p-4 rounded-xl shadow-xl">
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
              setShowComments(showComments ? false : true)
              //   getComments(post?._id)
              setComments(postComments)
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

        {/* Comments  */}
        {showComments === true &&
          comments?.map((comment) => (
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
                <span className="text-sm text-ascent-2">
                  {comment?.comment}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
  deletePost: PropTypes.func,
  likePost: PropTypes.func,
}

export default PostCard
