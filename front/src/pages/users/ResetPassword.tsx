import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { AuthContext } from "../../store/Auth";

function ResetPassword() {
  const initPasswordContent = {
    password: '',
    passwordConfirmation: ''
  }
  const [passwordContent, setPasswordContent] = useState(initPasswordContent);

  const handleChangePassword = (e) => {
    setPasswordContent(
      {
        ...passwordContent,
        password: e.target.value
      }
    );
  };

  const handleChangePasswordConfirmation = (e) => {
    setPasswordContent(
      {
        ...passwordContent,
        passwordConfirmation: e.target.value
      }
    );
  };

  const handleSubmit = () => {
    axios.patch(`/password_resets/update`, {user: passwordContent})
      .then(res =>{
        console.log(res)
      })
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <label>パスワード：</label>
        <input type="text"
          name="password"
          onChange={handleChangePassword}
        />

        <label>パスワード確認：</label>
        <input type="text"
          name="password"
          onChange={handleChangePasswordConfirmation}
        />

        <button type="submit">パスワード変更</button>
      </form>
    </>
  )
}
export default ResetPassword;
