import axios from "axios";
import authHeader from "./authHeader";

const RESULT_AND_FEEDBACK_API_URL = process.env.REACT_APP_API_URL + "/api/resultAndFeedback";

const resultAndFeedbackService = (email: FormData) => {
    let headers: any = authHeader();
    headers = {
        ... headers,
        'Content-Type': 'multipart/form-data'
    }
    return axios.post(RESULT_AND_FEEDBACK_API_URL, email, { 
            headers: headers
        })
        .then((response) => {
            return response.data
        })
    
}

export default {
    resultAndFeedbackService
}