import React, { useState, useContext } from 'react'
import { AuthContext } from "../../store/Auth";
import { Session } from '../../types/index'
import { Box, TextField, Button, Checkbox } from '@material-ui/core'
import { useLayoutStyles } from '../../styles/js/layout';
import { useUserStyles } from '../../styles/js/user';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'
import { helperTexts } from '../../utils/helperTexts';
// import { useForm, Controller } from '/Users/p10200/Projects/local/diary/front/node_modules/react-hook-form/dist/index'

const Login = () => {
  const layoutClasses = useLayoutStyles()
  const userClasses = useUserStyles()
  const auth = useContext(AuthContext);
  // フォームバリデーションを使用するためのメソッド等仕入れ
  const { handleSubmit, control, formState: { errors } } = useForm<any>();
  console.log(errors)
  
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

  const onSubmit = (e) => {
    auth.login(session)
    e.preventDefault();
  }

  // const handleClickLogin = (event) => {
  //   auth.login(session)
  //   event.preventDefault();
  // };

  const exec = (e) => {
    onSubmit(e)
    handleSubmit(onSubmit)
  }

  return(
    <div>
      <h1>ログインページ</h1>
        <form onSubmit={exec}>
          <Box className={layoutClasses.label}>
            <label>メールアドレス</label>
          </Box>

          <Controller
            name="email_form"
            control={control}
            defaultValue={''}
            rules={{ required: true }}
            render={({ field }) => 
              <TextField
                id="email_form"
                placeholder="メールアドレス入力"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChangeEmail}
                value={session.email}
                error={Boolean(errors.email_form)}
                helperText={errors?.email_form && helperTexts.REQUIRE_EMAIL}
              />
            }
          />

          <Box className={layoutClasses.label}>
            <label>パスワード</label>
          </Box>
          <Controller
            name="password_form"
            control={control}
            defaultValue={''}
            rules={{ required: true }}
            render={({ field }) => 
              <TextField
                id="password_form"
                placeholder="パスワード"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChangePassword}
                value={session.password}
                type="password"
                error={Boolean(errors.password_form)}
                helperText={errors?.password_form && helperTexts.REQUIRE_PASSWORD}
              />
            }
          />

          <Box>
            <label>記憶する：</label>
            <Checkbox 
              onChange={handleChangeRemember}
            />

            <Box className={userClasses.signUpButtonWrapper}>
              <Button type="submit" variant="contained" className={userClasses.signUpButton}>ログイン</Button>
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
