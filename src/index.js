import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";

// axios configuration
if(process.env.NODE_ENV=="development")
{
  axios.defaults.baseURL = "http://127.0.0.1:8000/";
}
// React stuff
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
