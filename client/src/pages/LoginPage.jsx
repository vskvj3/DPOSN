import { useState, React, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import EthContext from '../contexts/EthContext'
import Web3 from 'web3'

function LoginPage() {
  const [userExists, setUserExists] = useState(true)

  const {
    state: { contract, accounts },
  } = useContext(EthContext)

  async function loginUser() {
    if (contract != null) {
      const data = await contract.methods
        .loginUser(accounts[0])
        .call({ from: accounts[0] })
        .catch((err) => {
          console.log(err)
        })

      return data
    }
  }

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const userData = loginUser()
    userData.then((data) => {
      console.log('data' + data)
      if (data) {
        navigate('/')
      } else {
        console.log('User not found')
        setUserExists(false)
      }
    })
  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r to-red-300 from-slate-300 overflow-hidden">
        <Navbar />
        <div className="grid place-content-center h-full">
          <div className="bg-white w-[23rem] h-[26rem]  sm:w-[26rem] sm:h-[26rem]  flex flex-col items-center  place-content-center rounded-lg shadow-xl">
            <h1 className="mt-4 text-xl">Log in</h1>
            <form className="flex flex-col w-80 h-56 mt-8 ">
              {userExists ? (
                <p className="mt-5">
                  Don&apos;t have an account?{' '}
                  <Link className=" text-red-500" to="/signup">
                    Create account
                  </Link>
                </p>
              ) : (
                ''
              )}
              <button
                className="h-10 bg-pink-600 mt-5 rounded-lg text-white"
                onClick={handleSubmit}
              >
                Log in
              </button>
            </form>
            {!userExists ? (
              <p className="mt-5 text-red-600">
                User does not exist!{' '}
                <Link className=" text-blue" to="/signup">
                  Sign up
                </Link>
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
