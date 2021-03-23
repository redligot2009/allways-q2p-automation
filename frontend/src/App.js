import 'react-perfect-scrollbar/dist/css/styles.css';
import { ToastContainer } from "react-toastify";
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
      <ToastContainer hideProgressBar={true} newestOnTop={true} />
    </ThemeProvider>
  );
};

export default App;
