import React,{ useEffect, useReducer } from 'react'
import { useLocation, useHistory } from 'react-router'
import Axios from './Axios'
import STATUS_CODES from '../utils/StatusCodes'
import Check from '@material-ui/icons/Check'

// 初期状態登録
const initialState = { msg: null, status: 0, severity: '', color: ''}
// Context作成　このAlertContextをインポートするとアラートが取得できる
export const AlertContext = React.createContext(initialState)
// alertDispatchでコールバックされる関数 ステータスコードによってアラートを変更する
const alertReducer = (state, action) => {
	console.log(action)
	switch(action.status){
		case(STATUS_CODES.RESET_CODE): // 0
			return { initialState }
		case(STATUS_CODES.SUCCESS_CODE): // 200
			return { ...state, msg: action.msg, severity: 'success' }
		case(STATUS_CODES.INFO_CODE): // 210
			return { ...state, msg: action.msg, severity: 'success', color: 'info' }
		case(STATUS_CODES.NOT_FOUND_CODE): // 404
			return { ...state, msg: action.msg, severity: 'error' }
		case(STATUS_CODES.INVALID_CODE): // 422
			return { msg: action.msg, severity: 'error'}
		case(STATUS_CODES.SERVER_ERROR_CODE): // 500
			return {}
		}
}

const AlertProvider = (props) => {
	const history = useHistory()
	const location = useLocation()
	// アラートの変更をuseReducerで行う
	const [alertState, alertDispatch] = useReducer(alertReducer, initialState)
	const value = {...alertState, alertDispatch}
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