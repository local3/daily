import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../store/Auth";

const Header = () => {
  // console.log("header")
  const auth = useContext(AuthContext);
  // console.log(auth)

  const handleClickLogout = () => {
    auth.logout()
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
          <button onClick={handleClickLogout}>
            ログアウト
          </button>
          <p>
            <Link to='/calendar'>カレンダーへ</Link>
          </p>
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