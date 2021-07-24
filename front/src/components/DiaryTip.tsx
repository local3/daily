import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { DateContext } from "../store/DateProvider"

const DiaryTip = () => {
  const dateContext = useContext(DateContext)
  const [diaryContent, setDiaryContetnt] = useState('未記入')
  axios.get(`/diaries/${dateContext.date}`)
    .then(res => {
      console.log(res)
      if(res.data.diary){
        setDiaryContetnt(res.data.diary.jaContent)
      }
    })
  return(
    <>
      { diaryContent &&
        <div>
          {dateContext.date}
          {diaryContent}
        </div>
      }
    </>
  )
}
export default DiaryTip