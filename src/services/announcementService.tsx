import axios from "axios";

const ANNOUNCEMENT_API_URL = process.env.REACT_APP_API_URL + "/api/announcement";

interface Query{
    page: string;
    limit: string;
}

const getAnnouncementsService = (queryData: Query) => {
    const {page, limit} = queryData;

    return axios.
        get(ANNOUNCEMENT_API_URL + `?page=${page}&limit=${limit}`)
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

export default{
    getAnnouncementsService,
    getAnnouncementFileService
}