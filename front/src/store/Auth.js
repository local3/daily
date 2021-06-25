import React, { useState, useEffect, useContext } from 'react'
import { ErrorContext } from '../store/ErrorProvider'
import axios from 'axios'
import { useHistory } from 'react-router';

// 初期状態登録
const initialContext = {
  currentUser: null,
  isLoggedIn: false,
}
// Context作成。このAuthContextに他のコンポーネントからアクセスすることで、ログイン情報を持ってこれる
const AuthContext = React.createContext(initialContext);

// Router.jsで使う。propsにRouter.jsでラップしたコンポーネントたちが入る。
const AuthProvider = (props) => {
  // URL遷移用
  const history = useHistory();
  // state定義
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const error = useContext(ErrorContext)

  // 他コンポーネントからauth.loginやauth.logoutの形で呼び出せる。
  // 呼び出すと、Contextで管理されているログイン情報が更新される
  const login = (session) => {
    // setCurrentUser(null)
    // console.log(isLoggedIn)
    // console.log(currentUser)
    axios.post(`/login`, { session: session })
      .then(res => {
        setCurrentUser(res.data.data)
        setIsLoggedIn(true)
        // console.log(isLoggedIn)
        // console.log(currentUser)
        history.push('/')
      })
  }

  const logout = () => {
    axios.delete(`/logout`)
      .then(res => {
        setCurrentUser(null)
        setIsLoggedIn(false)
        history.push('/login')
      })
  }

  const signup = (user) => {
    axios.post(`/users`, { user: user })
      .then(res => {
        setCurrentUser(res.data.data)
        setIsLoggedIn(true)
        history.push('/')
      })

      .catch(err => {
        console.log(err.message)
        error.dispatch({msg: err.response.statusText, status: err.response.status})
      })
  }

  // currentユーザーを取得
  const fetchCurrentUser = () => {
    axios.get(`/current_user`)
      .then(res => {
        setCurrentUser(res.data.data)
        res.data.data === null ? setIsLoggedIn(false) : setIsLoggedIn(true)
      })
  }

  // レンダリング後にユーザーの取得を行う
  useEffect(() => {
    fetchCurrentUser()
  }, [isLoggedIn]);

  // 各コンポーネントに最終的に送る内容
  const value = {currentUser, isLoggedIn, login, logout, signup}

  return (
    // .Providerで値を送り、各コンポーネントでuseContext(AuthContext)で情報を受け取る
    <AuthContext.Provider
      value={value}
    >
      { props.children }
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
