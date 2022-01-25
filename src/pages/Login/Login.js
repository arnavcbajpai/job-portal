import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserLogin } from 'redux/auth/auth.actions'
import { loginAPI } from 'constants/api'
import { selectAuth } from 'redux/auth/auth.selector'
import { emailRegex, passwordRegex } from 'constants/constants'
import './Login.css'
import { useEffect } from 'react'
import Input from 'components/Input/Input'

const Login = ({ handleUserLogin, auth }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  useEffect(() => console.log(emailError), [emailError])
  const handleChange = (e) => {
    console.log('onChange triggered falsely!!')
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
      if (emailRegex.test(value)) {
        setEmailError(false)
      } else {
        console.log('Here', emailRegex.test(value), value)
        setEmailError(true)
      }
    } else {
      console.log('Here', emailRegex.test(value))
      setPassword(value)
      if (passwordRegex.test(value)) {
        setPasswordError(false)
      } else setPasswordError(true)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && !emailError) setEmailError(true)
    if (password && !passwordError) setPasswordError(true)
    const apiRequestBody = {
      email,
      password,
    }
    fetch(loginAPI, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((res) => res.json())
      .then((response) => {
        const { data } = response
        handleUserLogin({
          data,
        })
      })
      .catch((error) => alert('Something went wrong!'))
  }
  return auth?.isLoggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="login-popup">
      <header className="form-header">Login</header>
      <form onSubmit={handleSubmit} className="form">
        <section className="input-container">
          <Input
            label="Email Address"
            value={email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter your email"
            className="input"
            error={emailError}
          />
        </section>
        <section className="relative input-container">
          <Input
            label="Password"
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Enter your password"
            className="input"
            error={passwordError}
          />
          <Link to="/forgot-password" className="forgot-password">
            Forgot Your Password?
          </Link>
        </section>
        <button type="submit" className="submit-button">
          Login
        </button>
        <div>
          <span className="footer">
            New to MyJobs?
            <Link to="/register" className="color-highlight margin-5">
              Create an account
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: selectAuth(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleUserLogin: (state) => dispatch(handleUserLogin(state)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
