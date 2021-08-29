import React, { useContext, useState } from 'react'
import { axiosWithAlert } from '../../store/Axios'
import { useLayoutStyles } from '../../styles/js/layout'
import { Typography, Box, TextField, Button } from '@material-ui/core'
import { UserAccountSetting } from '../../types/index'
import InputWithError from '../../components/layouts/InputWithError'
import { FormErrorContext } from '../../store/FormErrorProvider'

const AccountSetting = () => {
  const layoutClasses = useLayoutStyles()
  const { formErrors } = useContext(FormErrorContext)

  const initFormContent: UserAccountSetting = {
    target: '',
    email: {
      email: ''
    },
    password: {
      password: '',
      passwordConfirmation: ''
    },
    oldPassword: ''
  }

  const [formContent, setFormContent] = useState(initFormContent)

  const handleChangeEmail = (e) => {
    setFormContent(
      {
        ...formContent,
        email: {
          email: e.target.value
        }
      }
    );
  }

  const handleChangeOldPassword = (e) => {
    setFormContent(
      {
        ...formContent,
        oldPassword: e.target.value
      }
    );
  }

  const handleChangePassword = (e) => {
    setFormContent(
      {
        ...formContent,
        password: {
          ...formContent.password,
          password: e.target.value
        }
      }
    );
  }

  const handleChangePasswordConfirmation = (e) => {
    setFormContent(
      {
        ...formContent,
        password: {
          ...formContent.password,
          passwordConfirmation: e.target.value
        }
      }
    );
  }

  const handleClickUpdate = (target, e) => {
    e.preventDefault()
    console.log(formContent)
    axiosWithAlert.patch(`/users/update`, {
      user: {
        ...formContent,
        target: target
      }
    })
      .then(res => {
        console.log(res)
      })

      .catch(res => {
      })
  }
  
  return (
    <>
      <Typography variant="h1" className={layoutClasses.pageTitle}>アカウント設定</Typography>
      <Box>
        <Typography variant="h6" className={layoutClasses.formTitle}>メールアドレス</Typography>
        <form>
          <Box>
            <Box className={layoutClasses.label}>
              <label>メールアドレス</label>
            </Box>
            <InputWithError
              formErrors={formErrors}
              attribute='email'
            >
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
              />
            </InputWithError>
          </Box>
          <Box className={layoutClasses.submitButtonWrapper}>
            <Button onClick={(e) => {handleClickUpdate("email", e)}} variant="contained" className={layoutClasses.submitButton}>変更する</Button>
          </Box>
        </form>
      </Box>

      <Box>
        <Typography variant="h6" className={layoutClasses.formTitle}>パスワード</Typography>
        <form>
          <Box>
            <Box className={layoutClasses.label}>
              <label>現在のパスワード</label>
            </Box>
            <TextField
              id="user_old_password_confirmation"
              // label="現在のパスワード"
              placeholder="現在のパスワード入力"
              // helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleChangeOldPassword}
              type="password"
            />
          </Box>

          <Box>
            <Box className={layoutClasses.label}>
              <label>変更後パスワード</label>
            </Box>
            <TextField
              id="user_password"
              // label="変更後パスワード"
              placeholder="変更後パスワード入力"
              // helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleChangePassword}
              type="password"
            />
          </Box>

          <Box>
            <Box className={layoutClasses.label}>
              <label>変更後確認用パスワード</label>
            </Box>
            <TextField
              id="user_password_confirmation"
              // label="変更後確認用パスワード"
              placeholder="変更後確認用パスワード入力"
              // helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleChangePasswordConfirmation}
              type="password"
            />
          </Box>
          <Box className={layoutClasses.submitButtonWrapper}>
            <Button onClick={(e) => {handleClickUpdate("password", e)}} variant="contained" className={layoutClasses.submitButton}>変更する</Button>
          </Box>
        </form>
      </Box>
    </>
  )
}
export default AccountSetting;
