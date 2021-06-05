import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import { AuthContext } from "../Auth";
import { useParams } from "react-router-dom";

function Diary() {
  const {date} = useParams();
  const initElements = {
    diary: {
      jaContent: "",
      date: date
    },
    diaryContent: {
      languageId: 1,
      content: ""
    }
  }

  const [elements, setElement] = useState(initElements);
  const [languages, setLanguages] = useState([]);

  const componentDidMount = () => {
    axios.get(`/languages`)
      .then(res => {
        const languages = res.data;
        setLanguages(languages);
        // console.log(languages)
      })
  }

  useEffect(componentDidMount, [])

  const handleChangeLanguage = (e) => {
    setElement(
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
            <option key={language.id} value={language.id}>
              {language.name}
            </option>)
          }
        </select>
        <br/>
        <button type="submit">でけた！</button>
      </form>
    </>
  )
}

export default Diary;