import React, { useState, useEffect } from "react"
import axios from "axios"
import { DictionaryType } from "../../types"
import MemoModalWrapper from "../../components/memos/MemoModalWrapper"
import { List, ListItem, ListItemText } from '@material-ui/core'

const Dictionary = () => {
  const initialDictionaries: DictionaryType[] = []
  const [dictionaries, setDictionaries] = useState(initialDictionaries)
  
  const initEffect = () => {
    axios.get('/dictionaries/user_dictionaries')
      .then(res => {
        console.log(res)
        setDictionaries(res.data.dictionaries)
      })
  }

  useEffect(initEffect, [])

  return(
    <>
      <h1>ユーザー辞書一覧</h1>
      <List component="nav" aria-label="mailbox folders">
        {dictionaries.map((dictionary) => (
          <ListItem button>
            <ListItemText primary={dictionary.word} />
          </ListItem>
        ))}
      </List>
    </>
  )
}
export default Dictionary