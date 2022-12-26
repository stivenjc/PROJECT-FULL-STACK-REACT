import axios from "axios";
import { URL_BASE } from "./contast";
import { getToken } from "./token";

const getheaders = () => {
  const token = getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${URL_BASE}posts/`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const addPosts = async (body, id) => {
  try {
    const forData = new FormData();
    forData.append("image", body.image);
    forData.append("text", body.text);
    forData.append("created_by", id);
    const { data } = await axios.post(`${URL_BASE}posts/`, forData);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const geyByPosts = async (id) => {
  try {
    const { data } = await axios.get(`${URL_BASE}posts/?created_by=${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deltedPosts = async (id) => {
  try {
    const { data } = await axios.delete(
      `${URL_BASE}posts/${id}/`,
      getheaders()
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
