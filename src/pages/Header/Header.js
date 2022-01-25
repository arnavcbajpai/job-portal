import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectAuth } from 'redux/auth/auth.selector'
import './Header.css'
import { handleUserLogout } from 'redux/auth/auth.actions'
import { useLocation } from 'react-router-dom'

const Header = ({ auth, children }) => {
  const [logOutOptionActive, setLogOutOptionActive] = useState(false)
  const location = useLocation()
  const pixelRatio = 1440 / window.innerWidth
  console.log(location.pathname)

  return (
    <div className="container">
      <div>
        <header className="header">
          <div className="header-left">
            My<span className="color-highlight">Jobs</span>
          </div>
          {location.pathname !== '/register' && location.pathname !== '/login' && (
            <div className="header-right">
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
          )}
        </header>
        <hr className="horizontal-rule" />
      </div>
      <div className="children">{children}</div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: selectAuth(state),
  }
}

export default connect(mapStateToProps, null)(Header)
