import React from 'react'
import './Input.css'

const Input = ({
  label,
  name,
  className,
  value,
  onChange,
  type,
  placeholder,
  error,
}) => {
  return (
    <>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${className} ${error && 'error'}`}
      />
    </>
  )
}

export default Input
