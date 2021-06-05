import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import Translate from '../components/Translate'
import axios from 'axios';
import { AuthContext } from "../Auth";
import { useParams } from "react-router-dom";

function Diary() {
  console.log('diary');
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
  const [elements, setElement] = useState(initElements);
  const [languages, setLanguages] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [formContent, setFormContent] = useState(initformContent);

  const componentDidMount = () => {
    console.log('userEffect')
    axios.get(`/languages`)
      .then(res => {
        const languages = res.data;
        setLanguages(languages);
      })
    axios.get(`/diaries/${formContent.diary.date}`)
      .then(res => {
        const existDiary = res.data.diary;
        console.log(existDiary)
        if(existDiary){
          setIsEdit(true);
          setExistDiary(existDiary);
          console.log(formContent)
        }
      })
  }

  useEffect(componentDidMount, [])

  const getDiaryContent = (diary) => {
    console.log(formContent.diaryContent)
    return diary.diary_contents[0]
    // return diary.diary_contents.find(d => d.language_id === formContent.diaryContent.languageId)
  }

  const setExistDiary = (existDiary) => {
    console.log(existDiary)
    console.log(formContent)
    const existDiaryContent = getDiaryContent(existDiary)
    console.log(existDiaryContent)
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
    console.log(formContent)
  };

  const handleChangeLanguage = (e) => {
    setFormContent(
      {
        diary: {
          ...elements.diary,
        },
        diaryContent: {
          ...elements.diaryContent,
          languageId: e.target.value
        }
      }
    );
  };

  const handleChangeJapaneseDiary = (e) => {
    setElement(
      {
        diary: {
          ...elements.diary,
          jaContent: e.target.value
        },
        diaryContent: {
          ...elements.diaryContent
        }
      }
    );
  };

  const handleChangeDiaryContent = (e) => {
    setElement(
      {
        diary: {
          ...elements.diary
        },
        diaryContent: {
          ...elements.diaryContent,
          content: e.target.value
        }
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/diaries`, elements)
      .then(res => {
        console.log(res)
      })
  }

  return(
    <>
      {console.log(auth.currentUser)}
      {console.log(formContent)}
      <form onSubmit={handleSubmit}>
        <label>日本語日記</label>
        <textarea onChange={handleChangeJapaneseDiary}></textarea>
        <br/>
        <label>外国語日記</label>
        <textarea onChange={handleChangeDiaryContent}></textarea>
        <br/>
        <label>言語選択：</label>
        <select onChange={handleChangeLanguage}>
          {languages.map(language => 
            <option key={language.id} value={language.id} selected={auth.currentUser.language_id === language.id ? true : false}>
              {language.name}
            </option>)
          }
        </select>
        <br/>
        <button type="submit">でけた！</button>
      </form>
      <Translate jaContent={elements.diary.jaContent} />
    </>
  )
}

export default Diary;