import axios from "axios";
import { GenderType } from "../shared/types/gender";
import { EducationType } from "../shared/types/educationType";
import authHeader from "./authHeader";

const PI_API_URL = process.env.REACT_APP_API_URL + "/api/student";

interface NewInfoInput{
    _id: string;
    name: string;
    studentId: string;
    gender: GenderType;
    birthDate: Date;
    educationType: EducationType;
    email: string;
    phoneNumber: string;
    image: string;
}

const updateStudentPersonalInfoService = (newInfoData: NewInfoInput) => {
    const {_id} = newInfoData;
    const newInfo = {
        student: newInfoData
    }
    return axios.
        put(PI_API_URL + '/' + _id, newInfo, { headers: authHeader() })
            .then((response) => {
                return response.data
            })
}

export default {
    updateStudentPersonalInfoService
}