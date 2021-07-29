import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../store/Auth";
import { Memo } from "../types";
import MemoModalWrapper from "../components/MemoModalWrapper";
import { List, ListItem, ListItemText, Divider } from '@material-ui/core'

const MemoTop = () => {
  const auth = useContext(AuthContext);

  const initMemos: Memo[] = [];
  const [memos, setMemos] = useState(initMemos);

  const initEffect = () => {
    axios.get("/memos/user_memos").then((res) => {
      setMemos(res.data.memos);
    });
  };

  useEffect(initEffect, []);

  const destroyMemo = (e, memoId) => {
    axios.delete(`/memos/${memoId}`).then((res) => {
      e.target.parentNode.remove();
    });
  };

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
