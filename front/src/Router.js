import React from 'react'

// 高階層コンポーネント系
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from "./store/Auth";
import ErrorProvider from './store/ErrorProvider';
import LoadProvider from './store/LoadProvider'
import CheckAuth from "./hocs/CheckAuth"

// components
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorMsg from './components/ErrorMsg'
import Load from './components/Load';

// ページファイルインポート
import Home from './pages/Home'
import Help from './pages/Help'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Calendar from './pages/Calendar'
import Diary from './pages/Diary'
import UserEdit from './pages/UserEdit'
import ForgotPassword from './pages/ForgotPassword'
import MemoTop from './pages/MemoTop'
import MemoEdit from './pages/MemoEdit'
// pages.forEach(page => import page from `./pages/${page}`)

// ルーティング設定
// ↓参考記事
// https://qiita.com/k-penguin-sato/items/e46725edba00013a8300
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <ErrorProvider>
          <LoadProvider>
            <AuthProvider>
              <Load/>
              <Header/>
              <ErrorMsg/>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/help" component={Help} />
                <Route exact path="/about" component={About} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path={'/password_reset'} component={ForgotPassword} />
                {/* CheckAuthでログインしていなければアクセスできないページを囲ってある */}
                <CheckAuth>
                  <Route exact path="/calendar" component={Calendar} />
                  <Route exact path={'/diary/:date'} component={Diary} />
                  <Route exact path={'/edit'} component={UserEdit} />
                  <Route exact path={'/memos'} component={MemoTop} />
                  <Route exact path={'/memos/:memoId'} component={MemoEdit} />
                </CheckAuth>
              </Switch>
              <Footer/>
            </AuthProvider>
          </LoadProvider>
        </ErrorProvider>
      </BrowserRouter>
    </>
  )
}

export default Router