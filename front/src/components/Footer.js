import React,{ useLayoutEffect, useState }  from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { 
  CalendarToday, FileCopy, Create, LocalOffer, MoreHoriz,
  CalendarTodayOutlined, FileCopyOutlined, CreateOutlined, LocalOfferOutlined, MoreHorizOutlined
} from '@material-ui/icons';
import layoutStyles, { useLayoutStyles } from '../styles/js/layout';
import { useHistory } from 'react-router-dom'

const Footer = () => {
  const history = useHistory();
  const layoutClasses = useLayoutStyles()
  const [value, setValue] = useState(0);
  const redirectAction = (url) => {
    console.log(url)
    history.push(url)
  }
  
  const navActions = [
    {label: "カレンダー", icon: <CalendarToday />, iconSelected: <CalendarTodayOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/calendar')},
    {label: "メモ", icon: <FileCopy />, iconSelected: <FileCopyOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/memos')},
    {label: "書く", icon: <Create />, iconSelected: <CreateOutlined />, className: "footerCenterButton", selectedClassName: "selectedFooterCenterButton", action: ()=>redirectAction('/')},
    {label: "My辞書", icon: <LocalOffer />, iconSelected: <LocalOfferOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/')},
    {label: "その他", icon: <MoreHoriz />, iconSelected: <MoreHorizOutlined />, className: "footerButton", selectedClassName: "selectedFooterButton", action: ()=>redirectAction('/')}
  ]
  console.log(navActions)
  return(
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          // console.log(navActions)
          // console.log(newValue)
          // console.log(navActions[newValue])
          // navActions[newValue].action()
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
        {/* <BottomNavigationAction label="カレンダー" icon={value===0 ? <CalendarToday /> : <CalendarTodayOutlined />} className={layoutClasses.footerButton} />
        <BottomNavigationAction label="メモ一覧" icon={<FileCopy />} className={layoutClasses.footerButton} />
        <BottomNavigationAction label="書く" icon={<Create />} className={layoutClasses.footerButton} />
        <BottomNavigationAction label="My辞書" icon={<LocalOffer />} className={layoutClasses.footerButton} />
        <BottomNavigationAction label="その他" icon={<MoreHoriz />} className={layoutClasses.footerButton} /> */}
      </BottomNavigation>
    </>
  )
}

export default Footer;