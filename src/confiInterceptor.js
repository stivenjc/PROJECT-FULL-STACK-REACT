import axios from "axios";
import { getToken } from "./api/token";

const clientInterceptor = axios.create();
// Add a request interceptor
clientInterceptor.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      config.headers["hedaers-adrian"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//////////

export default clientInterceptor;
