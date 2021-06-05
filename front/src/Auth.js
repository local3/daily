import React, { useState, useEffect } from 'react'
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
  
  // 他コンポーネントからauth.loginやauth.logoutの形で呼び出せる。
  // 呼び出すと、Contextで管理されているログイン情報が更新される
  const login = (loggedInUser) => {
    // setCurrentUser(null)
    setCurrentUser(loggedInUser)
    setIsLoggedIn(true)
    history.push('/')
  }

  const logout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    history.push('/login')
  }

  // state定義
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

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
  }, []);

  // 各コンポーネントに最終的に送る内容
  const value = {currentUser, isLoggedIn, login, logout}

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
