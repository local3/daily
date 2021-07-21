import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { DateContext } from "../store/DateProvider"

const DiaryTip = () => {
  const dateContext = useContext(DateContext)
  // const diary_content = '未記入'
  // const date = dateContext.date
  // axios.get(`/diaries/${date}`, {date: date} )
  //   .then(res => {
  //     console.log(res)
  //     if(res.data.diary){
  //       diary_content = res.data.diary.ja_content
  //     }
  //   })
  return(
    <>
      {/* { diary_content &&
        {date},
        {diary_content}
      } */}
      
    </>
  )
}
export default DiaryTip