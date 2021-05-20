import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Styles from "./globalStyles";
import Router from "./router";
import "./stylesheets/common.scss";
import "./stylesheets/style.css"
import { CookiesProvider, useCookies } from 'react-cookie';
import axios from "axios";
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  const [cookie, setCookie] = useCookies(['Authorization']);

  axios.defaults.baseURL = "http://localhost:5000";
  axios.interceptors.request.use((config)=> {
    if (process.env.REACT_APP_STAGE === 'dev') {
      config.baseURL = process.env.REACT_APP_DEV_BASE_URL
    } else if (process.env.REACT_APP_STAGE === 'prod') {
      config.baseURL = process.env.REACT_APP_PROD_BASE_URL
    }
    config = config || {}
    config.headers = config.headers || {};
    config.headers.Authorization = "Bearer " + cookie.Authorization;
    // config.headers.Authorization = "Bearer 4a00d9726af8bf87939463e7549f2624-9";

    return config;
  });

  return (
      <CookiesProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Styles />
            <Router />
          </BrowserRouter>
        </Provider>
      </CookiesProvider>
  );
}

export default App;
