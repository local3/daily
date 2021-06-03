import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from "react-router-dom";


const Diary = (props) => {
  const {date} = useParams();
  return(
    <div>
      Diary:{date}
    </div>
  )
}

export default Diary;