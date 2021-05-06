import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Home extends React.Component {
  render(){
    return(
      <div>
        <Header/>
        Home
				<Footer/>
      </div>
    )
  }
}

export default Home;