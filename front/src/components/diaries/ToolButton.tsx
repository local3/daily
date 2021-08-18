import React from 'react'
import { Box, Button } from '@material-ui/core'
import { Palette, EditLocation, Close } from '@material-ui/icons'
import { useDiaryStyles } from '../../styles/js/diary'
import { ToolAction, ToolState } from '../../types/index'

// pages/Diaryから受け取る
type Props = {
  toolState: ToolState
  toolDispatch: React.Dispatch<ToolAction>
}

const ToolButton = (props: Props) => {
  const diaryClasses = useDiaryStyles()
  const toolState = props.toolState
  const toolDispatch = props.toolDispatch

  const toggleIsOpenOption = () => {
    toolDispatch({type: 'switchFlag'})
  }

  // My辞書追加モードに入る
  const handleDictionaryButton = (mode: string) => {
    toolDispatch({type: 'enterMode', mode: mode})
  }

  const OpeningToolButton = () => {
    return(
      <>
        <Box>
          <Button onClick={()=>handleDictionaryButton('setStartLocation')} className={diaryClasses.optionThirdButton} variant="contained">
            <EditLocation/>
          </Button>
          <Button onClick={()=>handleDictionaryButton('setEndLocation')} className={diaryClasses.optionSecondButton} variant="contained">
            <EditLocation/>
          </Button>
          <Button onClick={toggleIsOpenOption} className={diaryClasses.optionFirstButton} variant="contained">
            <Close/>
          </Button>
          </Box>
      </>
    )
  }

  const ClosingToolButton = () => {
    return(
      <>
        <Button onClick={toggleIsOpenOption} className={diaryClasses.optionFirstButton} variant="contained">
          <Palette />
        </Button>
      </>
    )
  }
  
  return(
    <>
      { toolState.isOpenOption ? <OpeningToolButton /> : <ClosingToolButton /> }
    </>
  )
}
export default ToolButton