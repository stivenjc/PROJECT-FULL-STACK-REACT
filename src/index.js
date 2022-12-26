import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reducer from "./reducer";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { removeRefresh, removeToken } from "./api/token";
import { getheaders } from "./api/usersAPI";
import { URL_BASE } from "./api/contast";
import { deletedTokenAPI, refreshAPI } from "./api/loginAPI";

const clientInterceptor = axios.create();
// Add a request interceptor

const urlsNoToken = [`${URL_BASE}register/users/`, `${URL_BASE}login/`];

axios.interceptors.request.use(
  (config) => {
    let newConfig = { ...config };

    if (urlsNoToken.includes(config.url) == false) {
      newConfig = { ...newConfig, ...getheaders() };
    }

    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      originalRequest.url === `${URL_BASE}token/refresh/`
    ) {
      const cerrarSesion = () => {
        deletedTokenAPI();

        removeToken();
        removeRefresh();
        window.location.ref = window.location.origin;
      };

      cerrarSesion();
      return Promise.reject(error);
    }

    if (error?.response?.status === 401) {
      refreshAPI();

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
