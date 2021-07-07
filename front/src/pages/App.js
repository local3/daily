import React from 'react';
import Router from '../Router'
import { Box } from '@material-ui/core';

// 高階層コンポーネント系
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "../store/Auth";
import ErrorProvider from '../store/ErrorProvider';
import LoadProvider from '../store/LoadProvider'

// components
import Header from '../components/Header'
import Footer from '../components/Footer'
import ErrorMsg from '../components/ErrorMsg'
import Load from '../components/Load';
import '../styles/css/App.scss';
import { useLayoutStyles } from '../styles/js/layout';

// function App() 
const App = () => {  
  const layoutClasses = useLayoutStyles()
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorProvider>
          <LoadProvider>
            <AuthProvider>
              <Header/>
              <Load/>
              <Box className={layoutClasses.contentWrapper}>
                <ErrorMsg/>
                <Router/>
              </Box>
              <Footer/>
            </AuthProvider>
          </LoadProvider>
        </ErrorProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
