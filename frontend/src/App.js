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

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <Routes>
        </Routes>
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
    </ThemeProvider>
  );
};

export default App;
