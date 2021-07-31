import React, { useContext } from 'react'
import { AuthContext } from "../store/Auth"
import { useParams } from "react-router-dom";
import MemoForm from '../components/MemoForm';
import ModalWrapper from '../components/MemoModalWrapper';

const MemoEdit = () => {

  const auth = useContext(AuthContext);
  const { memoId } = useParams()
  
  return(
    <>
      <MemoForm memoId={memoId} toggleModal={null}/>
      {/* <ModalWrapper text="メモる">
        <MemoForm memoId={memoId}/>
      </ModalWrapper> */}
    </>
  )
}

export default MemoEdit;
