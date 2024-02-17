import { useState, React } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const [userName, setUserName] = useState('')

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    const _userName = userName

    setUserName('')
    navigate('/profilecreation', {
      state: { userName: _userName },
    })
  }

  function handleChange(e) {
    switch (e.target.name) {
      case 'username':
        setUserName(e.target.value)
        break
    }
  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r to-red-300 from-slate-300 overflow-hidden">
        <Navbar />
        <div className="grid place-content-center h-full">
          <div className="bg-white w-[23rem] h-[18rem]  sm:w-[26rem] sm:h-[18rem]  flex flex-col items-center  place-content-center rounded-lg shadow-xl">
            <h1 className="mt-8 text-xl">Sign Up</h1>

            <form className="flex flex-col w-80 h-64 mt-8 ">
              <input
                className="h-10 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Username"
                type="username"
                value={userName}
                name="username"
                onChange={handleChange}
              ></input>

              <p className="mt-5">
                Already have an account?{' '}
                <Link className=" text-red-600" to="/login">
                  Login here
                </Link>
              </p>
              <button
                className="h-10 bg-pink-600 mt-5 rounded-lg text-white"
                onClick={handleSubmit}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
