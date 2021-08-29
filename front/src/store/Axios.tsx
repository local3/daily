import { useContext } from 'react'
import { AlertContext } from './AlertProvider'
import axios, { AxiosResponse, } from 'axios'
import { parseSnakeToCamel } from '../utils/StringCases'
import STATUS_CODES from '../utils/StatusCodes'
import { FormErrorContext } from './FormErrorProvider'
import { ADD_ERRORS } from '../utils/formErrorActions'
// インスタンス生成
// export const axiosWithAlert: AxiosInstance<AxiosInterceptorManager<AxiosResponse>> = axios.create()
export const axiosWithAlert = axios.create()

// railsから返ってくるエラー情報(errorsData)から、attributeとmsgをFormErrors型に整形したものを返す
const genFormErrors = (errorsData) => {
  const attributes = Object.keys(errorsData)
  return attributes.map((attribute, i) => {
    return {attribute: attribute, msgParts: errorsData[attribute]}
  })
}

const Axios = () => {
  const { alertDispatch } = useContext(AlertContext)
  const { formErrorDispatch } = useContext(FormErrorContext)

  // handlerにデータが溜まっていくため、初期化する
  // handlersの型定義エラーが解消できず、anyに。
  const axiosWithAlertResponse: any = axiosWithAlert.interceptors.response
  if (axiosWithAlertResponse.handlers.length > 0) {
    axiosWithAlertResponse.handlers = [];
  }
  // 成功
  const onSuccess = (res) => {
    // console.log(res)
    // console.log(parseSnakeToCamel(res))
    const { data, status } =  res
    if(status !== STATUS_CODES.FLAT_CODE){
      alertDispatch({msg: data.msg, status: status})
    }
    // スネークケースからキャメルケースに変換
    return parseSnakeToCamel(res) as AxiosResponse<any> | Promise<AxiosResponse<any>>
  }
  // 失敗
  const onError = (err) => {
    // console.log(err.response)
    const { data, status } =  err.response
    // console.log(data.errors)
    if(status !== STATUS_CODES.FLAT_CODE){
      alertDispatch({msg: data.msg, status: status})
      data.errors && formErrorDispatch({ type: ADD_ERRORS, formErrors: genFormErrors(data.errors) })
    }
    // PromiseStatusをresolveにして.thenを実行しないようにする
    return Promise.reject(err)
  }
  // axiosWithAlert処理に割り込んで、成功の場合onSuccess、失敗の場合onErrorを実行する
  axiosWithAlert.interceptors.response.use(onSuccess, onError)
  return null
}
export default Axios
