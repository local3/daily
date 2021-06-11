import React, {useState, useEffect, useContext} from 'react'
import Translate from '../components/Translate'
import axios from 'axios';
import { AuthContext } from "../Auth";
import { useParams } from "react-router-dom";


function Diary() {
  console.log('diary component');
  const auth = useContext(AuthContext);
  const {date} = useParams();
  const initformContent = {
    diary: {
      jaContent: "",
      date: date
    },
    diaryContent: {
      languageId: auth.currentUser.language_id,
      content: ""
    }
  }
  console.log("initFormContent")
  console.log(initformContent)

  const [languages, setLanguages] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [formContent, setFormContent] = useState(initformContent);
  const componentDidMount = () => {
    console.log('userEffect')
    console.log("before languages")
    axios.get(`/languages`)
      .then(res => {
        // const languages = res.data;
        const result = res.data
        console.log(result);
        setLanguages(result);
        // console.log(result);
        console.log(languages);
        // console.log(formContent)
      })
      
    console.log("before exist diary")
    axios.get(`/diaries/${formContent.diary.date}`)
      .then(res => {
        console.log("exitDiary")
        const existDiary = res.data.diary;
        console.log(existDiary)
        if(existDiary){
          setIsEdit(true);
          setExistDiary(existDiary);
          // console.log(formContent)
        }
      })
  }

  useEffect(componentDidMount, [])

  const getLanguage = (languageId) => {
    console.log(languages)
    return languages.find(language => language.id === languageId)
  }

  const getDiaryContent = (diary) => {
    console.log("getDiaryContent")
    console.log(formContent)
    // return diary.diary_contents[0]
    const language = formContent.diaryContent.languageId ? getLanguage(formContent.diaryContent.languageId) : getLanguage(1)
    console.log(language)
    return diary.diary_contents.find(d => d.language_id === language.id)
  }

  const setExistDiary = (existDiary) => {
    console.log("setExistDiary")
    console.log(existDiary)
    console.log(formContent)
    const existDiaryContent = getDiaryContent(existDiary)
    // console.log(existDiaryContent)
    setFormContent(
      {
        diary: {
          ...formContent.diary,
          jaContent: existDiary.ja_content
        },
        diaryContent: {
          ...formContent.diaryContent,
          languageId: existDiaryContent.language_id,
          content: existDiaryContent.content
        }
      }
      );
    // console.log(formContent)
  };

  const handleChangeLanguage = (e) => {
    setFormContent(
      {
        diary: {
          ...formContent.diary,
        },
        diaryContent: {
          ...formContent.diaryContent,
          languageId: e.target.value
        }
      }
    );
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isEdit){
      axios.patch(`/diaries/${formContent.diary.date}`, formContent)
        .then(res =>{
          // console.log(res)
        })
    }else{
      axios.post(`/diaries`, formContent)
        .then(res => {
          // console.log(res)
        })
    }
  }

  return(
    <>
      {console.log("render return")}
      {console.log(languages)}
      {console.log(auth.currentUser)}
      {console.log(formContent)}
      <form onSubmit={handleSubmit}>
        <label>日本語日記</label>
        <textarea onChange={handleChangeJapaneseDiary} value={formContent.diary.jaContent}></textarea>
        <br/>
        <label>外国語日記</label>
        <textarea onChange={handleChangeDiaryContent} value={formContent.diaryContent.content}></textarea>
        <br/>
        <label>言語選択：</label>
        {console.log(languages)}
        <select onChange={handleChangeLanguage} defaultValue={auth.currentUser.language_id}>
          {languages.map(language => 
            <option key={language.id} value={language.id}>
              {language.name}
            </option>)
          }
        </select>
        {console.log(languages)}
        <br/>
        <button type="submit">でけた！</button>
      </form>

      <div>
          <Translate
            languages={languages}
            languageId={formContent.diaryContent.languageId}
            jaContent={formContent.diary.jaContent}
          />
      </div>
    </>
  )
}

export default Diary;