import axios from "axios";
import authHeader from "./authHeader";

const FORM_API_URL = process.env.REACT_APP_API_URL + "/api/form";

const postAddAFormService = (form: FormData) => {
    let headers: any = authHeader();
    headers = {
        ... headers,
        'Content-Type': 'multipart/form-data'
    }
    return axios.post(FORM_API_URL, form, { 
            headers: headers
        })
        .then((response) => {
            return response.data
        })
}

const getAFormService = (_id: string) => {
    return axios.get(FORM_API_URL + '/' + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const putUpdateAFormService = (updateInfo: any) => {
    const {_id, form} = updateInfo;
    return axios.put(FORM_API_URL + '/' + _id, {form: form}, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const deleteRemoveAFormService = (_id: string) => {
    return axios.delete(FORM_API_URL + '/' + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    postAddAFormService,
    getAFormService,
    putUpdateAFormService,
    deleteRemoveAFormService
}