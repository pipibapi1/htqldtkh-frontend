import axios from "axios";
import { GenderType } from "../shared/types/gender";
import authHeader from "./authHeader";

const PI_API_URL = process.env.REACT_APP_API_URL + "/api/vicedean";

interface NewInfoInput{
    _id: string;
    name: string;
    gender: GenderType;
    birthDate: Date;
    email: string;
    phoneNumber: string;
    image: string;
}

const updateFvdPersonalInfoService = (newInfoData: NewInfoInput) => {
    const {_id} = newInfoData;
    const newInfo = {
        viceDean: newInfoData
    }
    return axios.
        put(PI_API_URL + '/' + _id, newInfo, { headers: authHeader() })
            .then((response) => {
                return response.data
            })
}

export default {
    updateFvdPersonalInfoService
}