import axios from "axios";
import { RequestType } from "../shared/types/requestType";
import { RequestStatus } from "../shared/types/requestStatus";
import authHeader from "./authHeader";

const REQUEST_API_URL = process.env.REACT_APP_API_URL + "/api/request";

interface Query{
    page: string;
    limit: string;
    period: string;
    type: RequestType | "";
    status: RequestStatus | "";
}

const getRequestListService = (queryData: Query) => {
    const {page, limit, period, type, status} = queryData;
    const queryString = `?page=${page}&limit=${limit}&period=${period}` 
        +  (type !== undefined ? `&type=${type}` : "")
        +  (status !== undefined ? `&status=${status}` : "");
    return axios
        .get(REQUEST_API_URL + queryString, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    getRequestListService
}