import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../store/Auth";
import MemoForm from './MemoForm';
import ModalWrapper from './ModalWrapper';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { useLayoutStyles } from '../styles/js/layout';
import '../styles/css/layout.scss'
const Header = () => {
  // console.log("header")
  // const globalClasses = useStyles()
  const layoutClasses = useLayoutStyles()
  const auth = useContext(AuthContext);

  const handleClickLogout = () => {
    auth.logout()
  }

  return(
    <AppBar position="static" className={layoutClasses.header}>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          <Link to='/' className={layoutClasses.headerLink}>Diary</Link>
        </Typography>
        {/* <button onClick={handleClickLogout}>
             ログアウト
           </button> */}
        { auth.isLoggedIn &&
          <ModalWrapper text="メモる">
            <MemoForm memoId={null}/>
          </ModalWrapper>
        }
        { !auth.isLoggedIn &&
          <Link to='/login'>ログイン画面へ</Link>
        }
      </Toolbar>
    </AppBar>
    // <header id='header_wrapper'>
    //   Header
    //   {/* ログイン中であれば表示する内容 */}
    //   { auth.isLoggedIn &&
    //     <>
    //       <div>ログイン中：{ auth.currentUser && auth.currentUser.email }</div>
    //       <p>
    //         <Link to='/'>トップページ</Link>
    //       </p>
    //       <button onClick={handleClickLogout}>
    //         ログアウト
    //       </button>
    //       <p>
    //         <Link to='/calendar'>カレンダーへ</Link>
    //       </p>
    //       <p>
    //         <Link to='/memos'>メモ一蘭へ</Link>
    //       </p>
    //       <ModalWrapper text="メモる">
    //         <MemoForm memoId={null}/>
    //       </ModalWrapper>
    //     </>
    //   }
    //   {/* ログイン中でなければ表示する内容 */}
    //   { !auth.isLoggedIn &&
    //     <>
    //       <p>
    //         <Link to='/'>トップページ</Link>
    //       </p>
    //       <p>
    //         <Link to='/login'>ログイン画面へ</Link>
    //       </p>
    //       <p>
    //         <Link to='/signup'>会員登録画面へ</Link>
    //       </p>
    //     </>
    //   }
    // </header>
  )
}

export default Header;
