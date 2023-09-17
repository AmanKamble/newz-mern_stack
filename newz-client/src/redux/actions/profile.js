import { server } from "../store";
import axios from "axios";

export const updateProfilePicture = (formData) => async (dispatch) => {
    try {
        dispatch({ type: "updateProfilePictureRequest" });
        const {data} = await axios.put(`${server}/updateprofilepicture`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        });
        dispatch({ type: "updateProfilePictureSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "updateProfilePictureFail", payload: error.response.data.message });
    }
}
