import axios from "axios";
import { GenderType } from "../shared/types/gender";
import { EducationType } from "../shared/types/educationType";
import authHeader from "./authHeader";

const PI_API_URL = process.env.REACT_APP_API_URL + "/api/student";

interface NewInfoInput{
    fmName: string;
    name: string;
    studentId: string;
    gender: GenderType;
    birthDate: Date;
    educationType: EducationType;
    email: string;
    phoneNumber: string;
    image: string;
}

const updatePersonalInfoService = (newInfoData: NewInfoInput) => {
    const {studentId} = newInfoData;
    const newInfo = {
        student: newInfoData
    }
    return axios.
        put(PI_API_URL + '/' +studentId, newInfo, { headers: authHeader() })
            .then((response) => {
                return response.data
            })
}

export default {
    updatePersonalInfoService
}