import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'

import store from './store'
import setAuthToken from './utils/Token'

import { setCurrentUser, logout } from './actions/auth'

import PrivateRoute from './components/shared/PrivateRoute'
import Header from './components/Header/Header'
import Footer from './components/Header/Bottom'
import Login from './components/Authtication/Login'
import Register from './components/Authtication/Register'
import AllPosts from './components/all-posts/AllPosts'
import SinglePost from './components/Comment/SinglePost'
import UserProfile from './components/Profile/UserProifle'
import Subscrib  from './components/Subscrib/Subscrib'
import NotFound from './components/Mistake/Mistake'
import UpdatePost from './components/shared/UpdatePost'
import Filtrs from './components/all-posts/Filtrs'


if (localStorage.access_token) {
  const { access_token } = localStorage
  setAuthToken(access_token)
  const decoded = jwtDecode(access_token)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logout())
    window.location.href = '/login'
  }
}

function App() {
  return (
    <div className='bg-color'>
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Header />

            <div className="container">
              <Route path="/registration" component={Register} />
              <Route path="/login" component={Login} />
              <Route exact path="/" component={AllPosts} />
              <Route path="/post/:id" component={SinglePost} />
              <Route path="/posts/:id/put" component={UpdatePost} />
              <Route path="/user/:id" component={UserProfile} />
              <Switch>
                <PrivateRoute exact path="/find" component={Filtrs} />
              </Switch>
              <Switch>
                <PrivateRoute path="/subscribe" component={Subscrib} />
              </Switch>
              <Route path="/404" component={NotFound} />
            </div>
            <Footer />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App
