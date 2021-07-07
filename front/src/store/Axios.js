import { useContext } from 'react'
import { ErrorContext } from './ErrorProvider'
import axios from 'axios'

export const client = axios.create()
const Axios = () => {
  if (client.interceptors.response.handlers.length > 0) {
    client.interceptors.response.handlers = []
  }
  const onSuccess = (res) => {
    if (res){
      return res
    }
  }
  const { errorDispatch } = useContext(ErrorContext)
  const onError = (err) => {
    const { data, status } =  err.response
    errorDispatch({msg: data.msg, status: status})
    return Promise.reject(err)
  }
  client.interceptors.response.use(onSuccess, onError)
  return null
}
export default Axios