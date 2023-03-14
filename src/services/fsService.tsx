import axios from "axios";
import { FsNewInfoInput } from "../shared/interfaces/fsInterface";
import authHeader from "./authHeader";

const FS_API_URL = process.env.REACT_APP_API_URL + "/api/secretary";

const updateFsPersonalInfoService = (newInfoData: FsNewInfoInput) => {
    const {_id} = newInfoData;
    const newInfo = {
        secretary: newInfoData
    }
    return axios.put(FS_API_URL + '/' + _id, newInfo, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default {
    updateFsPersonalInfoService
}