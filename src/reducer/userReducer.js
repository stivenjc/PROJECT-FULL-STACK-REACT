import {
  SET_USERS,
  SET_AUTH,
  SET_DETAIL,
  SET_USER_FILTER,
} from "../actions/types";

const initialstate = {
  users: [],
  auth: null,
  detail: null,
  user_filter: null,
};

export const userReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_AUTH:
      return { ...state, auth: action.payload };
    case SET_DETAIL:
      return { ...state, detail: action.payload };
    case SET_USER_FILTER:
      return { ...state, user_filter: action.payload };
    default:
      return { ...state };
  }
};
