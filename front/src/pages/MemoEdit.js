import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiso from 'axios'
import { AuthContext } from "../store/Auth";

const MemoTop = () => {
  const auth = useContext(AuthContext);

  const initMemos = []
  const [memos, setMemos] = useState(initMemos)

  const initEffect = () => {
    axiso.get('/memos/user_memos')
      .then(res => {
        setMemos(res.data.memos)
      })
  }

  useEffect(initEffect,[])

  return(
    <div>
      <h1>メモ一蘭</h1>
        <ul>
          {memos.map(memo => {
            <Link to={`/memos/${memo.id}`}>{memo.content.slice(0, 10)}</Link>
          })}
        </ul>
    </div>
  )
}

export default MemoTop;