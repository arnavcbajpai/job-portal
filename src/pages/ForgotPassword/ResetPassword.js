import React, { useState } from 'react'
import { resetPasswordTokenAPI } from 'constants/api'
import { selectPasswordResetToken } from 'redux/auth/auth.selector'
import { connect } from 'react-redux'
import './ResetPassword.css'
import Input from 'components/Input/Input'

const ResetPassword = ({ passwordResetToken }) => {
  console.log('Token -> ', passwordResetToken)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    name === 'password' ? setPassword(value) : setConfirmPassword(value)
  }
  const handleSubmit = () => {
    const apiRequestBody = {
      password,
      confirmPassword,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlY3J1aXRlcmxvZ2luMTJAZW1haWwuY29tIiwiaWF0IjoxNjM5OTQ5MzU1LCJleHAiOjE2Mzk5NTI5NTV9.-7_MQlscVFqzbN_FZaGzS1jjZn8KVKnJLIBAQ9hqFS4',
    }
    console.log(apiRequestBody)
    fetch(resetPasswordTokenAPI, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(apiRequestBody),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        window.location.assign('/login')
      })
      .catch((error) => console.log(error))
  }
  return (
    <div className="reset-password-popup">
      <header className="form-header">Reset Your Password</header>
      <p className="message">Enter your new password below</p>
      <section className="input-container">
        <Input
          label="New Password"
          className="input"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          value={password}
          placeholder="Enter your password"
        />
      </section>
      <section className="input-container">
        <Input
          label="Confirm New Password"
          className="input"
          type="password"
          name="confirmPassword"
          onChange={handlePasswordChange}
          value={confirmPassword}
          placeholder="Enter your password"
        />
      </section>
      <div className="footer">
        <button className="submit-button" onClick={handleSubmit}>
          Reset
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    passwordResetToken: selectPasswordResetToken(state),
  }
}

export default connect(mapStateToProps, null)(ResetPassword)
