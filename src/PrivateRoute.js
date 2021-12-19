import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { selectAuth } from 'redux/auth/auth.selector'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        auth?.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

const mapStateToProps = (state) => {
  console.log(selectAuth(state))
  return {
    auth: selectAuth(state),
  }
}

export default connect(mapStateToProps, null)(PrivateRoute)
