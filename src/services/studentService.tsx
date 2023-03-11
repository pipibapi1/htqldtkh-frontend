import axios from "axios";
import { StudentQuery } from "../shared/queryInterface/studentQuery";
import authHeader from "./authHeader";

const STUDENT_API_URL = process.env.REACT_APP_API_URL + "/api/student";

const getStudentListService = (query: StudentQuery) => {
    const {page, limit, name, email, phoneNumber, status, eduType} = query;
    const queryString = "?" + (page !== undefined ? `page=${page}&` : "")
                        + (limit !== undefined ? `limit=${limit}&` : "")
                        + (name !== undefined ? `name=${name}&` : "")
                        + (email !== undefined ? `email=${email}&` : "")
                        + (phoneNumber !== undefined ? `phoneNumber=${phoneNumber}&` : "")
                        + (status !== undefined ? `status=${status}&` : "")
                        + (eduType !== undefined ? `eduType=${eduType}&` : "");
    return axios.get(STUDENT_API_URL + queryString, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const updateStudentPersonalInfoService = (newInfoData: any) => {
    const {_id} = newInfoData;
    const newInfo = {
        student: newInfoData
    }
    return axios.put(STUDENT_API_URL + '/' + _id, newInfo, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const deleteAStudentService = (_id: string) => {
    return axios.delete(STUDENT_API_URL + '/' + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default {
    getStudentListService,
    updateStudentPersonalInfoService,
    deleteAStudentService
}