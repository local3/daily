import React, { useContext, useEffect } from 'react'
import { ErrorContext } from '../store/ErrorProvider'
import { useHistory } from 'react-router';
import { AuthContext } from "../store/Auth";
import { Redirect } from 'react-router-dom';

const CheckAuth = (props) => {
  const auth = useContext(AuthContext)
  const { dispatch } = useContext(ErrorContext)
  const history = useHistory()
  
  if(auth.isFetchingAuth){
    return null
  }else{
    if(auth.isLoggedIn && auth.currentUser){
      return props.children
    }else if(!auth.isLoggedIn || !auth.currentUser){
      dispatch({status: 422, msg: "ログインが必要です"})
      return <Redirect to={'/login'} />
    }

    return null
  }

}

export default CheckAuth;
