import axios from "axios";
import authHeader from "./authHeader";

const STATISTIC_API_URL = process.env.REACT_APP_API_URL + "/api/statistic";

const getExpenseStatisticService = (timeRange: any) => {
    const {startYear, endYear} = timeRange
    return axios.get(STATISTIC_API_URL + "/" + "expense" + "/" + startYear + "/" + endYear, { headers: authHeader() })
    .then((response) => {
        return response.data
    })
}

export default {
    getExpenseStatisticService
}