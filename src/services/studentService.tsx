import axios from "axios";
import { GenderType } from "../shared/types/gender";
import { EducationType } from "../shared/types/educationType";
import authHeader from "./authHeader";

const STUDENT_API_URL = process.env.REACT_APP_API_URL + "/api/student";

interface Query{
    page: string;
    limit: string;
    name: string;
    email: string;
    phoneNumber: string;
    status: string;
    eduType: string;
}

const getStudentListService = (query: Query) => {
    const {page, limit, name, email, phoneNumber, status, eduType} = query;
    const queryString = `?page=${page}&limit=${limit}` 
        +  (name !== undefined ? `&name=${name}` : "")
        +  (email !== undefined ? `&email=${email}` : "")
        +  (phoneNumber !== undefined ? `&phoneNumber=${phoneNumber}` : "")
        +  (status !== undefined ? `&status=${status}` : "")
        +  (eduType !== undefined ? `&eduType=${eduType}` : "");
    return axios
        .get(STUDENT_API_URL + queryString, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const updateStudentPersonalInfoService = (newInfoData: any) => {
    const {_id} = newInfoData;
    const newInfo = {
        student: newInfoData
    }
    return axios.
        put(STUDENT_API_URL + '/' + _id, newInfo, { headers: authHeader() })
            .then((response) => {
                return response.data
            })
}

const deleteAStudentService = (_id: string) => {
    return axios.
        delete(STUDENT_API_URL + '/' + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default {
    getStudentListService,
    updateStudentPersonalInfoService,
    deleteAStudentService
}