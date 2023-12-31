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

export const deleteNews = (newsId) => async (dispatch) => {
    try {
        dispatch({ type: "deleteNewsRequest" });
        const { data } = await axios.delete(`${server}/newsdelete/${newsId}`, {
            withCredentials: true,
        });
        dispatch({ type: "deleteNewsSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "deleteNewsFail", payload: error.response.data.message });
    }
}

export const getAllUsers = (id = "") => async (dispatch) => {
    try {
        dispatch({ type: "allUsersRequest" });
        const { data } = await axios.get(`${server}/admin/users?id=${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });
        dispatch({ type: "allUsersSuccess", payload: data.users });
    } catch (error) {
        dispatch({ type: "allUsersFail", payload: error.response.data.message });
    }
};

export const deleteUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: "deleteUserRequest" });
        const { data } = await axios.delete(`${server}/admin/user/${userId}`, {
            withCredentials: true,
        });
        dispatch({ type: "deleteUserSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "deleteUserFail", payload: error.response.data.message });
    }
}

export const changeUserRole = (userId, role) => async (dispatch) => {
    try {
        dispatch({ type: "changeUserRoleRequest" });
        const { data } = await axios.put(`${server}/admin/user/${userId}`, { role }, {
            withCredentials: true,
        });
        dispatch({ type: "changeUserRoleSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "changeUserRoleFail", payload: error.response.data.message });
    }
}


export const getAllWriterRequests = (id = "") => async (dispatch) => {
    try {
        dispatch({ type: "getAllWriterRequestsRequest" });
        const { data } = await axios.get(`${server}/admin/writerrequest`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });
        dispatch({ type: "getAllWriterRequestsSuccess", payload: data.writerRequests });
    } catch (error) {
        dispatch({ type: "getAllWriterRequestsFail", payload: error.response.data.message });
    }
};

export const deleteWriterRequest = (requestId) => async (dispatch) => {
    try {
        dispatch({ type: "deleteWriterRequestRequest" });
        const { data } = await axios.delete(`${server}/admin/deleterequest/${requestId}`, {
            withCredentials: true,
        });
        dispatch({ type: "deleteWriterRequestSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "deleteUserFail", payload: error.response.data.message });
    }
}
