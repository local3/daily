import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Memo } from "../../types";
import MemoModalWrapper from "../../components/memos/MemoModalWrapper";
import { List } from '@material-ui/core'
import { ConvertContext } from "../../store/ConvertProvider";

const MemoTop = () => {
  const { memoFlag } = useContext(ConvertContext)
  const initMemos: Memo[] = [];
  const [memos, setMemos] = useState(initMemos);

  const initEffect = () => {
    axios.get("/memos/user_memos")
      .then((res) => {
        console.log(res)
      setMemos(res.data.memos);
    });
  };

  useEffect(initEffect, [memoFlag])

  return (
    <div>
      <h1>メモ一覧</h1>
      <List component="nav" aria-label="mailbox folders">
        {memos.map((memo) => (
          <MemoModalWrapper key={memo.id} existMemo={memo} />
        ))}
      </List>
    </div>
  )
}

export default MemoTop;
