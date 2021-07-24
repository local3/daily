import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";

const diaryStyles = {
  button: {
    color: "#ffff",
    fontSize: "1.2rem"
  },
  diaryFormWrapper: {
    height: '40vh',
    position: 'relative'
  },
  diaryFormButton: {
    borderRadius: '20px',
    left: 0,
    position: 'absolute'
  },
  diaryFormTextareaWrapper: {
    position: 'absolute',
    top: '40px',
    left: 0
  },
  diaryFormTextarea: {
    width: '90vw',
    height: '30vh'
  }
}

export default diaryStyles

export const useDiaryStyles = makeStyles({
  ...diaryStyles
  }
)