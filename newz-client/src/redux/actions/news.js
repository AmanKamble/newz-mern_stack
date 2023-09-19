import { server } from "../store";
import axios from "axios";

export const getAllNews = (category = "", keyward = "") => async (dispatch) => {
    try {
        dispatch({ type: "allNewsRequest" });
        const { data } = await axios.get(`${server}/news?keyward=${keyward}&category=${category}`);
        dispatch({ type: "allNewsSuccess", payload: data.news});
    } catch (error) {
        dispatch({ type: "allNewsFail", payload: error.response.data.message });
    }
}
