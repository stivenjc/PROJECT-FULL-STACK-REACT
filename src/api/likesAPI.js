import axios from "axios";
import { URL_BASE } from "./contast";
import { getToken } from "./token";

const getheaders = () => {
  const token = getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const addLike = async (idpost, iduser) => {
  try {
    const { data } = await axios.post(
      `${URL_BASE}likes/`,
      { post: idpost, user: iduser },
      getheaders()
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getbyLike = async (idpost, iduser) => {
  try {
    const { data } = await axios.get(
      `${URL_BASE}likes/?post=${idpost}`,
      getheaders()
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
