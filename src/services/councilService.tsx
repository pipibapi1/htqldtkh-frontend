import axios from "axios";
import authHeader from "./authHeader";
import { CouncilDataIntf } from "../shared/interfaces/councilInterface";

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

const getCouncilDetail = (councilId: string) => {
    return axios.get(COUNCIL_API_URL + `/${councilId}`, { 
        headers: authHeader()
    })
        .then((response) => {
            return response.data.council
        })
}

export default {
    getCouncilStatistic,
    getListCouncil,
    postNewCouncil,
    getCouncilDetail
}