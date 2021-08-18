import { useStyles } from "./styles"
import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const layoutStyles: any = {
  // 全体を覆う。左右に余白をつける
  contentWrapper: {
    width: "94vw",
    margin: "5vh 3vw",
    textAlign: "center"
  },
  // header関連
  header: {
    color: themes.clearWhite,
    backgroundColor: themes.darkBeige
  },
  headerLink: {
    color: themes.clearWhite,
    textDecoration: 'none',
    fontWeight: "bold"
  },
  plusButton: {
    color: themes.clearWhite,
    backgroundColor: themes.darkBeige,
    border: 'none',
    position: 'relative',
    left: '70%'
  },
  loginLink: {
    border: 'none',
    position: 'relative',
    left: '49vw',
    color: themes.clearWhite,
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  // footer関連
  footer: {
    // .MuiDrawer-paperを上回るz-indexを指定
    zIndex: 1210,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: themes.clearWhite,
    borderTop: `1px solid ${themes.gray}`
  },
  footerButton: {
    whiteSpace: 'nowrap'
  },
  footerCenterButton: {
    padding: 0,
    border: '1px solid',
    borderRadius: '50%',
    backgroundColor: themes.darkBrown,
    color: themes.clearWhite,
    whiteSpace: 'nowrap',
    minWidth: '40px',
    width: '55px',
    maxWidth: '60px'
  },
  selectedFooterButton: {
    color: `${themes.darkBrown}!important`
  },
  selectedFooterCenterButton: {
    color: `${themes.clearWhite}!important`
  },
  // EtcDrawer関連
  etcDrawerWrapper: {
    paddingTop: '5px',
    paddingLeft: '10px'
  },
  etcDrawerMainTitle: {
    fontSize: '120%',
    fontWeight: 'bold'
  },
  // Load関連
  loadWrapper: {
    zIndex: 9999999,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#fff',
    opacity: 0.6,
    textAlign: 'center',
    paddingTop: '40vh'
  },
  // Form関連
  pageTitle: {
    fontSize: '30px',
    textAlign: 'initial',
    borderBottom: `1px solid ${themes.gray}`,
    marginBottom: '30px',
    color: themes.lightBrown
  },
  formTitle: {
    textAlign: 'initial',
    borderBottom: `1px solid ${themes.gray}`
  },
  label: {
    textAlign: 'initial',
    margin: '5px'
  },
  submitButtonWrapper: {
    textAlign: 'end'
  },
  submitButton: {
    backgroundColor: themes.green,
    color: themes.clearWhite
  }
}

export default layoutStyles

export const useLayoutStyles = makeStyles({
  ...layoutStyles
  }
)
