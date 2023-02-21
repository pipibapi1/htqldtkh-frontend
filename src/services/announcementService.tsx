import axios from "axios";
import authHeader from "./authHeader";

const ANNOUNCEMENT_API_URL = process.env.REACT_APP_API_URL + "/api/announcement";

interface Query{
    page: string;
    limit: string;
    period: string;
}


const getAnnouncementsService = (queryData: Query) => {
    const {page, limit, period} = queryData;

    return axios.
        get(ANNOUNCEMENT_API_URL + `?page=${page}&limit=${limit}&period=${period}`)
        .then((response) => {
            return response.data
        })
}

const getAnnouncementFileService = (_id: string) => {
    return axios.
        get(ANNOUNCEMENT_API_URL + `/${_id}/file`)
        .then((response) => {
            return response.data
        })
}

const postAddAnAnnouncementService = (announcement: FormData) => {
    let headers: any = authHeader();
    headers = {
        ... headers,
        'Content-Type': 'multipart/form-data'
    }
    return axios.
        post(ANNOUNCEMENT_API_URL, announcement, { 
            headers: headers
        })
        .then((response) => {
            return response.data
        })
}

export default{
    getAnnouncementsService,
    getAnnouncementFileService,
    postAddAnAnnouncementService
}