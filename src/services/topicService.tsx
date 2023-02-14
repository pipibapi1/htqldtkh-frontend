import axios from "axios";
import authHeader from "./authHeader";

const TOPIC_API_URL = process.env.REACT_APP_API_URL + "/api/topic";

const getTopicListService = (queryData: any) => {
    const {page, limit, period, type, status, student, isExtended} = queryData;
    const queryString = '?' + (period !== undefined ? `period=${period}&` : "") 
        +  (page !== undefined ? `page=${page}&` : "")
        +  (limit !== undefined ? `limit=${limit}&` : "")
        +  (type !== undefined ? `type=${type}&` : "")
        +  (status !== undefined ? `status=${status}&` : "")
        +  (student !== undefined ? `student=${student}&` : "")
        +  (isExtended !== undefined ? `isExtended=${isExtended}&` : "")
        ;
    return axios
        .get(TOPIC_API_URL + queryString, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const getTopicDetailService = (_id: string) => {
    return axios
        .get(TOPIC_API_URL + "/" + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const putUpdateATopicService = (updateInfo: any) => {
    const {_id, topic} = updateInfo;
    return axios
        .put(TOPIC_API_URL + "/" + _id, {topic: topic}, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    getTopicListService,
    getTopicDetailService,
    putUpdateATopicService
}