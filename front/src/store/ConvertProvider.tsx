import React,{ useReducer } from 'react'
import { CONVERT_MEMO, CONVERT_DIARY, CONVERT_USER } from '../utils/convertActions'
import { ConvertState } from '../types'

// 初期状態登録
const initialState: ConvertState = {
	memoFlag: false,
  diaryFlag: false,
  userFlag: false,
  convertDispatch: () => {}
}
export const ConvertContext = React.createContext(initialState)
const convertReducer = (state, action) => {
	switch(action.type){
		case(`${CONVERT_MEMO}`):
			return { ...state, memoFlag: !state.memoFlag }
		case(`${CONVERT_DIARY}`):
      return { ...state, diaryFlag: !state.diaryFlag }
		case(`${CONVERT_USER}`):
      return { ...state, userFlag: !state.userFlag }
  }
}


const ConvertProvider = (props) => {
	const [convertState, convertDispatch] = useReducer(convertReducer, initialState)
	const value: ConvertState = {...convertState, convertDispatch}

	return(
		<ConvertContext.Provider
			value={value}
		>
			{ props.children }
		</ConvertContext.Provider>
	)
}
export default ConvertProvider