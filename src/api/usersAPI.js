import axios from "axios";
import { URL_BASE } from "./contast";
import { getToken } from "./token";

export const getheaders = () => {
  const token = getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getUsers = async () => {
  try {
    const { data } = await axios.get(`${URL_BASE}users/`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMe = async () => {
  try {
    const respuesta = await axios.get(`${URL_BASE}users/getme/`);
    return respuesta;
  } catch (error) {
    throw error;
  }
};

export const getByUsers = async (id) => {
  try {
    const { data } = await axios.get(`${URL_BASE}users/${id}/`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUsers = async (id, body) => {
  try {
    const forData = new FormData();
    const listBody = Object.entries(body);
    listBody.forEach(([key, value]) => {
      forData.append(key, value);
    });

    const { data } = await axios.patch(`${URL_BASE}users/${id}/`, forData);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updatepasswordUsers = async (data) => {
  try {
    const respuesta = await axios.put(
      `${URL_BASE}users/api/change-password/`,
      data,
      getheaders()
    );
    return respuesta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchUsers = async (palabra) => {
  try {
    const { data } = await axios.get(
      `${URL_BASE}users/?search=${palabra !== null ? palabra : "********"}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateFotoUser = async (id, body) => {
  try {
    const formData = new FormData();
    formData.append("foto", body.foto);

    const { data } = await axios.patch(`${URL_BASE}users/${id}/`, formData);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateFondoUser = async (id, body) => {
  try {
    const formData = new FormData();
    formData.append("fondo", body.fondo);

    const { data } = await axios.patch(`${URL_BASE}users/${id}/`, formData);
    return data;
  } catch (error) {
    console.error(error);
  }
};
