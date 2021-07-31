import React, { useState, useEffect } from "react";
import axios from "axios";
import { Memo } from "../types";
import MemoModalWrapper from "../components/MemoModalWrapper";
import { List } from '@material-ui/core'

const MemoTop = () => {

  const initMemos: Memo[] = [];
  const [memos, setMemos] = useState(initMemos);

  const initEffect = () => {
    axios.get("/memos/user_memos")
      .then((res) => {
        console.log(res)
      setMemos(res.data.memos);
    });
  };

  useEffect(initEffect, [])

  return (
    <div>
      <h1>メモ一蘭</h1>
      <List component="nav" aria-label="mailbox folders">
        {memos.map((memo) => (
          <MemoModalWrapper key={memo.id} existMemo={memo} />
        ))}
      </List>
    </div>
  )
}

export default MemoTop;
