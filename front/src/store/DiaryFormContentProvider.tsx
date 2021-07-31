import React, { useState, useEffect } from 'react'
import { SubmitFlagState } from '../types/index'

const initialState: SubmitFlagState = {
	submitFlag: false,
	changeSubmitFlag: () => {}
}

export const DiaryFormContentContext = React.createContext(initialState)

const DiaryFormContentProvider = (props) => {
	const [submitFlagState, setSubmitFlagState] = useState(initialState)
	const [rerender, setRerender] = useState(false)

	const changeSubmitFlag = (flag: boolean) => {
		// setSubmitFlagState({...submitFlagState, submitFlag: true})
		setRerender(flag)
	}
	const afterRerender = () => {
		if(rerender === true){
			setSubmitFlagState({...submitFlagState, submitFlag: true})
		}else{
			setSubmitFlagState({...submitFlagState, submitFlag: false})
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
