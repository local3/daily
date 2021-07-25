import { useContext } from 'react'
import { AlertContext } from './AlertProvider'
import axios from 'axios'
import { parseSnakeToCamel } from '../utils/StringCases'
import STATUS_CODES from '../utils/StatusCodes'
// インスタンス生成
export const axiosWithAlert = axios.create()
const Axios = () => {
  const { alertDispatch } = useContext(AlertContext)
  // handlerにデータが溜まっていくため、初期化する
  if (axiosWithAlert.interceptors.response.handlers.length > 0) {
    axiosWithAlert.interceptors.response.handlers = [];
  }
  // 成功
  const onSuccess = (res) => {
    // console.log(res)
    // console.log(parseSnakeToCamel(res))
    const { data, status } =  res
    if(status !== 1){
      alertDispatch({msg: data.msg, status: status})
    }
    // スネークケースからキャメルケースに変換
    return parseSnakeToCamel(res)
  }
  // 失敗
  const onError = (err) => {
    const { data, status } =  err.response
    if(status !== STATUS_CODES.FLAT_CODE){
      alertDispatch({msg: data.msg, status: status})
    }
    // PromiseStatusをresolveにして.thenを実行しないようにする
    return Promise.reject(err)
  }
  // axiosWithAlert処理に割り込んで、成功の場合onSuccess、失敗の場合onErrorを実行する
  axiosWithAlert.interceptors.response.use(onSuccess, onError)
  return null
}
export default Axios
