import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Login extends React.Component {
  render(){
    return(
      <div>
        <Header/>
        Login
				<Footer/>
      </div>
    )
  }
}

export default Login;