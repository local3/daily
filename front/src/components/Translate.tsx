import React, { useState } from 'react'
import axios from 'axios';

function Translate (props) {
  const [translatedText, setTranslatedText] = useState('')

  const handleTranslateClick = () => {
    const textParam = `?ja_content=${props.jaContent}`
    const languageParam = `&language_id=${props.languageId}`
    const queryParams = `${textParam}${languageParam}`
    axios.get(`/diaries/translate_text${queryParams}`)
    .then(res => {
      setTranslatedText(res.data)
    })
  }
  
  return(
    <>
      <button onClick={handleTranslateClick}>翻訳する</button>
      <div>
        <p>日本語</p>
        { props.jaContent }
      </div>
      <div>
        <p>翻訳語</p>
        { translatedText }
      </div>
    </>
  )
}

export default Translate;
