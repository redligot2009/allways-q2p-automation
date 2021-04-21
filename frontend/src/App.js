import 'react-perfect-scrollbar/dist/css/styles.css';
import { ToastContainer } from "react-toastify";
import React, {useEffect} from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout } from "./_actions/auth";

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    async function fetchProfile () {
      await dispatch(getProfile())
            .then((response)=>{
            })
            .catch((error)=>{
              dispatch(logout())
            })
    }
    fetchProfile();
  },[dispatch]);

  const { profile: currentUserProfile } = useSelector((state) => state.auth)
  const routing = useRoutes(routes(currentUserProfile));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
    </ThemeProvider>
  );
};

export default App;
