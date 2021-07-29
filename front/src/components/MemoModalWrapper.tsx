import React, { useState, useContext } from 'react'
// import { AuthContext } from "../store/Auth"
import { Add } from '@material-ui/icons';
import { Button, ListItem,  ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core/'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { useLayoutStyles } from '../styles/js/layout'
// Modal設定
import Modal from "react-modal"
import MemoForm from './MemoForm';
import { Memo } from '../types';
import axios from 'axios'

// Modalをid="root"の一番上要素に指定することで全体を覆うことができる
Modal.setAppElement("#root")
type Props = {
  existMemo: Memo | undefined
}
const MemoModalWrapper = (props: Props) => {
  const layoutClasses = useLayoutStyles()

  const [isOpen, setIsOpen] = useState(false)
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }
  const destroyMemo = (e, memoId) => {
    axios.delete(`/memos/${memoId}`)
      .then(res => {
        // console.log(e.target.parentNode.parentNode.parentNode)
        // 無理やり消してる感。改修ポイント
        e.target.parentNode.remove()
        document.querySelector(`div[aria-label='memo_id_${memoId}']`)?.remove()
        // document.querySelector(`div[aria-label='memo_id_${memoId}']`)?.remove()
      })
  }

  return(
    <>
      {
        props.existMemo &&
        <ListItem key={props.existMemo.id} aria-label={`memo_id_${props.existMemo.id}`} button divider>
          <ListItemText primary={props.existMemo.content.slice(0, 5)} onClick={toggleModal} />
          <ListItemSecondaryAction>
            <IconButton onClick={(e) => destroyMemo(e, props.existMemo?.id)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
          {/* <button onClick={(e) => destroyMemo(e, props.existMemo?.id)}>削除</button> */}
        </ListItem>
      }
      {/* メモ追加の「+ボタン」 */}
      {
        !props.existMemo &&
          <Button onClick={toggleModal} className={layoutClasses.plusButton}>
            <Add />
          </Button>
      }
      {/* モーダル */}
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <button onClick={toggleModal}>閉じる</button>
        <MemoForm 
          memoId={props.existMemo !== null ? props.existMemo?.id : Number(0)}
          toggleModal={toggleModal}
        />
      </Modal>
    </>
  )
}

export default MemoModalWrapper;
