import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postsReducer } from "./postsReducer";
import { likesReducer } from "./likesReducer";

export default combineReducers({
  likesReducer,
  userReducer,
  postsReducer,
});
