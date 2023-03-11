import axios from "axios";
import authHeader from "./authHeader";

const SEND_EMAIL_API_URL = process.env.REACT_APP_API_URL + "/api/sendEmail";

const sendEmailService = (email: FormData) => {
    let headers: any = authHeader();
    headers = {
        ... headers,
        'Content-Type': 'multipart/form-data'
    }
    return axios.post(SEND_EMAIL_API_URL, email, { 
            headers: headers
        })
        .then((response) => {
            return response.data
        })
    
}

export default {
    sendEmailService
}