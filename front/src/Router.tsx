import React from 'react'

// 高階層コンポーネント系
import { Route, Switch } from 'react-router-dom'
import CheckAuth from "./hocs/CheckAuth"
import DiaryFormContentProvider from './store/DiaryFormContentProvider';

// ページファイルインポート
import Home from './pages/Home'
import Help from './pages/Help'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CalendarPage from './pages/CalendarPage'
import Diary from './pages/Diary'
import UserEdit from './pages/UserEdit'
import ForgotPassword from './pages/ForgotPassword'
import MemoTop from './pages/MemoTop'
import MemoEdit from './pages/MemoEdit'

// ルーティング設定
// ↓参考記事
// https://qiita.com/k-penguin-sato/items/e46725edba00013a8300
const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/about" component={About} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path={'/password_reset'} component={ForgotPassword} />
        {/* CheckAuthでログインしていなければアクセスできないページを囲ってある */}
        <CheckAuth>
          <Route exact path="/calendar" component={CalendarPage} />
          {/* なぜかContextの変更を検知してりれんだりんぐしない*/}
          <DiaryFormContentProvider>
            <Route exact path={'/diary/:date'} component={Diary} />
          </DiaryFormContentProvider>
          <Route exact path={'/edit'} component={UserEdit} />
          <Route exact path={'/memos'} component={MemoTop} />
          <Route exact path={'/memos/:memoId'} component={MemoEdit} />
        </CheckAuth>
      </Switch>
    </>
  )
}

export default Router
