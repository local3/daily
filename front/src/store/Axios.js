import { useContext } from 'react'
import { AlertContext } from './AlertProvider'
import axios from 'axios'

// インスタンス生成
export const client = axios.create()
const Axios = () => {
  const { alertDispatch } = useContext(AlertContext)
  // handlerにデータが溜まっていくため、初期化する
  if (client.interceptors.response.handlers.length > 0) {
    client.interceptors.response.handlers = [];
  }
  // 成功
  const onSuccess = (res) => {
    return res
  }
  // 失敗
  const onError = (err) => {
    const { data, status } =  err.response
    alertDispatch({msg: data.msg, status: status})
    // PromiseStatusをresolveにして.thenを実行しないようにする
    return Promise.reject(err)
  }
  // client処理に割り込んで、成功の場合onSuccess、失敗の場合onErrorを実行する
  client.interceptors.response.use(onSuccess, onError)
  return null
}
export default Axios