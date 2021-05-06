import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

class About extends React.Component {
  render(){
    return(
      <div>
        <Header/>
        About
		    <Footer/>
      </div>
    )
  }
}

export default About;