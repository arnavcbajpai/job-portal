import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectAuth } from 'redux/auth/auth.selector'
import './Header.css'
import { handleUserLogout } from 'redux/auth/auth.actions'

const Header = ({ auth, children }) => {
  const [logOutOptionActive, setLogOutOptionActive] = useState(false)

  return (
    <>
      <div className="top-container text-white">
        <header className="header flex w-full">
          <div className="ml-16 my-6 font text-xl text-white">
            My<span className="text-dodger-blue-500">Jobs</span>
          </div>
          <div className="flex ml-auto w-3/6 items-center justify-end ">
            {auth?.isLoggedIn && auth?.userRole === 'recruiter' && (
              <Link to="post-job" className="text-base my-5 mr-5 text-white">
                Post a Job
              </Link>
            )}
            {!auth?.isLoggedIn ? (
              <Link to="register" className="login-button">
                Login/Sign Up
              </Link>
            ) : (
              <div
                className="py-2 pr-8 my-3 mr-16 relative w-[46px] h-[46px]"
                onClick={() => setLogOutOptionActive(true)}
                // onMouseLeave={() => setLogOutOptionActive(false)}
              >
                <span className="w-full h-full rounded-full bg-[#D9EFFF] text-black">
                  {auth?.data?.name?.toUpperCase().slice(0, 1)}
                </span>
                {logOutOptionActive && (
                  <p className="absolute top-[140%] left-[-10%]">
                    <button
                      className="text-black bg-white"
                      onClick={() => {
                        handleUserLogout()
                        window.location.assign('/')
                      }}
                    >
                      Logout
                    </button>
                  </p>
                )}
              </div>
            )}
          </div>
        </header>
        <hr className="bg-white mx-16" />
      </div>
      <div className="bottom-container">{children}</div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: selectAuth(state),
  }
}

export default connect(mapStateToProps, null)(Header)
