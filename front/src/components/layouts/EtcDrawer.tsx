import React,{ useContext }  from 'react'
import { List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Divider, Typography, Box } from '@material-ui/core'
import { SettingsOutlined, BuildOutlined, HelpOutline, Check, MailOutline, LocalLibraryOutlined, PersonAddOutlined, ExitToAppOutlined } from '@material-ui/icons'
import { useLayoutStyles } from '../../styles/js/layout'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../store/Auth'

type Props = {
  isOpenEtcDrawer: boolean
  toggleEtcDrawer(): void
}

const EtcDrawer = (props: Props) => {
  // console.log("fppter")
  const auth = useContext(AuthContext)
  const history = useHistory();
  const layoutClasses = useLayoutStyles()

  const redirectAction = (url) => {
    history.push(url)
    props.toggleEtcDrawer()
  }
  const userSettingList = [
    {name: '基本設定', action: () => redirectAction('/settings/account'), icon: <SettingsOutlined />},
    {name: 'その他設定', action: () => redirectAction('/settings/language'), icon: <BuildOutlined />}
  ]
  const guideList = [
    {name: '使い方', action: () => redirectAction('/settings/account'), icon: <LocalLibraryOutlined />},
    {name: 'ヘルプ', action: () => redirectAction('/settings/account'), icon: <HelpOutline />},
    {name: 'お問い合わせ', action: () => redirectAction('/settings/account'), icon: <MailOutline />},
    {name: 'プライバシーポリシー', action: () => redirectAction('/settings/account'), icon: <Check />},
  ]
  const guestList = [
    {name: 'ログイン', action: () => redirectAction('/login'), icon: <ExitToAppOutlined />},
    {name: 'ユーザー登録', action: () => redirectAction('/signup'), icon: <PersonAddOutlined />}
  ]
  return(
    <>
      <SwipeableDrawer
        anchor='right'
        open={props.isOpenEtcDrawer}
        onClose={props.toggleEtcDrawer}
        onOpen={props.toggleEtcDrawer}
      >
        
        <Box className={layoutClasses.etcDrawerWrapper}>
          {auth.currentUser &&
            <>
              <Typography variant="inherit" className={layoutClasses.etcDrawerMainTitle}>設定</Typography>
              <Divider/>
              <List>
                {userSettingList.map((value) => (
                  <ListItem button key={value.name} onClick={value.action}>
                    <ListItemIcon>{value.icon}</ListItemIcon>
                    <ListItemText primary={value.name} />
                  </ListItem>
                ))}
              </List>
            </>
          }
          {!auth.currentUser &&
            <>
              <Typography variant="inherit" className={layoutClasses.etcDrawerMainTitle}>ユーザー登録など</Typography>
              <Divider/>
              <List>
                {guestList.map((value) => (
                  <ListItem button key={value.name} onClick={value.action}>
                    <ListItemIcon>{value.icon}</ListItemIcon>
                    <ListItemText primary={value.name} />
                  </ListItem>
                ))}
              </List>
            </>
          }
          <Typography variant="inherit" className={layoutClasses.etcDrawerMainTitle}>その他</Typography>
          <Divider/>
          <List>
          {guideList.map((value) => (
              <ListItem button key={value.name} onClick={value.action}>
                <ListItemIcon>{value.icon}</ListItemIcon>
                <ListItemText primary={value.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default EtcDrawer;
