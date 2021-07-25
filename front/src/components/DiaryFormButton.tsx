import React from 'react'
import { Box, Button } from '@material-ui/core'

type Props = {
  color: string
  className: any
  endIcon: any
  onClickAction: () => void
  text: string | undefined
}
const DiaryFormButton = (props: Props) => {
  return(
    <>
      <Button
        variant="contained"
        color={props.color}
        className={props.className}
        endIcon={props.endIcon}
        onClick={props.onClickAction}
      >
        {props.text}
      </Button> 
    </>
  )
}

export default DiaryFormButton