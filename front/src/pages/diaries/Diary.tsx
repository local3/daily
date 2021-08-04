import React, { useState, useEffect, useContext } from 'react'
import Translate from '../../components/diaries/Translate'
import ToolButton from '../../components/diaries/ToolButton'
import DiaryFormButton from '../../components/diaries/DiaryFormButton'
import axios from 'axios'
import { AuthContext } from "../../store/Auth"
import { DiaryFormContentContext } from '../../store/DiaryFormContentProvider'
import { useParams } from "react-router-dom"
import { DiaryFormContent, Language } from '../../types/index'
import { useDiaryStyles } from '../../styles/js/diary'
import { Box, Button, IconButton } from '@material-ui/core'
import { Cached as CachedIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { blankFunction } from '../../utils/functions'

type dateParams = {
  date: string
}

const Diary = () => {
  // console.log("diary")
  const history = useHistory()
  const auth = useContext(AuthContext)
  // 保存ボタンを押した時に保存フラグを立てる関数
  // const { changeSubmitFlag } = useContext(DiaryFormContentContext)
  const submitFlagContext = useContext(DiaryFormContentContext)
  // console.log(submitFlagContext)
  const diaryClasses = useDiaryStyles()
  const { date } = useParams<dateParams>();
  const initformContent: DiaryFormContent = {
    diary: {
      jaContent: "",
      date: date
    },
    diaryContent: {
      languageId: 1,
      content: ""
    }
  }
  
  const [languages, setLanguages] = useState<Language[]>([])
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [formContent, setFormContent] = useState(initformContent)
  const [isOpenJaContent, setIsOpenJaContent] = useState<boolean>(true)

  const initLanguagesEffect = () => {
    axios.get(`/languages`)
      .then(res => {
        const result = res.data
        setLanguages(result);
      })
  }
  
  const initExistDiaryEffect = () => {
    if(languages && auth.currentUser?.languageId){
      axios.get(`/diaries/${formContent.diary.date}`)
        .then(res => {
          const existDiary = res.data.diary;
          if(existDiary){
            setIsEdit(true)
            if(formContent.diaryContent.languageId && languages.length){
              convertExistDiary(existDiary);
            }
          }
        })
    }
  }

  useEffect(initLanguagesEffect, [])
  useEffect(initExistDiaryEffect, [languages, auth])

  const getLanguage = (languageId) => {
    return languages.find(language => Number(language.id) === Number(languageId))
  }

  const getDiaryContent = (diary) => {
    const language: (Language | undefined) = auth.currentUser && getLanguage(auth.currentUser.languageId) ? getLanguage(auth.currentUser.languageId) : getLanguage(1)
    return diary.diary_contents.find(dc => {
      // return Number(dc.languageId) === Number(language.id)
      return Number(dc.languageId) === Number(language?.id)
    })
  }

  const convertExistDiary = (existDiary) => {
    const existDiaryContent = getDiaryContent(existDiary)
    setFormContent(
      {
        diary: {
          ...formContent.diary,
          jaContent: existDiary.ja_content
        },
        diaryContent: {
          ...formContent.diaryContent,
          languageId: existDiaryContent ? existDiaryContent.languageId : auth.currentUser?.languageId,
          content: existDiaryContent ? existDiaryContent.content : ''
        }
      }
      );
  };

  const toggleIsOpenJaContent = () => {
    setIsOpenJaContent(!isOpenJaContent)
  }

  const handleChangeJapaneseDiary = (e) => {
    setFormContent(
      {
        diary: {
          ...formContent.diary,
          jaContent: e.target.value
        },
        diaryContent: {
          ...formContent.diaryContent
        }
      }
    );
  };

  const handleChangeDiaryContent = (e) => {
    setFormContent(
      {
        diary: {
          ...formContent.diary
        },
        diaryContent: {
          ...formContent.diaryContent,
          content: e.target.value
        }
      }
    )
  }

  const handleSubmit = () => {
    // console.log(submitFlagContext)
    // console.log("submitFlag")
    if(submitFlagContext.submitFlag){
      // console.log("submit通過");
      if(isEdit){
        axios.patch(`/diaries/${formContent.diary.date}`, formContent)
          .then(res =>{
            submitFlagContext.changeSubmitFlag(false)
            history.push('/calendar')
          })
      }else{
        axios.post(`/diaries`, formContent)
          .then(res => {
            submitFlagContext.changeSubmitFlag(false)
            history.push('/calendar')
          })
      }
    }    
  }
  // console.log(submitFlagContext)
  useEffect(handleSubmit, [submitFlagContext.submitFlag])

  return(
    <>
      <Box>
        {date}
      </Box>
      <form onSubmit={handleSubmit}>
        { isOpenJaContent ?
          <Box className={diaryClasses.diaryFormWrapper}>
            <DiaryFormButton
              color="primary"
              className={diaryClasses.diaryFormButton}
              endIcon={<CachedIcon/>}
              onClickAction={toggleIsOpenJaContent}
              text={"日本語"}
            />
            <Box className={diaryClasses.diaryFormTextareaWrapper}>
              <textarea onChange={handleChangeJapaneseDiary} value={formContent.diary.jaContent} className={diaryClasses.diaryFormTextarea}></textarea>
            </Box>
          </Box>
          :
          <Box className={diaryClasses.diaryFormWrapper}>
            <DiaryFormButton
              color="primary"
              className={diaryClasses.diaryFormButton}
              endIcon={<CachedIcon/>}
              onClickAction={toggleIsOpenJaContent}
              text={"翻訳版"}
            />
            <Box className={diaryClasses.diaryFormTextareaWrapper}>
              {console.log(auth.currentUser?.languageId)}
              <Translate
                languageId={auth.currentUser?.languageId}
                jaContent={formContent.diary.jaContent}
              />
            </Box>
          </Box>
        }
        <Box className={diaryClasses.diaryFormWrapper}>
          <DiaryFormButton
            color="secondary"
            className={diaryClasses.diaryFormButton}
            endIcon={null}
            onClickAction={blankFunction}
            text={getLanguage(auth.currentUser?.languageId)?.name}
          />
          <Box className={diaryClasses.diaryFormTextareaWrapper}>
            <textarea onChange={handleChangeDiaryContent} value={formContent.diaryContent.content} className={diaryClasses.diaryFormTextarea}></textarea>
          </Box>
        </Box>
      </form>
      <ToolButton/>
    </>
  )
}

export default Diary;
