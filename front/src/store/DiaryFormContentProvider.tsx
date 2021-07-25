import React, { useState, useEffect } from 'react'
import { SubmitFlagState } from '../types/index'

const initialState: SubmitFlagState = {
	submitFlag: false,
	changeSubmitFlag: () => {}
}

export const DiaryFormContentContext = React.createContext(initialState)

const DiaryFormContentProvider = (props) => {
	console.log("diaryFormtConte")
	const [submitFlagState, setSubmitFlagState] = useState(initialState)
	const [rerender, setRerender] = useState(false)

	console.log(submitFlagState)
	const changeSubmitFlag = () => {
		console.log("changeSumitFlag")
		// setSubmitFlagState({...submitFlagState, submitFlag: true})
		setRerender(true)
	}
	const afterRerender = () => {
		if(rerender === true){
			setSubmitFlagState({...submitFlagState, submitFlag: true})
		}
	}
	useEffect(afterRerender, [rerender])
	const value: SubmitFlagState = { ...submitFlagState, changeSubmitFlag }
	return(
		<DiaryFormContentContext.Provider
			value={value}
		>
			{ props.children }
		</DiaryFormContentContext.Provider>
	)
}
export default DiaryFormContentProvider;
