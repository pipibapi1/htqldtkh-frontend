import axios from "axios";
import authHeader from "./authHeader";

const INSTRUCTOR_API_URL = process.env.REACT_APP_API_URL + "/api/instructor";

const getAllInstructorsService = () => {
    return axios.get(INSTRUCTOR_API_URL, { headers: authHeader() })
    .then((response) => {
        return response.data
    })
}

export default{
    getAllInstructorsService
}