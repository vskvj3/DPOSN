import { useState, React } from 'react'
import Navbar from '../components/navbar/Navbar'
import { Link } from 'react-router-dom'

function ProfileCreation() {
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
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [day, setDay] = useState(date.getDate())
  const [month, setMonth] = useState(months[date.getMonth()])
  const [year, setYear] = useState(date.getFullYear())
  const [gender, setGender] = useState('Select Gender')
  const days = []
  const years = []

  for (let i = 1; i <= 31; i++) {
    days.push(i)
  }

  for (let i = date.getFullYear(); i >= 1905; i--) {
    years.push(i)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // setEmail('')
    // setPassword('')
  }

  function handleChange(e) {
    switch (e.target.name) {
      case 'fname':
        setFname(e.target.value)
        break
      case 'lname':
        setLname(e.target.value)
        break
      case 'Day':
        setDay(e.target.value)
        break
      case 'Month':
        setMonth(e.target.value)
        break
      case 'Year':
        setYear(e.target.value)
        break
      case 'gender':
        setGender(e.target.value)
        break
      default:
        break
    }
  }

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen flex flex-col">
        <div className="grid place-content-center w-screen h-screen bg-gradient-to-r to-red-300 from-blue-300">
          <div className="bg-white w-[23rem] h-[26rem]  sm:w-[26rem] sm:h-[26rem]  flex flex-col items-center rounded-lg shadow-xl">
            <h1 className="mt-4 text-xl">Profile Details</h1>

            <form className="flex flex-col w-80 h-80 mt-8 ">
              <input
                className="h-10 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="First Name"
                type="name"
                value={fname}
                name="fname"
                onChange={handleChange}
              ></input>
              <input
                className="h-10 mt-4 px-3 border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                placeholder="Last Name"
                type="name"
                value={lname}
                name="lname"
                onChange={handleChange}
              ></input>
              <p className="mt-2 text-xs text-gray-500 h-3px">Date of birth</p>
              <div className="flex flex-row mt-1">
                <select
                  className="w-1/4 mr-1 h-10 text-sm border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                  name="Day"
                  value={day}
                  onChange={handleChange}
                >
                  {days.map((val) => (
                    <option key={val}>{val}</option>
                  ))}
                </select>
                <select
                  className="w-1/4 mr-1 h-10 text-sm border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                  name="Month"
                  value={month}
                  onChange={handleChange}
                >
                  {months.map((val) => (
                    <option key={val}>{val}</option>
                  ))}
                </select>
                <select
                  className="w-1/2 h-10 text-sm  border-2 border-gray-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
                  name="Year"
                  value={year}
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
                value={gender}
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
