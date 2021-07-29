import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { DateContext } from "../store/DateProvider"
import { Drawer, Typography }  from '@material-ui/core'
import { useCalendarStyles } from "../styles/js/Calendar"

const DiaryTip = () => {
  // DateProviderからカレンダーで選択中の日付を取得
  const dateContext = useContext(DateContext)
  const date = dateContext.date
  const displayDate = date.replace(/(\d+)-(\d+)-(\d+)/, "$1年$2月$3日")
  const [diaryContent, setDiaryContetnt] = useState('')
  const calendarClasses = useCalendarStyles()
  const [isTipOpen, setIsTipOpen] = useState(true)
  
  const toggleDrawer = (event: React.MouseEvent,) => {
    setIsTipOpen(false)
  };

  // 日付に変更があった場合、日本語の日記内容を取得
  const updateDiaryTipEffect = () => {
    axios.get(`/diaries/${date}`)
    .then(res => {
      console.log(res)
      if(res.data.diary){
        if(res.data.diary.ja_content.length > 40){
          setDiaryContetnt(res.data.diary.ja_content.substring( 0, 40 ) + '...')
        }else{
          setDiaryContetnt(res.data.diary.ja_content)
        }
        setIsTipOpen(true)
        console.log(isTipOpen)
        // クラスを追加して、CSSを上書きする
        const element = document.querySelector('div[class=MuiBackdrop-root]')
        element && element.classList.add(calendarClasses.DrawerStyle)
      }else{
        setDiaryContetnt('')
      }
    })
  }

  useEffect(updateDiaryTipEffect, [date])

  // 日記未記入の場合は表示しない
  if (diaryContent) {
    return(
      <>
        <Drawer anchor={'bottom'} open={isTipOpen} onClose={toggleDrawer} className={calendarClasses.DrawerStyle}
          classes={{ paperAnchorBottom: calendarClasses.TipPaperStyle }}>
            <Typography variant="h6" classes={{ h6: calendarClasses.TipDateStyle}} gutterBottom>{displayDate}</Typography>
            <Typography>{diaryContent}</Typography>
        </Drawer>
      </>
    )
  }else{
    return(
      null
    )
  }
}
export default DiaryTip