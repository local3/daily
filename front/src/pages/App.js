import React from 'react';
// import axios from 'axios';
import logo from '../styles/images/logo.svg';
import Router from '../Router'
import '../styles/css/App.css';

// function App() 
class App extends React.Component{  
  // get axios() {
  //   const axiosBase = require('axios');
  //   return axiosBase.create({
  //       baseURL: process.env.REACT_APP_DEV_API_URL,
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'X-Requested-With': 'XMLHttpRequest'
  //       },
  //       responseType: 'json'
  //   });
  // }
  render() {
    return (
      <div className="App">
        <Router/>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          aaa
          bbb
          ccc
          ddd
          kk
          mm
          bb
          vvv

          dd
          nnn
          eee

          www
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    )
  };
}

export default App;
