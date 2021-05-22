import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

class Login extends React.Component {

  state = {
    session: {
      email: '',
      password: '',
      rememberMe: false
    }
  };

  handleChangeEmail = e => {
		console.log(e);
    this.setState({
      session: {
				...this.state.session,
				email: e.target.value
			}
    });
  };

  handleChangePassword = e => {
    this.setState({
			session: {
				...this.state.session,
				password: e.target.value
			}
    });
  };

  handleChangeRemember = e => {
    console.log(e);
    this.setState({
			session: {
				...this.state.session,
				rememberMe: e.target.checked
			}
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const session = this.state.session
		console.log(session);

    axios.post(`/login`, { session })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  };

  render(){
    return(
      <div>
        <h1>ログインページ</h1>
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

            <label>記憶する：</label>
            <input type="checkbox"
              name="remember_me"
              onChange={this.handleChangeRemember}
            />

            <br/>

						<button type="submit">ログイン</button>
         </form>
      </div>
    )
  }
}

export default Login;