import React, { useContext } from 'react'
import { LoadContext } from "../../store/LoadProvider";
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { useLayoutStyles } from '../../styles/js/layout';

const Load = () => {
  const { isLoading } = useContext(LoadContext)
  const layoutClasses = useLayoutStyles()
  if(isLoading){
    return(
      <>
        {/* <Box className={layoutClasses.loadWrapper}></Box> */}
        <Box className={layoutClasses.loadWrapper}>
          <Box>
            <CircularProgress />
          </Box>
          <Typography>
            Loading...
          </Typography>
        </Box>
      </>
    )
  }
  return null
}

export default Load;
