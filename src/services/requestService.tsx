import axios from "axios";
import authHeader from "./authHeader";

const REQUEST_API_URL = process.env.REACT_APP_API_URL + "/api/request";

const getRequestListService = (queryData: any) => {
    const {page, limit, period, type, status, studentId} = queryData;
    const queryString = `?page=${page}&limit=${limit}`
        + (period !== undefined ? `&period=${period}`:"")
        +  (type !== undefined ? `&type=${type}` : "")
        +  (status !== undefined ? `&status=${status}` : "")
        +  (studentId !== undefined ? `&studentId=${studentId}` : "")
        ;
    return axios
        .get(REQUEST_API_URL + queryString, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const putUpdateARequestService = (updateInfo: any) => {
    const {_id, request} = updateInfo;
    return axios.
        put(REQUEST_API_URL + "/" + _id, {request: request}, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const postAddARequestService = (newRequest: any) => {
    const {request} = newRequest;
    return axios
        .post(REQUEST_API_URL, {request: request}, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const deleteRemoveARequestService = (_id: string) => {
    return axios
        .delete(REQUEST_API_URL + "/" + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    getRequestListService,
    putUpdateARequestService,
    postAddARequestService,
    deleteRemoveARequestService
}