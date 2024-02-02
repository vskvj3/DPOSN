import React from 'react'

function Card({ name, img, status }) {
  return (
    <div>
      <div className="relative">
        <img
          className="h-80 w-56 rounded-2xl hover:scale-105 duration-700 cursor-pointer shadow-lg"
          src={img}
          alt={name}
        />
        <p className="absolute bottom-4 left-4 text-sm font-medium text-white no-underline leading-none">
          {name}
        </p>
        <p
          className={`${status === 'Offline' ? 'absolute bottom-4 right-4 text-sm font-medium text-red-600 no-underline leading-none' : 'absolute bottom-4 right-4 text-sm font-medium text-red-600 no-underline leading-none'}`}
        >
          {status === 'offline' ? 'Offline' : 'Online'}
        </p>
      </div>
    </div>
  )
}

export default Card
