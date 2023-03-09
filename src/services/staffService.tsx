import axios from "axios";
import authHeader from "./authHeader";

const STAFF_API_URL = process.env.REACT_APP_API_URL + "/api/staff";

const getAllStaffsService = () => {
    return axios.get(STAFF_API_URL, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    getAllStaffsService
}
