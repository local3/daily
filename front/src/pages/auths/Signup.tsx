import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from "../../store/Auth";
import { SignupForm, Language } from '../../types'
import { Box, TextField, Button, FormControl, Select } from '@material-ui/core'
import { useLayoutStyles } from '../../styles/js/layout'
import { useUserStyles } from '../../styles/js/user';
import { FormErrorContext } from '../../store/FormErrorProvider';
import InputWithError from '../../components/layouts/InputWithError';

function Signup() {
  const layoutClasses = useLayoutStyles()
  const userClasses = useUserStyles()
  const auth = useContext(AuthContext)
  const { formErrors } = useContext(FormErrorContext)

  const initUser: SignupForm =
      {
        email: '',
        password: '',
        passwordConfirmation: '',
        languageId: 1
      }
  
  const [user, setUser] = useState(initUser);
  const [languages, setLanguages] = useState<Language[]>([])  

  const componentDidMount = () => {
    axios.get(`/languages`)
      .then(res => {
        setLanguages(res.data)
      })
  }

  useEffect(componentDidMount, [])

  const handleChangeEmail = (e) => {
		// console.log(e);
    setUser(
      {
				...user,
				email: e.target.value
			}
    );
  };

  const handleChangePassword = (e) => {
    setUser(
			{
				...user,
				password: e.target.value
			}
    );
  };

  const handleChangePasswordConfirmation = (e) => {
    setUser(
			{
				...user,
				passwordConfirmation: e.target.value
			}
    );
  };

  const handleChangeLanguage = (e) => {
		// console.log(e);
    setUser(
			{
				...user,
				languageId: e.target.value
			}
    );
  };

  const handleSubmit = (e) => {
    auth.signup(user)
    e.preventDefault();
  }

  return(
    <div>
      <h1>ユーザー登録ページ</h1>
      <Box>
        <form>
          <Box>
            <Box className={layoutClasses.label}>
              <label>メールアドレス</label>
            </Box>
            <InputWithError
              attribute='email'
              formErrors={formErrors}
            >
              <TextField
                id="email_form"
                // label="メールアドレス"
                placeholder="例：diary@example.com"
                // helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChangeEmail}
                value={user.email}
              />
            </InputWithError>

            <Box className={layoutClasses.label}>
              <label>パスワード</label>
            </Box>
            <InputWithError
              attribute='password'
              formErrors={formErrors}
            >
              <TextField
                id="password_form"
                placeholder="パスワード(半角英数字のみ6文字以上)"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChangePassword}
                value={user.password}
                type="password"
              />
            </InputWithError>

            <Box className={layoutClasses.label}>
              <label>パスワード確認用</label>
            </Box>
            <InputWithError
              attribute='password_confirmation'
              formErrors={formErrors}
            >
              <TextField
                id="password_confirmation_form"
                // label="メールアドレス"
                placeholder="パスワード確認用"
                // helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={handleChangePasswordConfirmation}
                value={user.passwordConfirmation}
                type="password"
              />
            </InputWithError>
            {/* <TextField
              id="email_form"
              // label="メールアドレス"
              placeholder="パスワード確認用"
              // helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleChangePasswordConfirmation}
              value={user.passwordConfirmation}
              type="password"
            /> */}
          </Box>

          <Box className={layoutClasses.label}>
            <label>言語選択</label>
          </Box>
          <FormControl variant="outlined">
            <Select
              native
              value={user.languageId}
              onChange={handleChangeLanguage}
              inputProps={{
                name: 'language_id',
                id: 'user_language_id',
              }}
            >
              <option key={0} value={0} disabled></option>
              {languages.map(language => 
                <option key={Number(language.id)} value={Number(language.id)}>
                  {language.name}
                </option>)
              }
            </Select>
          </FormControl>

          <Box className={userClasses.signUpButtonWrapper}>
            <Button onClick={handleSubmit} variant="contained" className={userClasses.signUpButton}>登録する</Button>
          </Box>
        </form>
      </Box>
    </div>
  )
}

export default Signup;
