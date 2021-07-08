import { useStyles } from "./styles"
import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const layoutStyles = {
  contentWrapper: {
    width: "94vw",
    margin: "0 3vw",
  },
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
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: themes.clearWhite,
    borderTop: `1px solid ${themes.gray}`
  },
  footerButton: {
    // color: themes.white,
    whiteSpace: 'nowrap'
  },
  footerCenterButton: {
    padding: 0,
    border: '1px solid',
    borderRadius: '50%',
    padding: '0px',
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
  }
}

export default layoutStyles

export const useLayoutStyles = makeStyles({
  ...layoutStyles
  }
)