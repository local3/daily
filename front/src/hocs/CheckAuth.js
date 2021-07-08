import React, { useContext, useEffect } from 'react'
import { ErrorContext } from '../store/ErrorProvider'
import { useHistory } from 'react-router';
import { AuthContext } from "../store/Auth";
import { Redirect } from 'react-router-dom';

const CheckAuth = (props) => {
  const auth = useContext(AuthContext)
  const { errorDispatch } = useContext(ErrorContext)
  const history = useHistory()
  
  console.log(auth)
  if(auth.isFetchingAuth){
    return null
  }else{
    // ログインが確認できれば、CheckAuthで囲んだコンポーネントを描画する
    if(auth.isLoggedIn && auth.currentUser){
      return props.children
    // ログインフラグとログインユーザーどちらかが取得できていない場合、アクセスを弾く
    }else if(!auth.isLoggedIn || !auth.currentUser){
      errorDispatch({status: 422, msg: "ログインが必要です"})
      return <Redirect to={'/login'} />
    }
  }
  return null

}

export default CheckAuth;
