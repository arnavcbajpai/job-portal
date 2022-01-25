import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from 'pages/Header/Header'
import PrivateRoute from 'PrivateRoute'
import Loader from 'components/Loader/Loader'
import { store } from 'redux/store'

const HomePage = React.lazy(() => import('pages/HomePage/HomePage'))
const Register = React.lazy(() => import('pages/Register/Register'))
const Login = React.lazy(() => import('pages/Login/Login'))
const ForgotPassword = React.lazy(() =>
  import('pages/ForgotPassword/ForgotPassword')
)
const ResetPassword = React.lazy(() =>
  import('pages/ForgotPassword/ResetPassword')
)
const Dashboard = React.lazy(() => import('pages/Dashboard/Dashboard'))
const PostJob = React.lazy(() => import('pages/PostJob/PostJob'))

const App = () => {
  store.subscribe(() => console.log(store.getState()))
  return (
    <Suspense fallback={<Loader />}>
      <Header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/post-job" component={PostJob} />
        </Switch>
      </Header>
    </Suspense>
  )
}

export default App
