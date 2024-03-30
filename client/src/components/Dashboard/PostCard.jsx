import React, { useState, useContext } from 'react'
import NoProfile from '../../assets/images/userprofile.png'
import moment from 'moment'
import PropTypes from 'prop-types'
import { MdReportGmailerrorred } from 'react-icons/md'
import { BiComment, BiLike, BiSolidLike } from 'react-icons/bi'
import { CiWarning } from 'react-icons/ci'
import CommentSection from './CommentSection'
import EthContext from '../../contexts/EthContext'
import { pinFileToIPFS, pinJSONToIPFS } from '../../utils/PinataUtils'
import UserContext from '../../contexts/UserContext'

function PostCard({ post, comments, likes, reports }) {
  const [showAll, setShowAll] = useState(0)
  const [newComment, setNewComment] = useState('')
  // const [loading, setLoading] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [blurred, setBlurred] = useState(reports?.length > 0 ? true : false)

  const userData = useContext(UserContext)

  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  async function handleSubmit(e) {
    e.preventDefault()

    if (newComment === '') {
      alert('Please enter a post or upload an image')
      return
    }

    const commentTime = new Date().toISOString()

    comments.push({
      comment: newComment,
      time: commentTime,
      commenter: accounts[0],
      profileUrl: userData.imageCID,
      userName: userData.userName,
      address: userData.account,
    })

    const commentCID = await pinJSONToIPFS(comments)

    console.log(commentCID)

    await contract.methods
      .addComment(post._id, commentCID)
      .send({ from: accounts[0] })

    setNewComment('')
  }

  async function likePost(postId) {
    if (post.likes.includes(accounts[0])) {
      post.likes = post.likes.filter((like) => like !== accounts[0])
    } else {
      post.likes.push(accounts[0])
    }

    const likeCID = await pinJSONToIPFS(post.likes)

    await contract.methods.addLikes(postId, likeCID).send({ from: accounts[0] })
  }

  async function reportPost(postId) {
    if (post.reports.includes(accounts[0])) {
      console.log('You already reported')
      // post.likes = post.likes.filter((like) => like !== accounts[0])

      const reportsCID = await pinJSONToIPFS(post.reports)

      await contract.methods
        .addReports(postId, reportsCID)
        .send({ from: accounts[0] })
    } else {
      post.reports.push(accounts[0])
    }
  }

  return (
    <div>
      <div className="mb-2 bg-primary p-4 rounded-xl shadow-xl">
        {reports?.length > 0 ? (
          <div className="flex justify-between py-2 text-red-500 text-md">
            <div className="flex justify-center">
              <CiWarning size={28} />
              <p>This post have been reported by {reports?.length} users</p>
            </div>
            <button type="button" onClick={() => setBlurred(false)}>
              view
            </button>
          </div>
        ) : (
          ''
        )}
        <div className="flex gap-3 items-center mb-2">
          <img
            src={post?.profileUrl ? post?.profileUrl : NoProfile}
            alt={post?.userName ? post?.userName : 'user name'}
            className="w-14 h-14 object-cover rounded-full"
          />
          <div className="w-full flex justify-between">
            <div className="">
              <p className="font-medium text-lg text-ascent-1">
                {post?.userName ? post?.userName : 'no username'}
              </p>
              <span className="text-ascent-2">{''}</span>
            </div>

            <span className="text-ascent-2">
              {moment(post?.createdAt ?? '2023-05-25').fromNow()}
            </span>
          </div>
        </div>
        <div className="relative z-0">
          <div className={blurred ? 'blur-sm ' : ''}>
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
          {/* <div className="absolute inset-0 flex justify-center items-center z-10">
            <div className=" p-2 w-1/2 h-1/4 bg-slate-100 justify-center rounded-md shadow-inner opacity-85">
              <p className=" justify-center blur-none">
                This post have been reported by {reports?.length} users as
                inapropriate
              </p>
            </div>
          </div> */}
        </div>
        {}
        <div
          className="mt-4 flex justify-between items-center px-3 py-2 text-ascent-2
      text-base border-t border-[#66666645]"
        >
          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => likePost(post?._id)}
          >
            {post.likes.includes(accounts[0]) ? (
              <BiSolidLike size={20} color="blue" />
            ) : (
              <BiLike size={20} />
            )}
            {likes?.length} Likes
          </p>

          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => {
              setShowComments(showComments ? false : true)
              //   getComments(post?._id)
              // setComments(postComments)
            }}
          >
            <BiComment size={20} />
            {comments?.length} Comments
          </p>

          {/* report button */}
          <div
            className="flex gap-1 items-center text-base text-ascent-1 cursor-pointer"
            onClick={() => reportPost(post?._id)}
          >
            <MdReportGmailerrorred size={20} color="red" />
            <span>Report</span>
          </div>
        </div>
        {/* Comments  */}
        {showComments === true && (
          <div>
            <div className="w-full flex flex-col mt-2">
              <div>
                <input
                  name="description"
                  placeholder="Add a comment"
                  className="bg-secondary border border-[#66666690] outline-none text-sm text-ascent-1 px-3 placeholder:text-[#666] w-full rounded-xl py-3"
                  //   aria-invalid={false ? 'true' : 'false'}
                  value={newComment}
                  onChange={(e) => {
                    e.preventDefault()
                    setNewComment(e.target.value)
                  }}
                />
                <div className="w-full flex justify-end">
                  <button
                    className="bg-[#0444a4] text-white  mt-4 mr-4 p-1 rounded-sm"
                    onClick={handleSubmit}
                  >
                    reply
                  </button>
                </div>
              </div>

              <div className="mt-3">
                {comments.length === 0 ? (
                  <div>No Comments</div>
                ) : (
                  comments?.map((cmt) => (
                    <CommentSection key={JSON.stringify(cmt)} comment={cmt} />
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.object,
  deletePost: PropTypes.func,
  likePost: PropTypes.func,
  comments: PropTypes.array,
  likes: PropTypes.array,
  reports: PropTypes.array,
}

export default PostCard
