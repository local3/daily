import React, { useState, useContext } from 'react'
import { AuthContext } from "../store/Auth"
import { useParams } from "react-router-dom";
import MemoForm from '../components/MemoForm';

const MemoEdit = (props) => {

  const auth = useContext(AuthContext);
  const { memoId } = useParams()
  
  return(
    <>
      <MemoForm memoId={memoId}/>
    </>
  )
}

export default MemoEdit;