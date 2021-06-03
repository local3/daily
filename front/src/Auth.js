import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router';

const initialContext = {
  currentUser: null,
  isLoggedIn: false,
}
const AuthContext = React.createContext(initialContext);

const AuthProvider = (props) => {
  const history = useHistory();
  
  const login = (loggedInUser) => {
    setCurrentUser(loggedInUser)
    // console.log(loggedInUser)
    loggedInUser ? setIsLoggedIn(true) : setIsLoggedIn(false)
    history.push('/')
  }

  const logout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    history.push('/login')
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const fetchCurrentUser = () => {
    axios.get(`/current_user`)
      .then(res => {
        // console.log(res.data)
        setCurrentUser(res.data.data)
        res.data.data === null ? setIsLoggedIn(false) : setIsLoggedIn(true)
      })
  }

  useEffect(() => {
    fetchCurrentUser()
  }, []);
  const value = {currentUser, isLoggedIn, login, logout}
  return (
    <AuthContext.Provider
      value={value}
    >
      { props.children }
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
