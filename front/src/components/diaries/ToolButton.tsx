import React, { useState, useEffect, useContext } from 'react'
import { Box, Button, IconButton } from '@material-ui/core'
import { Palette, EditLocation, Close } from '@material-ui/icons'
import { useDiaryStyles } from '../../styles/js/diary'


const ToolButton = () => {
  const [isOpenOption, setIsOpenOption] = useState(false)
  const diaryClasses = useDiaryStyles()


  const toggleIsOpenOption = () => {
    setIsOpenOption(!isOpenOption)
  }

  const handleDictionaryButton = () => {
    console.log('辞書つくるためにカーソル位置を選択するよ')
  }

  return(
    <>
      { isOpenOption ?
        <Button onClick={toggleIsOpenOption} className={diaryClasses.optionFirstButton} variant="contained">
          <Palette />
        </Button>
        :
        <Box>
          <Button onClick={handleDictionaryButton} className={diaryClasses.optionSecondButton} variant="contained">
            <EditLocation/>
          </Button>
          <Button onClick={toggleIsOpenOption} className={diaryClasses.optionFirstButton} variant="contained">
            <Close/>
          </Button>
        </Box>
      }
    </>
  )
}
export default ToolButton