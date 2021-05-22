import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

class Signup extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      passwordConfirmation: '',
      languageId: 1
    },
    languages: [],
  }

  componentDidMount() {
    axios.get(`/languages`)
      .then(res => {
        const languages = res.data;
        this.setState({ languages });
        console.log(languages)
      })

    axios.get(`/current_user`)
      .then(res => {
        const currentUser = res.data;
        this.setState({ currentUser });
        console.log(currentUser)
      })
  }

  handleChangeEmail = e => {
		console.log(e);
    this.setState({
      user: {
				...this.state.user,
				email: e.target.value
			}
    });
  };

  handleChangePassword = e => {
    this.setState({
			user: {
				...this.state.user,
				password: e.target.value
			}
    });
  };

  handleChangePasswordConfirmation = e => {
    this.setState({
			user: {
				...this.state.user,
				passwordConfirmation: e.target.value
			}
    });
  };

  handleChangeLanguage = e => {
		console.log(e);
    this.setState({
			user: {
				...this.state.user,
				languageId: e.target.value
			}
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = this.state.user
		console.log(user);

    axios.post(`/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render(){
    return(
      <div>
       	<h1>会員登録ページ</h1>
        <form onSubmit={this.handleSubmit}>
          <label>メールアドレス：</label>
          <input type="text"
            name="email"  
            onChange={this.handleChangeEmail}
          />

          <br/>

          <label>パスワード：</label>
          <input type="text"
            name="password"  
            onChange={this.handleChangePassword}
          />

          <br/>

          <label>パスワード確認用：</label>
          <input type="text"
            name="password_confirmation" 
            onChange={this.handleChangePasswordConfirmation}
          />

          <br/>

          <label>言語選択：</label>
          <select onChange={this.handleChangeLanguage}>
            {this.state.languages.map(language => <option key={language.id} value={language.id}>{language.name}</option>)}
          </select>
          <br/>
          <button type="submit">会員登録する</button>
        </form>
      </div>
    )
  }
}

export default Signup;