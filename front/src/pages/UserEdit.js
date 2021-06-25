import React, {useState, useEffect, useContext, useReducer} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import { AuthContext } from "../store/Auth";

function UserEdit() {
  const auth = useContext(AuthContext);
  const initSession =
    {
      email: '',
      password: ''
    }
  const initUser =
    {
      email: '',
      password: '',
      passwordConfirmation: '',
      languageId: auth.currentUser.language_id ? auth.currentUser.language_id : 0
    }
  console.log(auth)
  console.log(initUser)
  const [user, setUser] = useState(initUser);
  const [session, setSession] = useState(initSession);
  const [languages, setLanguages] = useState([]);
  
  const componentDidMount = () => {
    axios.get(`/languages`)
      .then(res => {
        const languages = res.data;
        setLanguages(languages);
        // console.log(languages)
      })
  }

  const initUserData = () => {
    setUser({
      ...user,
      languageId: auth.currentUser.language_id
    })
  }

  

  useEffect(componentDidMount, [])
  useEffect(initUserData, [auth])

  const handleChangeSessionEmail = (e) => {
    setSession(
      {
        ...session,
        email: e.target.value
      }
    );
  };

  const handleChangeSessionPassword = (e) => {
    setSession(
      {
        ...session,
        password: e.target.value
      }
    );
  };

  const handleChangeEmail = (e) => {
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
    setUser(
      {
        ...user,
        languageId: e.target.value
      }
    );
  };

  
  const handleClickUpdate = (columnNames, e) => {
    e.preventDefault();
    const reducer = (beforeResult, columnName) => {
      beforeResult[`${columnName}`] = user[columnName]
      console.log(beforeResult)
      return beforeResult
    };
    console.log(columnNames)
    const userParams = columnNames.reduce(reducer, {})
    console.log(userParams)
    axios.patch(`/users/update`, {
      session: session,
      user: userParams
    })
      .then(res => {
        console.log(res)
      })

      .catch(res => {
        console.log(res)
      })
  };

  return(
    <>
      <form>
        <div>本人確認</div>
        <label>メールアドレス：</label>
        <input type="text"
          name="email"
          onChange={handleChangeSessionEmail}
        />

        <br/>

        <label>パスワード：</label>
        <input type="text"
          name="password"
          type="password"
          onChange={handleChangeSessionPassword}
        />

        <br/>
        <br/>

        <div>変更用フォーム</div>
        <label>変更後メールアドレス：</label>
        <input type="text"
          name="email"
          onChange={handleChangeEmail}
        />
        <button onClick={(e) => {handleClickUpdate(["email"], e)}}>変更する</button>

        <br/>
        <br/>

        <label>変更後パスワード：</label>
        <input type="text"
          name="password"
          type="password"
          onChange={handleChangePassword}
        />
        
        <br/>

        <label>パスワード確認用：</label>
        <input type="text"
          name="password_confirmation"
          type="password"
          onChange={handleChangePasswordConfirmation}
        />
        <button onClick={(e) => handleClickUpdate(["password", "passwordConfirmation"], e)}>変更する</button>

        <br/>
        <br/>

        {console.log(auth.currentUser.language_id)}
        {console.log(typeof(auth.currentUser.language_id))}
        {console.log(user)}
        {console.log(languages[0])}
        <label>言語選択：</label>
        {/* <select onChange={handleChangeLanguage} defaultValue={auth.currentUser.language_id ? auth.currentUser.language_id : 3}>
          {languages.map(language => 
            <option key={Number(language.id)} value={Number(language.id)}>
              {language.name}
            </option>)
          }
        </select> */}
        <select onChange={handleChangeLanguage} value={user.languageId}>
          <option key={0} value={0} disabled></option>
          {languages.map(language => 
            <option key={Number(language.id)} value={Number(language.id)}>
              {language.name}
            </option>)
          }
        </select>
        <button onClick={(e) => handleClickUpdate(["languageId"], e)}>変更する</button>

      </form>
    </>
  )
}
export default UserEdit;