import { useStyles } from "./styles"
import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const layoutStyles = {
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
    postion: 'relative',
    left: '70%'
  },
  // footer関連
  footer: {
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
  }
}

export default layoutStyles

export const useLayoutStyles = makeStyles({
  ...layoutStyles
  }
)
