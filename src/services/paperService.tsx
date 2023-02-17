import axios from "axios";
import authHeader from "./authHeader";

const PAPER_API_URL = process.env.REACT_APP_API_URL + "/api/paper";

const postAddAPaperService = (paper: FormData) => {
    let headers: any = authHeader();
    headers = {
        ... headers,
        'Content-Type': 'multipart/form-data'
    }

    return axios.
        post(PAPER_API_URL, paper, { 
            headers: headers
        })
        .then((response) => {
            return response.data
        })
}

const putUpdateAPaperService = (paper: FormData) => {
    let headers: any = authHeader();
    headers = {
        ... headers,
        'Content-Type': 'multipart/form-data'
    }

    return axios.
        put(PAPER_API_URL, paper, { 
            headers: headers
        })
        .then((response) => {
            return response.data
        })
}

const deleteRemoveAPaperService = (_id: string) => {
    return axios
        .delete(PAPER_API_URL + '/' + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    postAddAPaperService,
    putUpdateAPaperService,
    deleteRemoveAPaperService
}