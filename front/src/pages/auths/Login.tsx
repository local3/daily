import React, { useState, useContext } from 'react'
import { AuthContext } from "../../store/Auth";
import { Session } from '../../types/index'
import { Box, TextField, Button, Checkbox } from '@material-ui/core'
import { useLayoutStyles } from '../../styles/js/layout';
import { useUserStyles } from '../../styles/js/user';
import { Link } from 'react-router-dom';

const Login = () => {
  const layoutClasses = useLayoutStyles()
  const userClasses = useUserStyles()
  const auth = useContext(AuthContext);

  const initSession: Session = {
    email: '',
    password: '',
    rememberMe: false
  }
  const [session, setSession] = useState<Session>(initSession)

  const handleChangeEmail = (e) => {
    setSession({
				...session,
				email: e.target.value
    });
  };

  const handleChangePassword = (e) => {
    setSession({
      ...session,
      password: e.target.value
    });
  };

  const handleChangeRemember = (e) => {
    setSession({
      ...session,
      rememberMe: e.target.checked
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.login(session)
  };

  return(
    <div>
      <h1>ログインページ</h1>
        <form>
          <Box className={layoutClasses.label}>
            <label>メールアドレス</label>
          </Box>
          <TextField
            id="email_form"
            // label="メールアドレス"
            placeholder="メールアドレス入力"
            // helperText="Full width!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleChangeEmail}
            value={session.email}
          />

          <Box className={layoutClasses.label}>
            <label>パスワード</label>
          </Box>
          <TextField
            id="email_form"
            // label="メールアドレス"
            placeholder="パスワード"
            // helperText="Full width!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={handleChangePassword}
            value={session.password}
            type="password"
          />

          <Box>
            <label>記憶する：</label>
            <Checkbox 
              onChange={handleChangeRemember}
            />

            <Box className={userClasses.signUpButtonWrapper}>
              <Button onClick={handleSubmit} variant="contained" className={userClasses.signUpButton}>ログイン</Button>
            </Box>
          </Box>
        </form>
        <Box>
          <Link to="/signup">ユーザー登録がまだの方はこちら</Link>
        </Box>
    </div>
  )
}

export default Login;
