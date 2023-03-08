import axios from "axios";
import authHeader from "./authHeader";
import { CouncilDataIntf, UpdateCouncilInfo } from "../shared/interfaces/councilInterface";

const COUNCIL_API_URL = process.env.REACT_APP_API_URL + "/api/council";

interface Query{
    type?: string;
    period?: string;
    page?: number,
    limit?: number
}

const getCouncilStatistic = (queryData: Query) => {
    const {type, period} = queryData;

    return axios.get(COUNCIL_API_URL + `/statistics?type=${type}&period=${period}`, { 
        headers: authHeader()
    })
        .then((response) => {
            return response.data.councilStatistics
        })
}

const getListCouncil = (queryData: Query) => {
    const {type, period, page, limit} = queryData;

    return axios.get(COUNCIL_API_URL + `?type=${type}&period=${period}&page=${page}&period=${limit}`, { 
        headers: authHeader()
    })
        .then((response) => {
            return response.data.councils
        })
}

const postNewCouncil = (councilData: CouncilDataIntf) => {
    const data = {
        council: councilData
    }
    return axios.post(COUNCIL_API_URL, data, { 
        headers: authHeader()
    })
        .then((response) => {
            return response.data.council
        })
}

const postAddTopicToCouncil = (councilId: string, topicList: string[]) => {
    const data = {
        topics: topicList
    }
    return axios.post(`${COUNCIL_API_URL}/${councilId}/topic`, data, { 
        headers: authHeader()
    })
        .then((response) => {
            return response.data.council
        })
}

const putUpdateCouncil = (councilId: string, updateInfo: UpdateCouncilInfo) => {
    return axios.put(COUNCIL_API_URL + `/${councilId}`, {
        council: updateInfo
    } , { 
        headers: authHeader()
    })
        .then((response) => {
            return response.data.council
        })
}

const getCouncilDetail = (councilId: string) => {
    return axios.get(COUNCIL_API_URL + `/${councilId}`, { 
        headers: authHeader()
    })
        .then((response) => {
            return response.data.council
        })
}

const deleteCouncil = (councilId: string) => {
    return axios.delete(COUNCIL_API_URL + `/${councilId}`, { 
        headers: authHeader()
    })
        .then((response) => {
            return response.data
        })
}

export default {
    getCouncilStatistic,
    getListCouncil,
    postNewCouncil,
    getCouncilDetail,
    deleteCouncil,
    putUpdateCouncil,
    postAddTopicToCouncil
}