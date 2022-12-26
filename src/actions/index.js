import { SET_USERS, SET_AUTH, SET_DETAIL, SET_USER_FILTER } from "./types";

export const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
});

export const setAuth = (payload) => ({
  type: SET_AUTH,
  payload,
});

export const setDetail = (payload) => ({
  type: SET_DETAIL,
  payload,
});

export const setUserFilter = (payload) => ({
  type: SET_USER_FILTER,
  payload,
});
