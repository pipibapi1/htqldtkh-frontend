import axios from "axios";
import authHeader from "./authHeader";

const NOTIFICATION_API_URL = process.env.REACT_APP_API_URL + "/api/notification";

const getUnreadNotificationService = () => {
    return axios.get(NOTIFICATION_API_URL, { headers: authHeader() })
    .then((response) => {
        return response.data
    })
}

export default{
    getUnreadNotificationService
}