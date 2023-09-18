import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { newsReducer } from "../redux/reducers/newsReducers.js"
import { userReducer } from "./reducers/userReducer.js";
import { profileReducer } from "./reducers/profileReducer.js";
import { adminReducer } from "./reducers/adminReducer.js";

const rootReducer = combineReducers({
  news: newsReducer,
  user: userReducer,
  profile: profileReducer,
  admin: adminReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export const server = "http://localhost:5000/api/v1";
