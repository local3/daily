import React from 'react'

// 高階層コンポーネント系
import { Route, Switch } from 'react-router-dom'
import CheckAuth from "./hocs/CheckAuth"
// import DiaryFormContentProvider from './store/DiaryFormContentProvider';

// ページファイルインポート
import Home from './pages/statics/Home'
import Help from './pages/statics/Help'
import About from './pages/statics/About'
import Signup from './pages/auths/Signup'
import Login from './pages/auths/Login'
import CalendarPage from './pages/calendars/CalendarPage'
import Diary from './pages/diaries/Diary'
// import UserEdit from './pages/users/UserEdit'
import ForgotPassword from './pages/users/ForgotPassword'
import MemoTop from './pages/memos/MemoTop'
import Dictionary from './pages/dictionaries/Dictionary'
import AccountSetting from './pages/users/AccountSetting';
import LanguageSetting from './pages/users/LanguageSetting';
// import MemoEdit from './pages/MemoEdit'

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
          <Route exact path={'/diary/:date'} component={Diary} />
          <Route exact path={'/settings/account'} component={AccountSetting} />
          <Route exact path={'/settings/language'} component={LanguageSetting} />
          <Route exact path={'/memos'} component={MemoTop} />
          <Route exact path={'/dictionaries'} component={Dictionary} />
        </CheckAuth>
      </Switch>
    </>
  )
}

export default Router
