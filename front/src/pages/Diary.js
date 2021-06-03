import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import { AuthContext } from "../Auth";
import { useParams } from "react-router-dom";


function Diary() {
  const initelements = {
    diary: {
      jaContent: ""
    },
    diaryContent: {
      languageId: 1,
      content: ""
    }
  }
  const [elements, setElement] = useState(initelements);
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
        ...elements.diaryContent,
        languageId: e.target.value
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/`)
  }
  return(
    <>
      <form onSubmit={handleSubmit}>
      <label>言語選択：</label>
        <select onChange={handleChangeLanguage}>
          {languages.map(language => 
            <option key={language.id} value={language.id}>
              {language.name}
            </option>)
          }
        </select>
      </form>
    </>
  )
}

export default Diary;