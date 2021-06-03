import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../Auth";
import axios from "axios"

const Header = () => {
  const auth = useContext(AuthContext);

  const handleClickLogout = () => {
    axios.delete(`/logout`)
      .then(res => {
        auth.logout()
      })
  }
  return(
    <div>
      Header
      {/* ログイン中であれば表示する内容 */}
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
      {/* ログイン中でなければ表示する内容 */}
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