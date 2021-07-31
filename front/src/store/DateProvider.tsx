import React, { useState } from 'react'
import moment, { Moment } from "moment";
import { dateFormat } from '../utils/Date';
import { DateContextType } from '../types'
const initialState: DateContextType = {
	globalDate: moment().format(dateFormat),
	updateDate: () => {}
}
console.log(initialState)

export const DateContext = React.createContext(initialState)

const DateProvider = (props) => {
	const [globalDate, setGlobalDate] = useState<string>(initialState.globalDate)
	console.log(globalDate)
	const updateDate = (selectedDate: string) => {
		setGlobalDate(selectedDate)
	}
	const value: DateContextType = { globalDate, updateDate }
	return(
		<DateContext.Provider
			value={value}
		>
			{ props.children }
		</DateContext.Provider>
	)
}
export default DateProvider;
