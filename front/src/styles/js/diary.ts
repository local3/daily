import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/styles";

const diaryStyles: any = {
  //　日記関連
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
  },
  // My辞書ボタン
  optionFirstButton: {
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: themes.gray,
    bottom: 70,
    right: 20,
    width: 60,
    height: 60
  },
  optionSecondButton: {
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: themes.gray,
    bottom: 140,
    right: 20,
    width: 60,
    height: 60
  }
}

export default diaryStyles

export const useDiaryStyles = makeStyles({
  ...diaryStyles
  }
)