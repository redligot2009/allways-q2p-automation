import 'react-perfect-scrollbar/dist/css/styles.css';
import { ToastContainer } from "react-toastify";
import React, {useEffect} from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import Routes from 'src/routes';
import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout } from "./_actions/auth";
import { useInterval } from './_helpers/hooks';


const App = () => {
  const dispatch = useDispatch();
  useInterval(()=>{
    dispatch(getProfile())
  }, 150000)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <ToastContainer 
          position="top-right"
          closeOnClick
          hideProgressBar={true}
          autoClose={2000}
          draggable={false}
        />
        <Routes/>
    </ThemeProvider>
  );
};

export default App;
