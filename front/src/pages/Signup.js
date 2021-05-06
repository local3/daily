import React from 'react'
// import axios from 'axios';
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Signup extends React.Component {
  get axios() {
    const axiosBase = require('axios');
    return axiosBase.create({
        baseURL: process.env.REACT_APP_DEV_API_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        responseType: 'json'
    });
  }
  
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
    this.axios.get(`/languages`)
      .then(res => {
        const languages = res.data;
        this.setState({ languages });
        console.log(res)
      })
  }

  handleEmailInput = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePasswordInput = e => {
    this.setState({
      password: e.target.value
    });
  };

  handlePasswordConfirmationInput = e => {
    this.setState({
      passwordConfirmation: e.target.value
    });
  };

  handleLanguageInput = e => {
    this.setState({
      languageId: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = this.state.user

    this.axios.post(`http://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render(){
    return(
      <div>
        <Header/>
       	<h1>会員登録ページ</h1>
          <form onSubmit={this.handleSubmit}>
            <label>メールアドレス：</label>
            <input type="text"
              name="email" 
              value={this.state.user.email} 
              onChange={this.handleEmailInput}
            />

            <br/>

            <label>パスワード：</label>
            <input type="text"
              name="password" 
              value={this.state.user.password} 
              onChange={this.handleInput}
            />

            <br/>

            <label>パスワード確認用：</label>
            <input type="text"
              name="password_confirmation" 
              value={this.state.user.passwordConfirmation} 
              onChange={this.handleInput}
            />

            <br/>

            <label>言語選択：</label>
            <input type="text"
              name="language" 
              value={this.state.user.email} 
              onChange={this.handleInput}
            />
         </form>
				<Footer/>
      </div>
    )
  }
}

export default Signup;