import React, { useState } from 'react'
import { resetPasswordTokenAPI } from 'constants/api'
import './ForgotPassword.css'
import { connect } from 'react-redux'
import { handlePasswordResetToken } from 'redux/auth/auth.actions'
import { selectPasswordResetToken } from 'redux/auth/auth.selector'

const ForgotPassword = ({ passwordResetToken }) => {
  const [email, setEmail] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const getPasswordResetToken = () => {
    fetch(`${resetPasswordTokenAPI}?email=${email}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        const { success, data } = response
        if (success) {
          verifyPasswordToken(data.token)
        }
      })
      .catch((error) => alert('Something went wrong!'))
  }
  const verifyPasswordToken = (token) => {
    // verify the token here and then only display the
    console.log(token)
    fetch(`${resetPasswordTokenAPI}/${token}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        const { success } = response
        if (success) {
          handlePasswordResetToken(token)
          // setTimeout(() => {
          //   window.location.assign('/reset-password')
          // }, 3000)
        }
      })
      .catch((error) => alert('Something went wrong!'))
  }

  return (
    <>
      <div className="bg-white text-black forgot-password-popup">
        <header className="header">Forgot your password?</header>
        <p className="message">
          Enter the email associated with your account and we’ll send you
          instructions to reset your password.
        </p>
        <section className="flex flex-col mt-6 mx-7">
          <label className="label" htmlFor="email">
            Email address
          </label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleEmailChange}
          />
        </section>
        <div className="footer">
          <button className="button submit" onClick={getPasswordResetToken}>
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    passwordResetToken: selectPasswordResetToken(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePasswordResetToken: (state) =>
      dispatch(handlePasswordResetToken(state)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
