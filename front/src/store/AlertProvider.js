import React,{ useEffect, useReducer } from 'react'
import { useHistory } from 'react-router';
import Axios from './Axios'

// 初期状態登録
const initialState = { msg: null, status: 200, className: null}
// Context作成　このAlertContextをインポートするとアラートが取得できる
export const AlertContext = React.createContext(initialState)
// alertDispatchでコールバックされる関数 ステータスコードによってアラートを変更する
const alertReducer = (state, action) => {
	switch(action.status){
		case(422):
			return { ...state.alertState , msg: action.msg, className: 'warning' }
		case(500):
			return {}
		case(0):
			return { initialState }
	}
}
const AlertProvider = (props) => {
	const history = useHistory()
	// アラートの変更をuseReducerで行う
	const [alertState, alertDispatch] = useReducer(alertReducer, initialState)
	const value = {...alertState, alertDispatch}
	// ページが変わるごとにアラートをリセット
	const resetAlertMsg = () => {
		alertDispatch({status: 0})
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