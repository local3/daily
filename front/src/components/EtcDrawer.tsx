import React,{ useState, useContext, useEffect }  from 'react'
import { List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Divider, Typography } from '@material-ui/core'
import { 
  CalendarToday, FileCopy, Create, LocalOffer, MoreHoriz,
  CalendarTodayOutlined, FileCopyOutlined, CreateOutlined, LocalOfferOutlined, MoreHorizOutlined,
  Check
} from '@material-ui/icons'
import { useLayoutStyles } from '../styles/js/layout'
import { useHistory } from 'react-router-dom'


type Props = {
  isOpenEtcDrawer: boolean
  toggleEtcDrawer(): void
}

const EtcDrawer = (props: Props) => {
  // console.log("fppter")
  const history = useHistory();
  const layoutClasses = useLayoutStyles()

  const redirectAction = (url) => {
    history.push(url)
    props.toggleEtcDrawer()
  }
  const userSettingList = [
    {name: '基本設定', action: () => redirectAction('/settings/account'), icon: null},
    {name: '言語設定', action: () => redirectAction('/settings/language'), icon: null}
  ]
  const guideList = [
    {name: '使い方', action: () => redirectAction('/settings/account'), icon: null},
    {name: 'ヘルプ', action: () => redirectAction('/settings/account'), icon: null},
    {name: 'お問い合わせ', action: () => redirectAction('/settings/account'), icon: null},
    {name: 'プライバシーポリシー', action: () => redirectAction('/settings/account'), icon: null},
  ]
  return(
    <>
      <SwipeableDrawer
          anchor='right'
          open={props.isOpenEtcDrawer}
          onClose={props.toggleEtcDrawer}
          onOpen={props.toggleEtcDrawer}
        >
          <Typography variant="inherit">設定</Typography>
          <Divider/>
          <List>
            {userSettingList.map((value) => (
              <ListItem button key={value.name} onClick={value.action}>
                <ListItemIcon>{value.icon}</ListItemIcon>
                <ListItemText primary={value.name} />
              </ListItem>
            ))}
          </List>

          <Typography variant="inherit">その他</Typography>
          <Divider/>
          <List>
          {guideList.map((value) => (
              <ListItem button key={value.name} onClick={value.action}>
                <ListItemIcon>{value.icon}</ListItemIcon>
                <ListItemText primary={value.name} />
              </ListItem>
            ))}
          </List>
      </SwipeableDrawer>
    </>
  )
}

export default EtcDrawer;
