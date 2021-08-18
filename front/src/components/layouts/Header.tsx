import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/Auth";
import MemoModalWrapper from "../memos/MemoModalWrapper";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useLayoutStyles } from "../../styles/js/layout";
import "../../styles/css/layout.scss";

const Header = () => {
  const layoutClasses = useLayoutStyles();
  const auth = useContext(AuthContext);

  return (
    <AppBar position="static" className={layoutClasses.header}>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          <Link to="/" className={layoutClasses.headerLink}>
            Diary
          </Link>
        </Typography>
        {/* <button onClick={handleClickLogout}>
             ログアウト
           </button> */}
        {auth.isLoggedIn && <MemoModalWrapper existMemo={null} />}
        {!auth.isLoggedIn && <Link to="/login" className={layoutClasses.loginLink}>ログイン画面へ</Link>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
