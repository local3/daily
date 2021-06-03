import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../Auth";
import axios from "axios"

const Header = () => {
  const auth = useContext(AuthContext);
  
  const handleClickLogout = () => {
    axios.delete(`/logout`)
      .then(res => {
        // console.log("logoutしました")
        auth.logout()
      })
  }
  return(
    <div>
      Header
      { auth.isLoggedIn &&
        <>
          <div>ログイン中：{ auth.currentUser && auth.currentUser.email }</div>
          <p>
            <Link to='/'>トップページ</Link>
          </p>
          <a href='#' onClick={handleClickLogout}>
            ログアウト
          </a>
        </>
      }
      { !auth.isLoggedIn &&
        <>
          <p>
            <Link to='/'>トップページ</Link>
          </p>
          <p>
            <Link to='/login'>ログイン画面へ</Link>
          </p>
          <p>
            <Link to='/signup'>会員登録画面へ</Link>
          </p>
        </>
      }
    </div>
  )
}

export default Header;