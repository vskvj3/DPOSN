import { useState, useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import { Link } from 'react-router-dom'

function ProfilePage() {
  const [user, setUser] = useState({fname:"sdfd",
                                        lname: "xkdngwkdebng",
                                        followers :[],
                                        following :[]
})
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Fetch user data from the server
    // For example, using axios:
    // axios.get('/api/user')
    //   .then(response => {
    //     setUser(response.data)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })

    // Fetch posts data from the server
    // For example, using axios:
    // axios.get('/api/posts')
    //   .then(response => {
    //     setPosts(response.data)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }, [])

  if (!user) {
    return <div>User Data Not Found...</div>
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <Navbar />
        <div className="grid place-content-center w-screen h-screen bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
          <div className="bg-white w-[23rem] h-[24rem]  sm:w-[26rem] sm:h-[25rem]  flex flex-col items-center rounded-lg">
            <img
              className="w-20 h-20 rounded-full mt-4"
              src={user.profilePicture}
              alt="Profile"
            />
            <h1 className="mt-4 text-xl">{user.fname} {user.lname}</h1>
            <p className="mt-2 text-xs text-gray-500 h-3px">
              {user.followers.length} followers
            </p>
            <p className="mt-2 text-xs text-gray-500 h-3px">
              {user.following.length} followings
            </p>
            <p className="mt-2 text-xs text-gray-500 h-3px">
              {posts.length} posts
            </p>

            <button className="h-10 bg-pink-600 mt-5 rounded-lg text-white">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid place-content-center w-screen h-screen bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
        <div className="bg-white w-[23rem] h-[24rem]  sm:w-[26rem] sm:h-[25rem]  flex flex-col items-center rounded-lg">
          <h1 className="mt-4 text-xl">Posts</h1>
          {posts.map((post) => (
            <div key={post.id} className="w-80 h-20 mt-4 flex flex-col">
              <img
                className="w-full h-full object-cover"
                src={post.image}
                alt="Post"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProfilePage