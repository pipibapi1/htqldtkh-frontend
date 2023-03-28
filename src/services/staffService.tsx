import axios from "axios";

const STAFF_EXTERNAL_API_URL = process.env.REACT_APP_EXTERNAL_API_URL + "/api/staff";

const getAllStaffsService = () => {
    return axios.get(STAFF_EXTERNAL_API_URL)
        .then((response) => {
            return response.data
        })
}

export default{
    getAllStaffsService
}
