import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const memoStyles: any = {
  memoFormTextarea: {
    width: '100%',
    height: '70vh',
    border: 'none'
  },
  memoHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'relative'
  },
  memoHeaderArrowIcon: {
    position: 'absolute',
    left: 0
  }
}

export default memoStyles

export const useMemoStyles = makeStyles({
  ...memoStyles
  }
)
