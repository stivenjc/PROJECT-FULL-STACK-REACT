import axios from "axios";
import { URL_BASE } from "./contast";
import { setToken, setRefresh, getRefresh, getToken } from "./token";

const getheaders = () => {
  const token = getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const loginAPI = async (dataform) => {
  try {
    const { data } = await axios.post(`${URL_BASE}login/`, dataform);
    const { access, refresh } = data;
    setRefresh(refresh);
    setToken(access);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const refreshAPI = async () => {
  try {
    const { data } = await axios.post(`${URL_BASE}token/refresh/`, {
      refresh: getRefresh(),
    });
    const { access, refresh } = data;
    setRefresh(refresh);
    setToken(access);
  } catch (error) {
    throw error;
  }
};

export const deletedTokenAPI = async () => {
  try {
    const respuesta = await axios.post(
      `${URL_BASE}logout/`,
      {
        refresh_token: getRefresh(),
      },
      getheaders()
    );
    return respuesta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerAPI = async (data) => {
  try {
    const respuesta = await axios.post(`${URL_BASE}register/users/`, data);
    return respuesta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
