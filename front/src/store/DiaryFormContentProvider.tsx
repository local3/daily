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
	const changeSubmitFlag = (flag: boolean) => {
		console.log("changeSumitFlag")
		// setSubmitFlagState({...submitFlagState, submitFlag: true})
		setRerender(flag)
	}
	const afterRerender = () => {
		if(rerender === true){
			console.log("afterRerennder")
			setSubmitFlagState({...submitFlagState, submitFlag: true})
		}else{
			setSubmitFlagState({...submitFlagState, submitFlag: false})
		}
	}
	useEffect(afterRerender, [rerender])
	const value: SubmitFlagState = { ...submitFlagState, changeSubmitFlag }
	
	console.log('value')
	console.log(value)
	return(
		<DiaryFormContentContext.Provider
			value={value}
		>
			{ props.children }
		</DiaryFormContentContext.Provider>
	)
}
export default DiaryFormContentProvider;
