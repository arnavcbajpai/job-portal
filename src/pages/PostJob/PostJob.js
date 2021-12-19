import React, { useState } from 'react'
import { connect } from 'react-redux'
import { jobAPI } from 'constants/api'
import { selectAuth } from 'redux/auth/auth.selector'
import './PostJob.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

const PostJob = ({ auth }) => {
  console.log(auth)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [redirectToDashboard, setRedirectToDashboard] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)

    switch (name) {
      case 'title':
        setTitle(value)
        break
      case 'description':
        setDescription(value)
        break
      case 'location':
        setLocation(value)
        break
      default:
        break
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${jobAPI}`, {
      headers: {
        Authorization: auth.token,
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ title, description, location }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setRedirectToDashboard(true)
        }
      })
      .catch((err) => console.log(err))
  }
  return redirectToDashboard ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="bg-white text-black post-job-popup">
      <header className="header">Post a Job</header>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mt-6 mx-7"
      >
        <section className="flex flex-col w-full items-start ">
          <label className="label" htmlFor="title">
            Job Title*
          </label>
          <input
            className="input"
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
            placeholder="Enter job title"
          />
        </section>
        <section className="flex flex-col w-full items-start ">
          <label className="label" htmlFor="description">
            Description*
          </label>
          <input
            className="input"
            type="text"
            name="description"
            onChange={handleChange}
            value={description}
            placeholder="Enter job description"
          />
        </section>
        <section className="flex flex-col w-full items-start ">
          <label className="label" htmlFor="location">
            Location*
          </label>
          <input
            className="input"
            type="text"
            name="location"
            onChange={handleChange}
            value={location}
            placeholder="Enter location"
          />
        </section>
        <button type="submit" className="submit button">
          Post
        </button>
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostJob)
