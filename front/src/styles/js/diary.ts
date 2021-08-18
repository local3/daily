import themes from "./themes"
import { makeStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/styles";

const diaryStyles: any = {
  // 全体
  backgroudLayer: {
    zIndex: 1220,
    display: 'inline',
    position: 'absolute',
    backgroundColor: themes.gray,
    height: '200vw',
    width: '100vw',
    top: 0,
    left: 0,
    opacity: 0.7
  },
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
  diaryFormTextareaWrapperStrong: {
    position: 'absolute',
    top: '40px',
    left: 0,
    zIndex: 1220
  },
  diaryFormTextarea: {
    width: '90vw',
    height: '30vh',
    fontSize: '130%'
  },
  diaryFormContentEditable: {
    width: '90vw',
    height: '30vh',
    fontSize: '130%',
    border: '1px solid',
    textAlign: 'start',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.5em'
  },
  // My辞書ボタン
  optionFirstButton: {
    zIndex: 1220,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: themes.gray,
    bottom: 70,
    right: 20,
    width: 60,
    height: 60,
  },
  optionSecondButton: {
    zIndex: 1220,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: themes.gray,
    bottom: 140,
    right: 20,
    width: 60,
    height: 60,
  },
  optionThirdButton: {
    zIndex: 1220,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: themes.gray,
    bottom: 210,
    right: 20,
    width: 60,
    height: 60,
  },
}

export default diaryStyles

export const useDiaryStyles = makeStyles({
  ...diaryStyles
  }
)