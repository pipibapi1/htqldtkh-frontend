import axios from "axios";
import { AnnouncementQuery } from "../shared/queryInterface/announcementQuery";
import authHeader from "./authHeader";

const ANNOUNCEMENT_API_URL = process.env.REACT_APP_API_URL + "/api/announcement";

const getAnnouncementsService = (queryData: AnnouncementQuery) => {
    const {page, limit, period, year} = queryData;
    const queryString = `?` + (page !== undefined ? `page=${page}&`:"")
                        + (limit !== undefined ? `limit=${limit}&`:"")
                        + (period !== undefined ? `period=${period}&` : "")
                        + (year !== undefined ? `year=${year}&`: "");

    return axios.get(ANNOUNCEMENT_API_URL + queryString)
        .then((response) => {
            return response.data
        })
}

const getAnnouncementFileService = (_id: string) => {
    return axios.get(ANNOUNCEMENT_API_URL + `/${_id}/file`)
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
    return axios.post(ANNOUNCEMENT_API_URL, announcement, { 
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