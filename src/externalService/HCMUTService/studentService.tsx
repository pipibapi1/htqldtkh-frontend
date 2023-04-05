import axios from "axios";

const HCMUT_STUDENT_API = process.env.REACT_APP_EXTERNAL_API_URL + "/api/student";

const getHCMUTStudentById = (studentId: string) => {
    return axios.get(`${HCMUT_STUDENT_API}/${studentId}`, {})
    .then((response) => {
        return response.data.student
    })
}

export const HCMUTStudentService = {
    getHCMUTStudentById
}