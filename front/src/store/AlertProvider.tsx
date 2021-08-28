import React,{ useEffect, useReducer } from 'react'
import { useLocation, useHistory } from 'react-router'
import Axios from './Axios'
import AlertMsg from '../components/universals/AlertMsg'
import STATUS_CODES from '../utils/StatusCodes'
import { AlertState, AlertListState, AlertListAction } from '../types'
import { Alert } from '@material-ui/lab'

// 初期状態登録
const initialState: AlertState = {
	msg: '',
	status: 0,
	severity: 'success',
	color: 'success',
	// alertDispatch: () => {}
}

const initialList: AlertListState = {alertList: [], alertDispatch: () => {}}
// const initialList: AlertList = []
console.log(initialList.alertList.length)

// Context作成　このAlertContextをインポートするとアラートが取得できる
export const AlertContext = React.createContext(initialList)
// alertDispatchでコールバックされる関数 ステータスコードによってアラートを変更する
const alertReducer = (state: AlertListState, action: AlertListAction): AlertListState => {
	console.log(action.status)
	console.log(state)
	switch(action.status){
		case(STATUS_CODES.RESET_CODE): // 0
			return initialList
		case(STATUS_CODES.FLAT_CODE): // 1
			return state
		case(STATUS_CODES.SUCCESS_CODE): // 200
			// return { ...state, alertList: [...state.alertList, {...initialState, ...state, msg: action.msg, severity: 'success', color: 'success' }]}
			return { ...state, alertList: [...state.alertList, {...initialState, status: action.status, msg: action.msg, severity: 'success', color: 'success'}]}
		case(STATUS_CODES.INFO_CODE): // 210
			return { ...state, alertList: [...state.alertList, {...initialState, msg: action.msg, severity: 'success', color: 'info' }]}
		case(STATUS_CODES.NOT_FOUND_CODE): // 404
			// return [...state, {...initialState, msg: action.msg, severity: 'error', color: 'info' }]
			return { ...state, alertList: [...state.alertList, {...initialState, status: action.status, msg: action.msg, severity: 'error', color: 'info'}]}
		case(STATUS_CODES.INVALID_CODE): // 422
			// return { ...state, msg: action.msg, severity: 'error', color: 'error'}
			// return [...state, {...initialState, status: action.status, msg: action.msg, severity: 'error', color: 'error'}]
			return { ...state, alertList: [...state.alertList, {...initialState, status: action.status, msg: action.msg, severity: 'error', color: 'error'}]}
		case(STATUS_CODES.SERVER_ERROR_CODE): // 500
			return { ...state, alertList: [...state.alertList, {...initialState, status: action.status, msg: action.msg, severity: 'error', color: 'error'}]}
			// return [...state, {...initialState, status: action.status, msg: action.msg, severity: 'error', color: 'error'}]
		default:
			return state
	}
}

const AlertProvider = (props) => {
	const history = useHistory()
	// アラートの変更をuseReducerで行う
	const [alertList, alertDispatch] = useReducer(alertReducer, initialList)
	const value: AlertListState = {alertList: alertList.alertList, alertDispatch: alertDispatch}
	// ページが変わるごとにアラートをリセット
	const resetAlertMsg = () => {
		return history.listen(() => {
			console.log('useeffect')
			alertDispatch({status: 0})
		})
	}
	useEffect(resetAlertMsg, [history])

	return(
		<AlertContext.Provider
			value={value}
		>
			<Axios/>
			{ props.children }
		</AlertContext.Provider>
	)
}
export default AlertProvider;
