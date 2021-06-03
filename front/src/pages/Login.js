import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { AuthContext } from "../Auth";

const Login = () => {
  const auth = useContext(AuthContext);
  console.log("Login Component")
  console.log(auth)

  const initSession = {
    email: '',
    password: '',
    rememberMe: false
  }
  const [session, setSession] = useState(initSession)

  const handleChangeEmail = (e) => {
    console.log(e)
    setSession({
				...session,
				email: e.target.value
    });
    console.log (session)
  };

  const handleChangePassword = (e) => {
    console.log(e)
    setSession({
      ...session,
      password: e.target.value
    });
    console.log (session)
  };

  const handleChangeRemember = (e) => {
    console.log(e);
    setSession({
      ...session,
      rememberMe: e.target.checked
    });
    console.log (session)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const session = this.state.session
		console.log(session);

    axios.post(`/login`, { session: session })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
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