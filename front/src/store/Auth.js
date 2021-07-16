import React, { useState, useEffect, useContext } from 'react'
import { AlertContext } from '../store/AlertProvider'
import axios from 'axios'
import { axiosWithAlert } from '../store/Axios'
import { useHistory } from 'react-router';
import { LoadContext } from './LoadProvider';

// 初期状態登録
const initialContext = {
  currentUser: null,
  isLoggedIn: false,
  isFetchingAuth: true
}
// Context作成。このAuthContextに他のコンポーネントからアクセスすることで、ログイン情報を持ってこれる
const AuthContext = React.createContext(initialContext);
// Router.jsで使う。propsにRouter.jsでラップしたコンポーネントたちが入る。
const AuthProvider = (props) => {
  // URL遷移用
  const history = useHistory();
  // state定義
  const [authState, setAuthState] = useState(initialContext)
  
  const error = useContext(AlertContext)
  const { loadDispatch } = useContext(LoadContext)
  // 他コンポーネントからauth.loginやauth.logoutの形で呼び出せる。
  // 呼び出すと、Contextで管理されているログイン情報が更新される
  const login = (session) => {
    axiosWithAlert.post(`/login`, { session: session })
      .then(res => {
        // console.log(res)
        setAuthState({...authState, currentUser: res.data.data, isLoggedIn: true, isFetchingAuth: true})
        history.push('/')

      })
  }

  const logout = () => {
    axios.delete(`/logout`)
      .then(res => {
        setAuthState({...authState, currentUser: null, isLoggedIn: false})
        history.push('/login')
      })
  }

  const signup = (user) => {
    axiosWithAlert.post(`/users`, { user: user })
      .then(res => {
        setAuthState({...authState, currentUser: res.data.data, isLoggedIn: true})
        history.push('/')
      })
  }

  // currentユーザーを取得
  const fetchCurrentUser = async () => {
    await axios.get(`/current_user`)
      .then(res => {
        setAuthState({...authState, currentUser: res.data.data, isLoggedIn: res.data.data !== null, isFetchingAuth: false})
        loadDispatch({isLoading: false})
      })
  }

  // レンダリング後にユーザーの取得を行う
  useEffect(() => {
    fetchCurrentUser()
  }, [authState.isLoggedIn]);

  // 各コンポーネントに最終的に送る内容
  const value = {...authState, login, logout, signup}

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
