import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from "./Auth";

// ページファイルインポート
import Home from './pages/Home'
import Help from './pages/Help'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'

import Header from './components/Header'
import Footer from './components/Footer'
import Calendar from './pages/Calendar'


// const pages = [
//   'Home',
// 	'Help'
// ];

// pages.forEach(page => import page from `./pages/${page}`)

// ルーティング設定
// ↓参考記事
// https://qiita.com/k-penguin-sato/items/e46725edba00013a8300
const Router = () => {
  return (
    <>
        <BrowserRouter>
          <AuthProvider>
            <Header/>
          </AuthProvider>
          <Switch>
            <AuthProvider>
              <Route exact path="/" component={Home} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/about" component={About} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/calendar" component={Calendar} />
            </AuthProvider>
          </Switch>
          <AuthProvider>
            <Footer/>
          </AuthProvider>
        </BrowserRouter>
    </>
  )
}

export default Router