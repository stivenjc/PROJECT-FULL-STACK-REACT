import { SET_POSTS } from "../actions/types";

const initialstate = {
  posts: [],
};

export const postsReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload };
    default:
      return { ...state };
  }
};
