import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../store/Auth";

const MemoTop = () => {
  const auth = useContext(AuthContext);

  const initMemos = []
  const [memos, setMemos] = useState(initMemos)

  const initEffect = () => {
    axios.get('/memos/user_memos')
      .then(res => {
        setMemos(res.data.memos)
      })
  }

  useEffect(initEffect,[])

  const destroyMemo = (e, memoId) => {
    axios.delete(`/memos/${memoId}`)
      .then(res => {
        e.target.parentNode.remove()
      })
  }
  
  return(
    <div>
      <h1>メモ一蘭</h1>
      <ul>
        {memos.map(memo => 
          <li key={memo.id}>
            <Link to={`/memos/${memo.id}`}>{memo.content.slice(0, 2)}</Link>
            <button onClick={(e) => destroyMemo(e, memo.id)}>削除</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default MemoTop;