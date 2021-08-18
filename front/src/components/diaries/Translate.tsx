import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDiaryStyles } from '../../styles/js/diary'
import { IconButton } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import { FormatQuote, PostAdd } from '@material-ui/icons'
import { ToolAction, ToolState } from '../../types/index'
import { axiosWithAlert } from '../../store/Axios'

type Props = {
  jaContent: string
  languageId?: number
  toolState: ToolState
  toolDispatch: React.Dispatch<ToolAction>
}

const Translate: React.FC<Props> = (props: Props) => {
  const diaryClasses = useDiaryStyles()
  const [translatedText, setTranslatedText] = useState('')
  const toolState = props.toolState
  const toolDispatch = props.toolDispatch
  const [description, setDescription] = useState<string>('')

  const addDictionaryStyles = makeStyles(
    {
      startQuote: {
        position: 'absolute',
        top: toolState.startLocation.y,
        left: toolState.startLocation.x,
        color: 'green',
        width: '0.7em'
      },
      endQuote: {
        position: 'absolute',
        top: toolState.endLocation.y,
        left: toolState.endLocation.x,
        color: 'green',
        width: '0.7em'
      },
      addButton: {
        position: 'absolute',
        top: toolState.endLocation.y-20,
        left: toolState.endLocation.x+10,
      }
    }
  )
  const dicClasses = addDictionaryStyles()

  // console.log(translatedText)
  const handleTranslate = () => {
    // console.log(translatedText)
    const textParam = `?ja_content=${encodeURI(props.jaContent)}`
    const languageParam = `&language_id=${props.languageId}`
    console.log(languageParam)
    const queryParams = `${textParam}${languageParam}`
    axios.get(`/diaries/translate_text${queryParams}`)
    .then(res => {
      console.log(res.data)
      setTranslatedText(res.data)
      // console.log(res.data)
    })
  }

  const handleAddDictionary = () => {
    if(description){
      const word = translatedText.slice(toolState.startOffset, toolState.endOffset)
      const queryParams = `?word=${word}&description=${description}&language_id=${props.languageId}`
      if (axiosWithAlert.post(`/dictionaries/${queryParams}`)){
        toolDispatch({type: 'switchFlag'})
      }
    }
  }

  useEffect(handleTranslate, [props.jaContent])
  useEffect(handleAddDictionary, [description])

  const getClickedLocation = (range) => {
    const pos = range.getBoundingClientRect()
    const caret = range.startOffset
    switch(toolState.mode){
    case('setStartLocation'):
      toolDispatch({type: 'setStartLocation', startOffset: caret ,startLocation: {x: pos.x-21, y: pos.y-152}})
      break
    case('setEndLocation'):
      toolDispatch({type: 'setEndLocation', endOffset: caret , endLocation: {x: pos.x-21, y: pos.y-152}})
      break
    }
  }

  const translateWord = (translateParams: string) => {
    axios.get(`/dictionaries/translate_word/${translateParams}`)
      .then((res) => {
        setDescription(res.data)
      })
    }

  const addDctionary = () => {
    const word = translatedText.slice(toolState.startOffset, toolState.endOffset)
    const translateParams = `?word=${word}&language_id=${props.languageId}`
    translateWord(translateParams)
  }

  const Quote = (props) => {
    switch(props.type){
    case('start'):
      if(toolState.startLocation.x){
        return(<FormatQuote className={dicClasses.startQuote}/>)
      }else{
        return null
      }
    case('end'):
      if(toolState.endLocation.x && toolState.startLocation.x){
        return(
          <>
            <FormatQuote className={dicClasses.endQuote}/>
              <IconButton onClick={addDctionary} className={dicClasses.addButton}>
                <PostAdd />
              </IconButton>
          </>
        )
      }else if(toolState.endLocation.x){
        return(<FormatQuote className={dicClasses.endQuote}/>)
      }else{
        return null
      }
      default:
        return null
    }
  }

  const preventKeydown = (e) => {
    e.preventDefault()
    return false
  }

  return(
    <>
      <Quote type='start'/>
      <Quote type='end'/>
      <div contentEditable={true} onKeyDown={preventKeydown} suppressContentEditableWarning={true}
        className={`${diaryClasses.diaryFormTextarea}  ${diaryClasses.diaryFormContentEditable}`}>
        {translatedText}
        <script>
          {document.onselectionchange = (e) => {
            const range = window.getSelection()?.getRangeAt(0)
            getClickedLocation(range)
          }}         
        </script>
      </div>
    </>
  )
}

export default Translate;
