import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from "./store/Auth";

// ページファイルインポート
import Home from './pages/Home'
import Help from './pages/Help'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ErrorProvider from './store/ErrorProvider';

import Header from './components/Header'
import Footer from './components/Footer'
import ErrorMsg from './components/ErrorMsg'
import Calendar from './pages/Calendar'
import Diary from './pages/Diary'
import UserEdit from './pages/UserEdit'
import ForgotPassword from './pages/ForgotPassword'

// pages.forEach(page => import page from `./pages/${page}`)

// ルーティング設定
// ↓参考記事
// https://qiita.com/k-penguin-sato/items/e46725edba00013a8300
const Router = () => {
  return (
    <>
        <BrowserRouter>
          <ErrorProvider>
            <AuthProvider>
              <Header/>
              <ErrorMsg/>
            </AuthProvider>
            <Switch>
              <AuthProvider>
                <Route exact path="/" component={Home} />
                <Route exact path="/help" component={Help} />
                <Route exact path="/about" component={About} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/calendar" component={Calendar} />
                <Route exact path={'/diary/:date'} component={Diary} />
                <Route exact path={'/edit'} component={UserEdit} />
                <Route exact path={'/password_reset'} component={ForgotPassword} />
              </AuthProvider>
            </Switch>
            <AuthProvider>
              <Footer/>
            </AuthProvider>
          </ErrorProvider>
        </BrowserRouter>

    </>
  )
}

export default Router