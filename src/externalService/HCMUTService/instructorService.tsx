import axios from "axios";

const HCMUT_INSTRUCTOR_API = process.env.REACT_APP_EXTERNAL_API_URL + "/api/instructor";

const getHCMUTInstructorById = (staffId: string) => {
    return axios.get(`${HCMUT_INSTRUCTOR_API}/${staffId}`, {})
    .then((response) => {
        return response.data.instructor
    })
}

export const HCMUTInstructorService = {
    getHCMUTInstructorById
}