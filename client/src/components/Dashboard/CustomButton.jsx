import React from 'react'
import PropTypes from 'prop-types'

const CustomButton = ({ title, containerStyles, iconRight, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      className={`inline-flex items-center text-base ${containerStyles}`}
    >
      {title}

      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  )
}

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  containerStyles: PropTypes.string,
  iconRight: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
}

export default CustomButton
