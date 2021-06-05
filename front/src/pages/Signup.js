import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../Auth";

function Signup() {
  // URL遷移用
  const history = useHistory();
  const auth = useContext(AuthContext);
  
  const initUser =
      {
        email: '',
        password: '',
        passwordConfirmation: '',
        languageId: 1
      }
  
  const [user, setUser] = useState(initUser);
  const [languages, setLanguages] = useState([])  

  const componentDidMount = () => {
    axios.get(`/languages`)
      .then(res => {
        const languages = res.data;
        setLanguages(languages);
        // console.log(languages)
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

		// console.log(user);

    axios.post(`/users`, {user: user})
      .then(res => {
        history.push('/')
        // console.log(res);
        // console.log(res.data);
      })
  }

  return(
    <div>
      <h1>会員登録ページ</h1>
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