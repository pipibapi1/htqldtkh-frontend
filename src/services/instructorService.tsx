import axios from "axios";

const INSTRUCTOR_EXTERNAL_API_URL = process.env.REACT_APP_EXTERNAL_API_URL + "/api/instructor";

const getAllInstructorsService = () => {
    return axios.get(INSTRUCTOR_EXTERNAL_API_URL)
        .then((response) => {
            return response.data
        })
}

export default{
    getAllInstructorsService
}