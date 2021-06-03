import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from "react-router-dom";
import axios from 'axios';

const Diary = (props) => {
  const {date} = useParams();
  // const initDiary = {
  //   jaContent: ''
  // }
  // const initDiaryContent = {
  //   content: '',
  //   languageId: 1
  // }
  // const [diary, setDiary] = useState(initDiary)
  // const [diaryContent, setDiaryContent] = useState(initDiaryContent)

  const fetchDiary = () => {
    axios.get(`/diaries/${date}`)
      .then(res => {
        console.log(res)
        // if(res.data.diary){
        //   setDiary({
        //     jaContent: res.data.diary.content
        //   })
        // }
      })
  }

  useEffect(() => {
    fetchDiary()
  }, []);

  return(
    <div>
      Diary:{date}
    </div>
  )
}

export default Diary;