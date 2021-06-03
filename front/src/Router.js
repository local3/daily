import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


// ページファイルインポート
import Home from './pages/Home'
import Help from './pages/Help'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Calendar from './pages/Calendar'
import Diary from './pages/Diary'


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
        <Route exact path={'/calendar'}>
          <Calendar />
        </Route>
        <Route exact path={'/diary/:date'}>
          <Diary />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router