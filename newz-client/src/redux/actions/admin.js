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
