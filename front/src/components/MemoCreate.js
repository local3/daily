import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from "../store/Auth"
import Modal from "react-modal"

Modal.setAppElement("#root")

const MemoCreate = (props) => {

  const auth = useContext(AuthContext);

  const initMemo = {
    content: ''
  }
  const [memo, setMemo] = useState(initMemo)
  const [isOpen, setIsOpen] = useState(false)

  const handleChangeContent = (e) => {
    setMemo({
				...memo,
				content: e.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(memo)
    axios.post(`/memos`, { memo: memo })
      .then(res => {
        setIsOpen(false)
      })
  };

  return(
    <>
      <h1>メモーダル</h1>
      <button onClick={() => setIsOpen(false)}>閉じる</button>
      <form onSubmit={handleSubmit}>
        <label>内容：</label>
        <textarea type="text"
          name="content"  
          onChange={handleChangeContent}
        />

        <br/>

        <button type="submit">めも！</button>
      </form>
    </>
  )
}

export default MemoCreate;