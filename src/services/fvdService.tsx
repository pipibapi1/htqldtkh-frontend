import axios from "axios";
import { GenderType } from "../shared/types/gender";
import authHeader from "./authHeader";

const FVD_API_URL = process.env.REACT_APP_API_URL + "/api/vicedean";

const getFvdListService = (queryData: any) => {
    const {page, limit, name, email, phoneNumber, staffId} = queryData;
    const queryString = `?page=${page}&limit=${limit}` 
        +  (name !== undefined ? `&name=${name}` : "")
        +  (email !== undefined ? `&email=${email}` : "")
        +  (phoneNumber !== undefined ? `&phoneNumber=${phoneNumber}` : "")
        +  (staffId !== undefined ? `&staffId=${staffId}` : "");
    return axios
        .get(FVD_API_URL + queryString, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const addAFvdService = (info: any) => {
    return axios.
        post(FVD_API_URL, info, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const updateFvdPersonalInfoService = (newInfoData: any) => {
    const {_id} = newInfoData;
    const newInfo = {
        viceDean: newInfoData
    }
    return axios.
        put(FVD_API_URL + '/' + _id, newInfo, { headers: authHeader() })
            .then((response) => {
                return response.data
            })
}

const deleteAFvdService = (_id: string) => {
    return axios.
        delete(FVD_API_URL + '/' + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default {
    getFvdListService,
    addAFvdService,
    updateFvdPersonalInfoService,
    deleteAFvdService
}