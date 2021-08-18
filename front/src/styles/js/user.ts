import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const userStyles: any = {
}

export default userStyles

export const useUserStyles = makeStyles({
  ...userStyles
  }
)
