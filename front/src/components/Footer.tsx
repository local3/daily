import React,{ useState, useContext }  from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { 
  CalendarToday, FileCopy, Create, LocalOffer, MoreHoriz,
  CalendarTodayOutlined, FileCopyOutlined, CreateOutlined, LocalOfferOutlined, MoreHorizOutlined
} from '@material-ui/icons';
import layoutStyles, { useLayoutStyles } from '../styles/js/layout';
import { useHistory } from 'react-router-dom'
import { DateContext } from '../store/DateProvider';
import { today } from '../utils/Date'

const Footer = () => {
  const history = useHistory();
  const layoutClasses = useLayoutStyles()
  const { date } = useContext(DateContext)
  const redirectDate = history.location.pathname === '/calendar' ? date : today
  const [value, setValue] = useState(0);
  const redirectAction = (url) => {
    history.push(url)
  }
  
  const navActions = [
    {label: "カレンダー", icon: <CalendarToday />, iconSelected: <CalendarTodayOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/calendar')},
    {label: "メモ", icon: <FileCopy />, iconSelected: <FileCopyOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/memos')},
    {label: "書く", icon: <Create />, iconSelected: <CreateOutlined />, className: "footerCenterButton", selectedClassName: "selectedFooterCenterButton", action: ()=>redirectAction(`/diary/${redirectDate}`)},
    {label: "My辞書", icon: <LocalOffer />, iconSelected: <LocalOfferOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/')},
    {label: "その他", icon: <MoreHoriz />, iconSelected: <MoreHorizOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/')}
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
        {navActions.map((navAction, i) => {
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
          }) 
        }
      </BottomNavigation>
    </>
  )
}

export default Footer;
