import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render(){
    return(
      <div>
        Header
        <div>
            <Link to='/signup'>会員登録画面へ　/　</Link>
            
            <Link to='/login'>ログイン画面へ</Link>
        </div>
      </div>
    )
  }
}

export default Header;