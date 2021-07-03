import React, { useContext } from 'react'
import { LoadContext } from "../store/LoadProvider";

const Load = () => {
  const { isLoading } = useContext(LoadContext)
  if(isLoading){
    return(
      <div>
        Loading...
      </div>
    )
  }
  return null
}

export default Load;