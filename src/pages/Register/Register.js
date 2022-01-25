import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserLogin } from 'redux/auth/auth.actions'
import { registerAPI } from 'constants/api'
import './Register.css'
import Input from 'components/Input/Input'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [skills, setSkills] = useState('')
  const [userRole, setUserRole] = useState('0')
  const handleChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case 'fullName':
        setFullName(value)
        break
      case 'emailAddress':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'confirmPassword':
        setConfirmPassword(value)
        break
      case 'skills':
        setSkills(value)
        break
      default:
        break
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const apiRequestBody = {
      email,
      userRole: Number(userRole),
      password,
      confirmPassword,
      name: fullName,
      skills,
    }
    fetch(registerAPI, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        handleUserLogin({
          data,
        })
        window.location.assign('/')
      })
      .catch((error) => alert('Something went wrong!'))
  }

  useEffect(() => {
    console.log(userRole)
  }, [userRole])

  return (
    <div className="register-popup">
      <header className="form-header">Signup</header>
      <form onSubmit={handleSubmit} className="form">
        <div className="user-role-container">
          <label className="label" htmlFor="userRole">
            I'm a*
          </label>
          <section className="role-choice-container">
            {userRole === '0' ? (
              <button
                className="active button margin-right"
                type="button"
                onClick={(e) => {
                  setUserRole(e.target.value)
                }}
                value={'0'}
              >
                Recruiter
              </button>
            ) : (
              <button
                className="button margin-right"
                type="button"
                onClick={(e) => {
                  setUserRole(e.target.value)
                }}
                value={'0'}
              >
                Recruiter
              </button>
            )}
            {userRole === '1' ? (
              <button
                className="active button margin-right"
                type="button"
                onClick={(e) => {
                  setUserRole(e.target.value)
                }}
                value={'1'}
              >
                Candidate
              </button>
            ) : (
              <button
                className="button margin-right"
                type="button"
                onClick={(e) => {
                  setUserRole(e.target.value)
                }}
                value={'1'}
              >
                Candidate
              </button>
            )}
          </section>
        </div>
        <section className="input-container margin-top">
          <Input
            label="Full Name*"
            className="input"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            onChange={handleChange}
            value={fullName}
          />
        </section>
        <section className="input-container">
          <Input
            label="Email Address*"
            className="input"
            type="email"
            name="emailAddress"
            placeholder="Enter your email"
            onChange={handleChange}
            value={email}
          />
        </section>
        <div className="password-container">
          <section className="input-container inline margin-right">
            <Input
              label="Create Password*"
              className="input"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={password}
            />
          </section>
          <section className="input-container inline">
            <Input
              label="Confirm Your Password*"
              className="input"
              type="password"
              name="confirmPassword"
              placeholder="Enter your password"
              onChange={handleChange}
              value={confirmPassword}
            />
          </section>
        </div>
        <section className="input-container">
          <Input
            label="Skills"
            className="input"
            type="text"
            name="skills"
            placeholder="Enter comma separated skill"
            onChange={handleChange}
            value={skills}
          />
        </section>
        <button className="submit active button" type="submit">
          Signup
        </button>
        <div className="footer">
          Have an account?{' '}
          <Link to="/login" className="color-highlight margin-5">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    // func defined here used above to add info to store
    // postCardDetails: (state) => dispatch(postNewCard(state)),
    handleUserLogin,
  }
}

export default connect(null, mapDispatchToProps)(Register)
