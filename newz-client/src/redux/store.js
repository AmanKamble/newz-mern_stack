import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { newsReducer } from "../redux/reducers/newsReducers.js"

const rootReducer = combineReducers({
  news: newsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export const server = "http://localhost:5000/api/v1";
