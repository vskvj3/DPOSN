import { useState, React, useEffect } from 'react'
import Navbar from '../components/navbar/Navbar'
import Web3 from 'web3'
import artifact from '../contracts/UserAuthentication.json'

import { useLocation } from 'react-router-dom'

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

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

for (let i = date.getFullYear(); i >= 1905; i--) {
  years.push(i)
}

function ProfileCreation() {
  const location = useLocation()

  if (location.state != null) {
    const { email, password } = location.state
  }

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
    gender: 'Male',
  })

  function handleSubmit(e) {
    e.preventDefault()
    registerUser(email, password, form)
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    async function loadContract() {
      const web3 = new Web3(window.ethereum)
    }
    loadContract()
  }, [])

  async function registerUser(email, password, form) {
    let dateOfBirth = `${form.day}/${form.month}/${form.year}`

    const web3 = new Web3(window.ethereum)
    const accounts = await web3.eth.requestAccounts()
    const { abi } = artifact
    const networkID = await web3.eth.net.getId()
    const address = artifact.networks[networkID].address
    const contract = new web3.eth.Contract(abi, address)

    const account = accounts[0]

    // console.log(
    //   account,
    //   email,
    //   password,
    //   form.firstName,
    //   form.lastName,
    //   dateOfBirth,
    //   form.gender
    // )

    await contract.methods
      .registerUser(
        account,
        email,
        password,
        form.firstName,
        form.lastName,
        dateOfBirth,
        form.gender
      )
      .send({ from: account })
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <Navbar />
        <div className="grid place-content-center w-screen h-screen bg-cyan-950">
          <div className="bg-white w-[23rem] h-[24rem]  sm:w-[26rem] sm:h-[24rem]  flex flex-col items-center rounded-lg outline outline-offset-2 outline-1">
            <h1 className="mt-4 text-xl">Profile Details</h1>

            <form className="flex flex-col w-80 h-80 mt-8 ">
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

              <p className="mt-2 text-xs text-gray-500 h-3px">Gender</p>

              <select
                className="h-10 mt-1 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                type="gender"
                value={form.gender}
                name="gender"
                onChange={handleChange}
              >
                <option key={'Male'}>Male</option>
                <option key={'Female'}>Female</option>
              </select>

              <button
                className="h-10 bg-pink-600 mt-5 rounded-lg text-white"
                onClick={handleSubmit}
              >
                Created Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileCreation
