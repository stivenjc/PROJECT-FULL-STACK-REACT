import { SET_LIKES } from "../actions/types";

const initialstate = {
  likes: [],
};

export const likesReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SET_LIKES:
      return { ...state, likes: action.payload };
    default:
      return { ...state };
  }
};
