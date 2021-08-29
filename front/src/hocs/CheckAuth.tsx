import { useContext } from 'react'
import { AlertContext } from '../store/AlertProvider'
import { useHistory } from 'react-router';
import { AuthContext } from "../store/Auth";

const CheckAuth = (props) => {
  const auth = useContext(AuthContext)
  const { alertDispatch } = useContext(AlertContext)
  const history = useHistory()
  
  // console.log(auth)
  if(auth.isFetchingAuth){
    return null
  }else{
    // ログインが確認できれば、CheckAuthで囲んだコンポーネントを描画する
    if(auth.isLoggedIn && auth.currentUser){
      return props.children
    // ログインフラグとログインユーザーどちらかが取得できていない場合、アクセスを弾く
    }else if(!auth.isLoggedIn || !auth.currentUser){
      history.push('/login')
      alertDispatch({status: 422, msg: "ログインが必要です"})
      return null
    }
  }
  return null

}

export default CheckAuth;
