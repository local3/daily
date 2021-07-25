import React from 'react';
import Router from '../Router'
import { Box } from '@material-ui/core';

// 高階層コンポーネント系
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "../store/Auth";
import AlertProvider from '../store/AlertProvider';
import LoadProvider from '../store/LoadProvider'
import DateProvider from '../store/DateProvider';
import DiaryFormContentProvider from '../store/DiaryFormContentProvider';

// components
import Header from '../components/Header'
import Footer from '../components/Footer'
import AlertMsg from '../components/AlertMsg'
import Load from '../components/Load';
import '../styles/css/App.scss';
import { useLayoutStyles } from '../styles/js/layout';

// function App() 
const App = () => {  
  const layoutClasses = useLayoutStyles()
  return (
    <div className="App">
      <BrowserRouter>
        <AlertProvider>
          <LoadProvider>
            <AuthProvider>
              <DateProvider>
                <Header/>
                <Load/>
                <Box className={layoutClasses.contentWrapper}>
                  <AlertMsg/>
                  <Router/>
                </Box>
                <DiaryFormContentProvider>
                  <Footer/>
                </DiaryFormContentProvider>
              </DateProvider>
            </AuthProvider>
          </LoadProvider>
        </AlertProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
