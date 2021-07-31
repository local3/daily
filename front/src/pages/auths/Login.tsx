import React, { useState, useContext } from 'react'
import { AuthContext } from "../../store/Auth";
import { Session, Auth } from '../../types/index'

const Login = () => {
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
        <form onSubmit={handleSubmit}>
          <label>メールアドレス：</label>
          <input type="text"
            name="email"  
            onChange={handleChangeEmail}
          />

          <br/>

          <label>パスワード：</label>
          <input type="text"
            name="password"  
            onChange={handleChangePassword}
          />

          <br/>

          <label>記憶する：</label>
          <input type="checkbox"
            name="remember_me"
            onChange={handleChangeRemember}
          />

          <br/>

          <button type="submit">ログイン</button>
        </form>
    </div>
  )
}

export default Login;
