import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from "../../store/Auth";
import { SignupForm, Language } from '../../types'

function Signup() {
  const auth = useContext(AuthContext);  
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
    e.preventDefault();
    auth.signup(user)
  }

  return(
    <div>
      <h1>会員登録ページ</h1>
      <form onSubmit={handleSubmit}>
        <label>メールアドレス：</label>
        <input type="text"
          name="email"
          value={user.email}
          onChange={handleChangeEmail}
        />

        <br/>

        <label>パスワード：</label>
        <input type="text"
          name="password"  
          onChange={handleChangePassword}
        />

        <br/>

        <label>パスワード確認用：</label>
        <input type="text"
          name="password_confirmation" 
          onChange={handleChangePasswordConfirmation}
        />

        <br/>

        <label>言語選択：</label>
        <select onChange={handleChangeLanguage}>
          {languages.map(language => 
            <option key={language.id} value={language.id}>
              {language.name}
            </option>)
          }
        </select>
        <br/>
        <button type="submit">会員登録する</button>
      </form>
    </div>
  )
}

export default Signup;
