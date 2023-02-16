import axios from "axios";
import { URL_BASE } from "./contast";
import { getToken } from "./token";

const getheaders = () => {
  const token = getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const addComent = async (body, idUser, idpos) => {
  console.log(body, idUser, idpos);
  try {
    const forData = new FormData();
    forData.append("title", body.title);
    forData.append("post", idpos);
    forData.append("created", idUser);
    const { data } = await axios.post(
      `${URL_BASE}coment/`,
      forData,
      getheaders()
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
