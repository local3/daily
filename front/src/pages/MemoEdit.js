import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from "../store/Auth"
import { useParams } from "react-router-dom";
import MemoForm from '../components/MemoForm';

const MemoEdit = (props) => {

  const auth = useContext(AuthContext);
  const { memoId } = useParams()
  
  return(
    <>
      <MemoForm memoId={memoId}/>
      {/* <h1>メモーダル</h1>
      <button onClick={() => setIsOpen(false)}>閉じる</button>
      <form onSubmit={handleSubmit}>
        <label>内容：</label>
        <textarea type="text"
          name="content"  
          onChange={handleChangeContent}
        />

        <br/>

        <button type="submit">めも！</button>
      </form> */}
    </>
  )
}

export default MemoEdit;