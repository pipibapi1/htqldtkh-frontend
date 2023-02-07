import axios from "axios";
import authHeader from "./authHeader";

const PERIOD_API_URL = process.env.REACT_APP_API_URL + "/api/period";

const getAllPeriodsService = () => {
    return axios.get(PERIOD_API_URL, { headers: authHeader() })
                .then((response) => {
                    return response.data
                })
}

export default{
    getAllPeriodsService
}