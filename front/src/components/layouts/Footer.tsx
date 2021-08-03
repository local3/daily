import React,{ useState, useContext, useEffect }  from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { 
  CalendarToday, FileCopy, Create, LocalOffer, MoreHoriz,
  CalendarTodayOutlined, FileCopyOutlined, CreateOutlined, LocalOfferOutlined, MoreHorizOutlined,
  Check
} from '@material-ui/icons'
import layoutStyles, { useLayoutStyles } from '../../styles/js/layout'
import { useHistory } from 'react-router-dom'
import { DateContext } from '../../store/DateProvider'
import { today } from '../../utils/Date'
import { DiaryFormContentContext } from '../../store/DiaryFormContentProvider'
import EtcDrawer from './EtcDrawer'

const Footer = () => {
  // console.log("fppter")
  const history = useHistory();
  const layoutClasses = useLayoutStyles()
  // 保存ボタンを押した時に保存フラグを立てる関数
  const { submitFlag, changeSubmitFlag } = useContext(DiaryFormContentContext)
  // 各ボタンを押した時にカレンダーで選択した日にちの日記作成画面に遷移できるようにするため
  const { globalDate } = useContext(DateContext)
  // /calendarにいるときは、選択した日時にの日記作成画面に遷移するが、そうでないときは、今日の日にちの日記作成画面に遷移する
  const redirectDate = history.location.pathname === '/calendar' ? globalDate : today
  const [value, setValue] = useState(0);
  const [isOpenEtcDrawer, setIsOpenEtcDrawer] = useState(false)

  // フッターのボタンを押したときのページ遷移のアクション
  const redirectAction = (url) => {
    history.push(url)
  }
  // 保存ボタンを押したときのアクション
  const saveAction = () => {
    console.log("saveAction")
    // 
    changeSubmitFlag(true)
  }
  // その他を押した時にDrawer表示を切り替える
  const toggleEtcDrawer = () => {
    console.log(isOpenEtcDrawer)
    setIsOpenEtcDrawer(!isOpenEtcDrawer)
  }
  // useEffect(()=>{console.log("aaa")}, [submitFlag])
  const navActions = [
    {label: "カレンダー", icon: <CalendarToday />, iconSelected: <CalendarTodayOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/calendar')},
    {label: "メモ", icon: <FileCopy />, iconSelected: <FileCopyOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/memos')},
    {label: "書く", icon: <Create />, iconSelected: <CreateOutlined />, className: "footerCenterButton", selectedClassName: "selectedFooterCenterButton", action: ()=>redirectAction(`/diary/${redirectDate}`)},
    {label: "保存", icon: <Check />, iconSelected: <Check />, className: "footerCenterButton", selectedClassName: "selectedFooterCenterButton", action: saveAction},
    {label: "My辞書", icon: <LocalOffer />, iconSelected: <LocalOfferOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/dictionary')},
    {label: "その他", icon: <MoreHoriz />, iconSelected: <MoreHorizOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: toggleEtcDrawer}
  ]
  return(
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className={layoutClasses.footer}
      >
        {/* 日記作成画面にいるとき以外は、保存ボタンを除外する */}
        {navActions.map((navAction, i) => {
          if (!history.location.pathname.includes('/diary')) {
            if( navAction.label === '保存'){
              return null
            }
            return (
              <BottomNavigationAction
                key={navAction.label}
                label={navAction.label}
                icon={value === i ? navAction.icon : navAction.iconSelected}
                className={layoutClasses[navAction.className]}
                classes={{ selected: layoutClasses[navAction.selectedClassName]}} 
                onClick={navAction.action}
              />
            )  
          }else{
            {/* 日記作成画面にいるとき以外は、書くボタンを除外する */}
            if( navAction.label === '書く'){
              return null
            }
            return (
              <BottomNavigationAction
                key={navAction.label}
                label={navAction.label}
                icon={value === i ? navAction.icon : navAction.iconSelected}
                className={layoutClasses[navAction.className]}
                classes={{ selected: layoutClasses[navAction.selectedClassName]}} 
                onClick={navAction.action}
              />
            )
          }
        })}
      </BottomNavigation>

      {/* Drawer */}
      <EtcDrawer
        isOpenEtcDrawer={isOpenEtcDrawer}
        toggleEtcDrawer={toggleEtcDrawer}
      />
    </>
  )
}

export default Footer;
