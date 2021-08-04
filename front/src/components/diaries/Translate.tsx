import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDiaryStyles } from '../../styles/js/diary'

type Props = {
  jaContent: string
  languageId?: number
}

const Translate: React.FC<Props> = (props: Props) => {
  const diaryClasses = useDiaryStyles()
  const [translatedText, setTranslatedText] = useState('')
  // console.log(translatedText)
  const handleTranslate = () => {
    // console.log(translatedText)
    const textParam = `?ja_content=${props.jaContent}`
    const languageParam = `&language_id=${props.languageId}`
    console.log(languageParam)
    const queryParams = `${textParam}${languageParam}`
    axios.get(`/diaries/translate_text${queryParams}`)
    .then(res => {
      setTranslatedText(res.data)
      // console.log(res.data)
    })
  }
  useEffect(handleTranslate, [props.jaContent])

  return(
    <>
      <textarea value={translatedText} onKeyDown={() => false} className={diaryClasses.diaryFormTextarea}></textarea>
    </>
  )
}

export default Translate;
