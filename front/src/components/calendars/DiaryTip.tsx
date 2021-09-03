import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { DateContext } from "../../store/DateProvider"
import { Drawer, Typography, Divider }  from '@material-ui/core'
import { useCalendarStyles } from "../../styles/js/calendar"

const DiaryTip = () => {
  // DateProviderからカレンダーで選択中の日付を取得
  const dateContext = useContext(DateContext)
  const date = dateContext.globalDate
  const displayDate = date.replace(/(\d+)-(\d+)-(\d+)/, "$1年$2月$3日")
  const [diaryContent, setDiaryContetnt] = useState('')
  const [existDiary, setExistDiary] = useState(false)
  const calendarClasses = useCalendarStyles()

  const toggleDrawer = () => {
    // DiaryTipの切り替え
    setExistDiary(false)
    if(diaryContent){
      setTimeout(() => {
        setExistDiary(true)
      }, 300)
    }
  }

  // 日付に変更があった場合、日本語の日記内容を取得
  const updateDiaryTipEffect = async () => {
    await axios.get(`/diaries/${date}`)
      .then(res => {
        if(res.data.diary){
          if(res.data.diary.ja_content.length > 40){
            setDiaryContetnt(res.data.diary.ja_content.substring( 0, 40 ) + '...')
          }else{
            setDiaryContetnt(res.data.diary.ja_content)
          }
        }else{
          setDiaryContetnt('')
        }
      })
  }

  useEffect(() => {updateDiaryTipEffect()}, [date])
  useEffect(() => toggleDrawer() ,[diaryContent])

  // 日記記入済みの場合のみ表示
  if (diaryContent) {
    return(
      <>
        <Drawer anchor={'bottom'} open={existDiary} className={calendarClasses.drawerStyle}
          classes={{ paperAnchorBottom: calendarClasses.tipPaperStyle }} transitionDuration={300} BackdropProps={{open: false}}>
            <Typography variant="h6" classes={{ h6: calendarClasses.tipDateStyle}} >{displayDate}</Typography>
            <Divider />
            <Typography className={calendarClasses.tipContentStyle}>{diaryContent}</Typography>
        </Drawer>
      </>
    )
  }else{
    return null
  }
}
export default DiaryTip