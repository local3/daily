import { useContext } from 'react'
import { AuthContext } from "../../store/Auth"
import { useParams } from "react-router-dom"
import MemoForm from '../../components/memos/MemoForm'
import ModalWrapper from '../../components/memos/MemoModalWrapper'
import { MemoId } from '../../types/index'
import { blankFunction } from '../../utils/functions'

const MemoEdit = () => {

  const auth = useContext(AuthContext);
  const { memoId } = useParams<MemoId>()
  
  return(
    <>
      <MemoForm memoId={Number(memoId)} toggleModal={blankFunction}/>
      {/* <ModalWrapper text="メモる">
        <MemoForm memoId={memoId}/>
      </ModalWrapper> */}
    </>
  )
}

export default MemoEdit;
