import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Turn as Hambutton } from 'hamburger-react'
import { AnimatePresence, motion } from 'framer-motion'

function Hamburger() {
  return (
    <>
      <div className="flex justify-center items-center cursor-pointer">
        <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
          <Hambutton
            onToggle={(toggled) => {
              if (toggled) {
                // open a menu
                console.log('open')
              } else {
                // close a menu
                console.log('close')
              }
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Hamburger
