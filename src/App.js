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
import axios from 'axios';

// TODO: Maybe fetch all one-time fetch data that doesn't change in the App.js instead of scattered everywhere.

const App = () => {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source()
  
  useEffect(() => {
    dispatch(getProfile(source.token))
    // TODO: dispatch actions to fetch paper, lamination, and binding types.
    return () => {
      source.cancel();
    }
  }, [dispatch])

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
