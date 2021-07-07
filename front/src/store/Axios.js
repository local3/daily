import { useContext } from 'react'
import { ErrorContext } from './ErrorProvider'
import axios from 'axios'

export const client = axios.create()
const Axios = () => {
  if (axios.interceptors.response.handlers.length > 0) {
    axios.interceptors.response.handlers = [];
  }
  // if (!!client || client === 0) {
  //   console.log(client)
  //   console.log('りせっと')
  //   axios.interceptors.request.eject(client);
  //   console.log(client)
  // }
  const onSuccess = (res) => {
    console.log(res)
    if (res){
      throw res
    }else{
      return res
    }
  }
  const { errorDispatch } = useContext(ErrorContext)
  const onError = (err) => {
    console.log(err.response)
    const { data, status } =  err.response
    errorDispatch({msg: data.msg, status: status})
    // throw false
    return false
    // Promise.reject(err)
  }
  console.log('せぷたーまえ')
  client.interceptors.response.use(onSuccess, onError)
  console.log('りせっと')
  return null
}
export default Axios