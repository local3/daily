import { useParams } from "react-router-dom"
import MemoForm from '../../components/memos/MemoForm'
import { MemoId } from '../../types/index'
import { blankFunction } from '../../utils/functions'

const MemoEdit = () => {

  const { memoId } = useParams<MemoId>()
  
  return(
    <>
      <MemoForm memoId={Number(memoId)} toggleModal={blankFunction}/>
    </>
  )
}

export default MemoEdit;
