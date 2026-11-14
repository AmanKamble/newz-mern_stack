import { server } from "../store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" });
        const { data } = await axios.post(`${server}/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });
        dispatch({ type: "loginSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "loginFail", payload: error.response.data.message });
    }
}

export const register = (fromData) => async (dispatch) => {
    try {
        dispatch({ type: "registerRequest" });
        const { data } = await axios.post(`${server}/register`, fromData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        dispatch({ type: "registerSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "registerFail", payload: error.response.data.message });
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" });
        const { data } = await axios.get(`${server}/logout`, { withCredentials: true });
        dispatch({ type: "logoutSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "logoutFail", payload: error.response.data.message });
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "loadUserRequest" });
        const { data } = await axios.get(`${server}/me`, { withCredentials: true });
        dispatch({ type: "loadUserSuccess", payload: data.user });

    } catch (error) {
        dispatch({ type: "loadUserFail", payload: error.response.data.message });
    }
}


export const sendWriterRequest = (message) => async (dispatch) => {
    try {
        dispatch({ type: "sendWriterRequestRequest" });
        const { data } = await axios.post(`${server}/createrequest`, { message }, {
            withCredentials: true,
        });
        dispatch({ type: "sendWriterRequestSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "sendWriterRequestFail", payload: error.response.data.message });
    }
}
