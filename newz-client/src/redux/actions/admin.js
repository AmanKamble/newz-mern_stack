import { server } from "../store";
import axios from "axios";

export const createNews = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "createNewsRequest" });
        const { data } = await axios.post(`${server}/createnews`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        dispatch({ type: "createNewsSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "createNewsFail", payload: error.response.data.message });
    }
}


export const getMyNews = (keyward = "") => async (dispatch) => {
    try {
        dispatch({ type: "myNewsRequest" });
        const { data } = await axios.get(`${server}/mynews?keyward=${keyward}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });
        dispatch({ type: "myNewsSuccess", payload: data.news });
    } catch (error) {
        dispatch({ type: "myNewsFail", payload: error.response.data.message });
    }
};