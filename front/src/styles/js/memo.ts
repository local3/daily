import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const memoStyles = {
  memoFormTextarea: {
    width: '100%',
    height: '70vh',
    border: 'none'
  }
}

export default memoStyles

export const useMemoStyles = makeStyles({
  ...memoStyles
  }
)
