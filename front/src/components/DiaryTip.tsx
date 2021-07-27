import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { DateContext } from "../store/DateProvider"
import { Card, CardContent, Typography }  from '@material-ui/core'
import { useCalendarStyles } from "../styles/js/Calendar"

const DiaryTip = () => {
  // DateProviderからカレンダーで選択中の日付を取得
  const dateContext = useContext(DateContext)
  const date = dateContext.date.replace(/(\d+)-(\d+)-(\d+)/, "$1年$2月$3日")
  const [diaryContent, setDiaryContetnt] = useState('')
  const calendarClasses = useCalendarStyles()

  // 日付に変更があった場合、日本語の日記内容を取得
  const updateDiaryTipEffect = () => {
    axios.get(`/diaries/${date}`)
    .then(res => {
      console.log(res)
      if(res.data.diary){
        setDiaryContetnt(res.data.diary.ja_contentstr.substring( 0, 20 ) + '...')
        console.log(diaryContent)
      }else{
        setDiaryContetnt('未記入')
      }
    })
  }

  useEffect(updateDiaryTipEffect, [date])
  
  return(
    <>
      <Card className={calendarClasses.CardStyles}>
        <CardContent>
            <div>
              <Typography variant="h5" gutterBottom>{date}</Typography>
              <Typography>{diaryContent}</Typography>
            </div>
        </CardContent>
      </Card>
    </>
  )
}
export default DiaryTip