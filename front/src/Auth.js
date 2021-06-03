import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialContext = {
  currentUser: null,
  isLoggedIn: false
}
const AuthContext = React.createContext(initialContext);

const AuthProvider = (props) => {
  console.log(props)
  console.log(props.children)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const fetchCurrentUser = () => {
    axios.get(`/current_user`)
      .then(res => {
        console.log("current USer")
        // console.log(res)
        // const currentUser = res.data;
        setCurrentUser(res.data.data)
        res.data.data === null ? setIsLoggedIn(false) : setIsLoggedIn(true)
      })
  }

  useEffect(() => {
    fetchCurrentUser()
  }, []);
  const value = {currentUser, isLoggedIn}
  return (
    <AuthContext.Provider
      value={value}
    >
      {/* <div> */}
        { props.children }
      {/* </div> */}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
