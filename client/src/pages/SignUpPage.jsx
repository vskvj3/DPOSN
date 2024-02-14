import { useState, React } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    const _email = email
    const _password = password1

    setEmail('')
    setPassword1('')
    setPassword2('')
    navigate('/profilecreation', {
      state: { email: _email, password: _password },
    })
  }

  function handleChange(e) {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password1':
        setPassword1(e.target.value)
        break
      case 'password2':
        setPassword2(e.target.value)
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r to-red-300 from-slate-300 overflow-hidden">
        <Navbar />
        <div className="grid place-content-center h-full">
          <div className="bg-white w-[23rem] h-[26rem]  sm:w-[26rem] sm:h-[26rem]  flex flex-col items-center  place-content-center rounded-lg shadow-xl">
            <h1 className="mt-4 text-xl">Sign Up</h1>

            <form className="flex flex-col w-80 h-64 mt-8 ">
              <input
                className="h-10 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Email"
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
              ></input>
              <input
                className="h-10 mt-4 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Password"
                type="password"
                value={password1}
                name="password1"
                onChange={handleChange}
              ></input>

              <input
                className="h-10 mt-4 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Confirm Password"
                type="password"
                value={password2}
                name="password2"
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
