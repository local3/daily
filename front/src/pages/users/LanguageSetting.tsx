import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from "../../store/Auth"
import { axiosWithAlert } from '../../store/Axios'
import { useUserStyles } from '../../styles/js/user'
import layoutStyles, { useLayoutStyles } from '../../styles/js/layout'
import { Typography, Box, Select, Button, FormControl, InputLabel } from '@material-ui/core'
import { UserLanguageSetting, Language } from '../../types/index'

const LanguageSetting = () => {
  const auth = useContext(AuthContext)
  const userClasses = useUserStyles()
  const layoutClasses = useLayoutStyles()
  const initFormContent: UserLanguageSetting = {
    target: '',
    other: {
      languageId: auth.currentUser ? auth.currentUser.languageId : 1
    }
  }

  const [formContent, setFormContent] = useState(initFormContent)
  const [languages, setLanguages] = useState<Language[]>([])

  const initLanguagesEffect = () => {
    axios.get(`/languages`)
      .then(res => {
        setLanguages(res.data)
      })
  }
  useEffect(initLanguagesEffect, [])

  const handleChangeLanguage = (e) => {
    setFormContent(
      {
        ...formContent,
        other: {
          languageId: e.target.value
        }
      }
    )
  }

  const handleClickUpdate = (target, e) => {
    e.preventDefault()
    console.log(formContent)
    axiosWithAlert.patch(`/users/update`, {
      user: {
        ...formContent,
        target: target
      }
    })
      .then(res => {
        console.log(res)
      })

      .catch(res => {
      })
  }
  
  return (
    <>
      <Typography variant="h1" className={layoutClasses.pageTitle}>その他設定</Typography>
      <Box>
        <Typography variant="h6" className={layoutClasses.formTitle}>学習言語</Typography>
        <form>
          <Box>
            <Box className={layoutClasses.label}>
              <label>言語選択</label>
            </Box>
            <FormControl variant="outlined">
              {/* <InputLabel htmlFor="user_language_id">学習言語</InputLabel> */}
              <Select
                native
                value={formContent.other.languageId}
                onChange={handleChangeLanguage}
                // label="学習言語"
                inputProps={{
                  name: 'language_id',
                  id: 'user_language_id',
                }}
              >
                <option key={0} value={0} disabled></option>
                {languages.map(language => 
                  <option key={Number(language.id)} value={Number(language.id)}>
                    {language.name}
                  </option>)
                }
              </Select>
            </FormControl>
            {/* <select onChange={handleChangeLanguage} value={formContent.other.languageId}>
              <option key={0} value={0} disabled></option>
              {languages.map(language => 
                <option key={Number(language.id)} value={Number(language.id)}>
                  {language.name}
                </option>)
              }
            </select> */}
          </Box>
          <Box className={layoutClasses.submitButtonWrapper}>
            <Button onClick={(e) => {handleClickUpdate("other", e)}} variant="contained" className={layoutClasses.submitButton}>変更する</Button>
          </Box>
        </form>
      </Box>
    </>
  )
}
export default LanguageSetting;
