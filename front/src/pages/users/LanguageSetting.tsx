import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from "../../store/Auth"
import { axiosWithAlert } from '../../store/Axios'
import { useLayoutStyles } from '../../styles/js/layout'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, TextField } from '@material-ui/core'
import { UserEditSession, UserEditInfo, Language } from '../../types/index'

function LanguageSetting() {
  const auth = useContext(AuthContext)
  const layoutClasses = useLayoutStyles()

  const initSession: UserEditSession =
    {
      email: '',
      password: ''
    }
  const initUser: UserEditInfo =
    {
      email: '',
      password: '',
      passwordConfirmation: '',
      languageId: auth.currentUser?.languageId ? auth.currentUser.languageId : 0
    }
  const [user, setUser] = useState(initUser);
  const [session, setSession] = useState(initSession);
  const [languages, setLanguages] = useState<Language[]>([]);
  
  const componentDidMount = () => {
    axios.get(`/languages`)
      .then(res => {
        const languages = res.data;
        setLanguages(languages);
      })
  }

  const initUserData = () => {
    setUser({
      ...user,
      languageId: auth.currentUser?.languageId
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
      return beforeResult
    };
    const userParams = columnNames.reduce(reducer, {})
    axiosWithAlert.patch(`/users/update`, {
      session: session,
      user: userParams
    })
      .then(res => {
        console.log(res)
      })

      .catch(res => {
      })
  };

  return(
    <>
      <form>
        <div className={layoutClasses.formTitle}>本人確認</div>
        {/* <label>メールアドレス：</label> */}
        {/* <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="session_email">メールアドレス</InputLabel>
          <OutlinedInput
            id="session_email"
            value={session.email}
            // startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            onChange={handleChangeSessionEmail}
            placeholder="メールアドレス入力"
          />
        </FormControl> */}
        <TextField
          id="session_email"
          label="メールアドレス"
          style={{ margin: 8 }}
          placeholder="メールアドレス入力"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChangeSessionEmail}
        />
        <br/>

        {/* <label>パスワード：</label>
        <input type="text"
          name="password"
          type="password"
          onChange={handleChangeSessionPassword}
        /> */}
        <TextField
          id="session_password"
          label="メールアドレス"
          style={{ margin: 8 }}
          placeholder="パスワード入力"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChangeSessionPassword}
        />

        <br/>

        <div className={layoutClasses.formTitle}>変更用フォーム</div>
        {/* <label>変更後メールアドレス：</label>
        <input type="text"
          name="email"
          onChange={handleChangeEmail}
        /> */}
        <TextField
          id="user_password"
          label="変更後メールアドレス"
          style={{ margin: 8 }}
          placeholder="変更後メールアドレス入力"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChangeEmail}
        />
        <button onClick={(e) => {handleClickUpdate(["email"], e)}}>変更する</button>

        <br/>
        <TextField
          id="user_password"
          label="変更後パスワード"
          style={{ margin: 8 }}
          placeholder="変更後パスワード入力"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChangePassword}
        />
        
        <br/>

        {/* <label>パスワード確認用：</label> */}
        {/* <input type="text"
          name="password_confirmation"
          type="password"
          onChange={handleChangePasswordConfirmation}
        /> */}
        <TextField
          id="user_password_confirmation"
          label="変更後確認用パスワード"
          style={{ margin: 8 }}
          placeholder="変更後確認用パスワード入力"
          // helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChangePasswordConfirmation}
        />
        <button onClick={(e) => handleClickUpdate(["password", "passwordConfirmation"], e)}>変更する</button>

        <br/>
        <br/>
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
export default LanguageSetting;
