import diaryStyles from "./diary"
import layoutStyles from "./layout";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  ...diaryStyles,
  ...layoutStyles
  }
)
// console.log(useStyles())

