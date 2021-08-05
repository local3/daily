import React, { useState, useEffect } from "react"
import axios from "axios"
import { DictionaryType } from "../../types"
import { List, ListItem, ListItemText, IconButton, ListItemSecondaryAction } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { axiosWithAlert } from "../../store/Axios"
import { useDictionaryStyles } from "../../styles/js/dictionary"


const Dictionary = () => {
  const dictionaryClasses = useDictionaryStyles()
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

  const destroyDictionary = (e, dictionaryId) => {
    axiosWithAlert.delete(`/dictionaries/${dictionaryId}`)
      .then(res => {
        e.target.parentNode.remove()
        document.querySelector(`div[aria-label='dictionary_id_${dictionaryId}']`)?.remove()
      })
  }

  return(
    <>
      <h1>My辞書一覧</h1>
      <List component="nav" aria-label="mailbox folders">
        {dictionaries.map((dictionary) => (
          <ListItem key={dictionary.id} aria-label={`dictionary_id_${dictionary.id}`} button divider>
            <ListItemText primary={dictionary.word} />
            <ListItemSecondaryAction>
              <IconButton onClick={ (e) => destroyDictionary(e, dictionary.id) } edge="end" >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  )
}
export default Dictionary