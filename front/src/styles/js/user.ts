import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const userStyles: any = {
  signUpButtonWrapper: {
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px'
  },
  signUpButton: {
    width: '100%',
    backgroundColor: themes.green,
    color: themes.clearWhite
  }
}

export default userStyles

export const useUserStyles = makeStyles({
  ...userStyles
  }
)
