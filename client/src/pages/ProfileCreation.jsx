import { useState, React, useContext } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import EthContext from '../contexts/EthContext'
import UserContext from '../contexts/UserContext'
import NoProfile from '../assets/images/userprofile.png'
import Cookies from 'js-cookie'
import Web3 from 'web3'
import { BiCamera } from 'react-icons/bi'
import { pinFileToIPFS } from '../utils/PinataUtils'
import { ProgressBar } from 'react-loader-spinner'

const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

const date = new Date()

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const days = []
const years = []
let userName = ''
let newUser = true

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

for (let i = date.getFullYear(); i >= 1905; i--) {
  years.push(i)
}

function ProfileCreation() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const {
    state: { contract, accounts },
  } = useContext(EthContext)
  const user = useContext(UserContext)

  const navigate = useNavigate()

  try {
    userName = location.state.userName
  } catch (e) {
    console.log(e)
  }

  if (!userName) {
    newUser = false
  }
  const [file, setFile] = useState(null)

  const [form, setForm] = useState(
    newUser
      ? {
          firstName: '',
          lastName: '',
          day: date.getDate(),
          month: months[date.getMonth()],
          year: date.getFullYear(),
          status: '',
        }
      : {
          firstName: user.firstName,
          lastName: user.lastName,
          day: date.getDate(),
          month: months[date.getMonth()],
          year: date.getFullYear(),
          status: user.status,
        }
  )

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    let imageCID = ''

    if (!newUser) {
      userName = user.userName
      imageCID = user.imageCID
    }
    if (file) {
      imageCID = await pinFileToIPFS(file)
    }

    if (newUser) {
      await registerUser(imageCID, userName, form)
    } else {
      await updateUser(imageCID, userName, form)
    }
    Cookies.set('user', accounts[0])
    Cookies.set('loggedIn', true)
    setLoading(false)
    navigate('/')
    window.location.reload()
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function registerUser(imageCID, userName, form) {
    let dateOfBirth = `${form.day}/${form.month}/${form.year}`
    let createdAt = new Date().toISOString()

    await contract.methods
      .registerUser(
        accounts[0],
        imageCID,
        Web3.utils.padRight(Web3.utils.asciiToHex(userName), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(form.firstName), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(form.lastName), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(dateOfBirth), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(form.status), 64),
        createdAt
      )
      .send({ from: accounts[0] })
  }

  async function updateUser(imageCID, userName, form) {
    let dateOfBirth = `${form.day}/${form.month}/${form.year}`

    await contract.methods
      .updateUser(
        accounts[0],
        imageCID,
        Web3.utils.padRight(Web3.utils.asciiToHex(userName), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(form.firstName), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(form.lastName), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(dateOfBirth), 64),
        Web3.utils.padRight(Web3.utils.asciiToHex(form.status), 64)
      )
      .send({ from: accounts[0] })
  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r to-red-300 from-slate-300 overflow-hidden">
        <Navbar />
        <div className="grid place-content-center h-full">
          <div className="bg-white w-[20rem] h-[30rem]  sm:w-[30rem] sm:h-[36rem]  flex flex-col items-center  place-content-center rounded-lg shadow-xl">
            <h1 className="mt-4 text-xl">Profile Details</h1>
            <label
              htmlFor="imgUpload"
              className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
            >
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0])
                  console.log(e.target.files[0])
                }}
                className="hidden"
                id="imgUpload"
                data-max-size="5120"
                accept=".jpg, .png, .jpeg"
              />
              <span className="rela">
                <div className="w-20 h-20 mt-3 rounded-full border-2 bg-slate-400 flex justify-center relative ">
                  {/* <BiPlusCircle /> */}
                  <div className="overflow-hidden h-full w-full rounded-full border-2">
                    <img
                      className="h-full w-full object-cover object-center"
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : newUser
                            ? NoProfile
                            : user.imageCID
                              ? `${PINATA_GATEWAY}/ipfs/${user.imageCID}`
                              : NoProfile
                      }
                    ></img>
                  </div>

                  <div className="absolute bottom-0 right-0">
                    <BiCamera size={25} />
                  </div>
                </div>
              </span>
            </label>
            <form className="flex flex-col w-80 h-50 mt-8 ">
              <input
                className="h-10 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="First Name"
                type="firstName"
                value={form.firstName}
                name="firstName"
                onChange={handleChange}
              ></input>
              <input
                className="h-10 mt-4 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Last Name"
                type="lastName"
                value={form.lastName}
                name="lastName"
                onChange={handleChange}
              ></input>
              <input
                className="h-10 mt-4 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Status"
                type="status"
                value={form.status}
                name="status"
                onChange={handleChange}
              ></input>
              <p className="mt-2 text-xs text-gray-500 h-3px">Date of birth</p>
              <div className="flex flex-row mt-1">
                <select
                  className="w-1/4 mr-1 h-10 text-sm border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                  name="day"
                  value={form.day}
                  onChange={handleChange}
                >
                  {days.map((val) => (
                    <option key={val}>{val}</option>
                  ))}
                </select>
                <select
                  className="w-1/4 mr-1 h-10 text-sm border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                  name="month"
                  value={form.month}
                  onChange={handleChange}
                >
                  {months.map((val) => (
                    <option key={val}>{val}</option>
                  ))}
                </select>
                <select
                  className="w-1/2 h-10 text-sm  border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                >
                  {years.map((val) => (
                    <option key={val}>{val}</option>
                  ))}
                </select>
              </div>
              <button
                className="h-10 bg-pink-600 mt-5 rounded-lg text-white"
                onClick={handleSubmit}
              >
                {newUser ? 'Create Profile' : 'Update Profile'}
              </button>
            </form>
            <ProgressBar
              visible={loading ? true : false}
              height="80"
              width="80"
              barColor="rgb(219 39 119"
              ariaLabel="progress-bar-loading"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileCreation
