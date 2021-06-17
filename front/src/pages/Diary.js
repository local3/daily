// import React, { useState, useEffect, useContext } from 'react'
// import Translate from '../components/Translate'
// import axios from 'axios';
// import { AuthContext } from "../Auth";
// import { useParams } from "react-router-dom";


// function Diary() {
//   const auth = useContext(AuthContext);
//   const {date} = useParams();
//   const initformContent = {
//     diary: {
//       jaContent: "",
//       date: date
//     },
//     diaryContent: {
//       languageId: 1,
//       content: ""
//     }
//   }
  
//   const [languages, setLanguages] = useState([])
//   const [isEdit, setIsEdit] = useState(false)
//   const [formContent, setFormContent] = useState(initformContent)
//   const [selectedLanguage, setSelectedLanguage] = useState()
//   const componentDidMount = () => {
//     axios.get(`/languages`)
//       .then(res => {
//         // const languages = res.data;
//         const result = res.data
//         // console.log(result);
//         setLanguages(result);
//         // console.log(result);
//         // console.log(languages);
//         // console.log(formContent)
//       })
      
//     console.log("before exist diary")
//     console.log(formContent)
//     axios.get(`/diaries/${formContent.diary.date}`)
//       .then(res => {
//         console.log("exitDiary")
//         const existDiary = res.data.diary;
//         console.log(existDiary)
//         if(existDiary){
//           setIsEdit(true)
//           console.log("isEdit")
//           console.log(isEdit)
//           console.log(formContent)
//           if(formContent.diaryContent.languageId && languages.length){
//             console.log("languagesあるよー")
//             console.log(languages)
//             convertExistDiary(existDiary);
//           }
//         }
//       })
//     if(!selectedLanguage){
//       auth.currentUser ? setSelectedLanguage(getLanguage(auth.currentUser.languageId)) : setSelectedLanguage(getLanguage(1))
//     }
//   }

//   useEffect(componentDidMount, [auth, isEdit])

//   const getLanguage = (languageId) => {
//     return languages.find(language => Number(language.id) === Number(languageId))
//   }

//   const getDiaryContent = (diary) => {
//     const language = formContent.diaryContent.languageId ? getLanguage(formContent.diaryContent.languageId) : getLanguage(1)
//     setSelectedLanguage(language)
//     return diary.diary_contents.find(d => d.language_id === language.id)
//   }

//   const convertExistDiary = (existDiary) => {
//     const existDiaryContent = getDiaryContent(existDiary)
//     // console.log(existDiaryContent)
//     setFormContent(
//       {
//         diary: {
//           ...formContent.diary,
//           jaContent: existDiary.ja_content
//         },
//         diaryContent: {
//           ...formContent.diaryContent,
//           languageId: existDiaryContent.language_id,
//           content: existDiaryContent.content
//         }
//       }
//       );
//   };

//   const handleChangeLanguage = (e) => {
//     setFormContent(
//       {
//         diary: {
//           ...formContent.diary,
//         },
//         diaryContent: {
//           ...formContent.diaryContent,
//           languageId: e.target.value
//         }
//       }
//     );
//     setSelectedLanguage(getLanguage(e.target.value))
//   };

//   const handleChangeJapaneseDiary = (e) => {
//     setFormContent(
//       {
//         diary: {
//           ...formContent.diary,
//           jaContent: e.target.value
//         },
//         diaryContent: {
//           ...formContent.diaryContent
//         }
//       }
//     );
//   };

//   const handleChangeDiaryContent = (e) => {
//     setFormContent(
//       {
//         diary: {
//           ...formContent.diary
//         },
//         diaryContent: {
//           ...formContent.diaryContent,
//           content: e.target.value
//         }
//       }
//     )
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if(isEdit){
//       axios.patch(`/diaries/${formContent.diary.date}`, formContent)
//         .then(res =>{
//         })
//     }else{
//       axios.post(`/diaries`, formContent)
//         .then(res => {
//         })
//     }
//   }

//   return(
//     <>
//       <form onSubmit={handleSubmit}>
//         <label>日本語日記</label>
//         <textarea onChange={handleChangeJapaneseDiary} value={formContent.diary.jaContent}></textarea>
//         <br/>
//         <label>外国語日記</label>
//         <textarea onChange={handleChangeDiaryContent} value={formContent.diaryContent.content}></textarea>
//         <br/>
//         <label>言語選択：</label>
//         <select onChange={handleChangeLanguage} defaultValue={auth.currentUser.language_id}>
//           {languages.map(language => 
//             <option key={language.id} value={language.id}>
//               {language.name}
//             </option>)
//           }
//         </select>
//         <br/>
//         <button type="submit">でけた！</button>
//       </form>
//       <div>
//           <Translate
//             language={selectedLanguage}
//             jaContent={formContent.diary.jaContent}
//           />
//       </div>
//     </>
//   )
// }

// export default Diary;


import React, { useState, useEffect, useContext } from 'react'
import Translate from '../components/Translate'
import axios from 'axios';
import { AuthContext } from "../Auth";
import { useParams } from "react-router-dom";


function Diary() {
  const auth = useContext(AuthContext);
  const {date} = useParams();
  const initformContent = {
    diary: {
      jaContent: "",
      date: date
    },
    diaryContent: {
      languageId: 1,
      content: ""
    }
  }
  
  const [languages, setLanguages] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [formContent, setFormContent] = useState(initformContent)
  const [selectedLanguage, setSelectedLanguage] = useState({id: 1, name: '英語', code: 'en'})
  const initLanguagesEffect = () => {
    console.log("init effect")
    axios.get(`/languages`)
      .then(res => {
        const result = res.data
        setLanguages(result);
      })
  }
  
  const initExistDiaryEffect = () => {
    console.log("existdiary effect")
    if(languages && auth.currentUser.language_id){
      // console.log(auth)
      // console.log(languages)
      // console.log(selectedLanguage)
      setSelectedLanguage(getLanguage(auth.currentUser.language_id))
      axios.get(`/diaries/${formContent.diary.date}`)
        .then(res => {
          const existDiary = res.data.diary;
          // console.log(existDiary)
          if(existDiary){
            setIsEdit(true)
            if(formContent.diaryContent.languageId && languages.length){
              convertExistDiary(existDiary);
            }
          }
        })
    }
  }

  // const updateFormContent = () => {
  //   console.log("formcontetn")
  //   console.log(formContent)
  // }  

  useEffect(initLanguagesEffect, [])
  useEffect(initExistDiaryEffect, [languages, auth])
  // useEffect(updateFormContent, [formContent])

  const getLanguage = (languageId) => {
    return languages.find(language => Number(language.id) === Number(languageId))
  }

  const getDiaryContent = (diary) => {
    // console.log("getDiaryContetn")
    // console.log(auth.currentUser)
    // console.log(getLanguage(auth.currentUser.language_id))
    const language = auth.currentUser && getLanguage(auth.currentUser.language_id) ? getLanguage(auth.currentUser.language_id) : getLanguage(1)
    setSelectedLanguage(language)
    // console.log(formContent)
    // console.log(diary)
    // console.log(language)
    // console.log(diary.diary_contents.find(dc => Number(dc.language_id) === Number(language.id)))
    return diary.diary_contents.find(dc => {
      // console.log(dc)
      // console.log(dc.language_id)
      // console.log(language.id)
      // console.log(Number(dc.language_id) === Number(language.id))
      return Number(dc.language_id) === Number(language.id)
    })
  }

  const convertExistDiary = (existDiary) => {
    // console.log("exist diary")
    // console.log(existDiary)
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
          languageId: existDiaryContent ? existDiaryContent.language_id : auth.currentUser.language_id,
          content: existDiaryContent ? existDiaryContent.content : ''
        }
      }
      );
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
    setSelectedLanguage(getLanguage(e.target.value))
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
        })
    }else{
      axios.post(`/diaries`, formContent)
        .then(res => {
        })
    }
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <label>日本語日記</label>
        <textarea onChange={handleChangeJapaneseDiary} value={formContent.diary.jaContent}></textarea>
        <br/>
        <label>外国語日記</label>
        <textarea onChange={handleChangeDiaryContent} value={formContent.diaryContent.content}></textarea>
        <br/>
        <label>言語選択：</label>
        {/* {console.log(auth.currentUser)}
        {console.log(formContent.diaryContent.languageId)} */}
        <select onChange={handleChangeLanguage} value={formContent.diaryContent.languageId}>
          {languages.map(language => 
            <option key={language.id} value={language.id}>
              {language.name}
            </option>)
          }
        </select>
        <br/>
        <button type="submit">でけた！</button>
      </form>
      <div>
          <Translate
            language={selectedLanguage}
            jaContent={formContent.diary.jaContent}
          />
      </div>
    </>
  )
}

export default Diary;