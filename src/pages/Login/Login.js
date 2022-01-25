import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserLogin } from 'redux/auth/auth.actions'
import { loginAPI } from 'constants/api'
import './Login.css'
import { selectAuth } from 'redux/auth/auth.selector'

const Login = ({ handleUserLogin, auth }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target
    name === 'email' ? setEmail(value) : setPassword(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
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
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            value={email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter your email"
            className="input"
          />
        </section>
        <section className="relative input-container">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Enter your password"
            className="input"
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
