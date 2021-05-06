import React from 'react'
import Home from './pages/Home'
import Help from './pages/Help'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// const pages = [
//   'Home',
// 	'Help'
// ];

// pages.forEach(page => import page from `./pages/${page}`)

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/home'}>
          <Home />
        </Route>
        <Route exact path={'/help'}>
          <Help />
        </Route>
				<Route exact path={'/about'}>
          <About />
        </Route>
				<Route exact path={'/signup'}>
          <Signup />
        </Route>
				<Route exact path={'/login'}>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router