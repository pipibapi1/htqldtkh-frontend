import axios from "axios";
import authHeader from "./authHeader";

const PERIOD_API_URL = process.env.REACT_APP_API_URL + "/api/period";

const getAllPeriodsService = (query: any) => {
    const {year, status} = query;
    const queryString = (year !== undefined ? `?year=${year}` : "")
                    + (status !== undefined ? `&status=${status}` : "");
        
    return axios.get(PERIOD_API_URL + queryString, { headers: authHeader() })
                .then((response) => {
                    return response.data
                })
}

const postAddAPeriodService = (newPeriod: any) => {
    return axios.post(PERIOD_API_URL, newPeriod, { headers: authHeader() })
            .then((response) => {
                return response.data
            })
}

const putUpdateAPeriodService = (updateInfo: any) => {
    const {_id, period} = updateInfo;
    return axios.put(PERIOD_API_URL + "/" + _id, {period: period}, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    getAllPeriodsService,
    postAddAPeriodService,
    putUpdateAPeriodService
}