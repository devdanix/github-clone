import githubReducer from "./github";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  githubReducer: githubReducer
});

export default allReducers;
