import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from "../store/Auth"
import { useHistory } from 'react-router';

type Props = {
  memoId: number
  toggleModal: () => void
}
const MemoForm: React.FC<Props> = (props: Props) => {
  const auth = useContext(AuthContext);
  const history = useHistory()

  const initMemo = {
    content: ''
  }
  const [memo, setMemo] = useState(initMemo)
  const [isEdit, setIsEdit] = useState(false)

  const initExitMemoEffect = () => {
    axios.get(`/memos/${props.memoId}`)
      .then(res => {
        const existMemo = res.data
        existMemo ? setIsEdit(true) : setIsEdit(false)
        if(existMemo){
          setMemo({
            ...memo,
            content: existMemo.content
          })
        }
      })
  }

  useEffect(initExitMemoEffect, [])
  
  const handleChangeContent = (e) => {
    setMemo({
				...memo,
				content: e.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isEdit 
      ? axios.patch(`/memos/${props.memoId}`, { memo: memo })
          .then(res => {
            isEdit ? history.push('/memos') : props.toggleModal()
          })
      : axios.post(`/memos`, { memo: memo })
          .then(res => {
            isEdit ? history.push('/memos') : props.toggleModal()
          })
  };

  return(
    <>
      <h1>メモーダル</h1>
      <form onSubmit={handleSubmit}>
        <label>内容：</label>
        <textarea
          name="content"  
          onChange={handleChangeContent}
          value={memo.content}
        />

        <br/>

        <button type="submit">めも！</button>
      </form>
    </>
  )
}

export default MemoForm;
