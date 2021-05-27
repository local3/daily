import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return(
    <div>
      Header
      <div>
        <p>
          <Link to='/'>トップページ</Link>
        </p>
        <p>
          <Link to='/login'>ログイン画面へ</Link>
        </p>
        <p>
          <Link to='/signup'>会員登録画面へ</Link>
        </p>
      </div>
    </div>
  )
}

export default Header;