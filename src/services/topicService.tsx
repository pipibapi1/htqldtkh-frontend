import axios from "axios";
import authHeader from "./authHeader";
import { TopicTypeEnum } from "../shared/types/topicType";
import { TopicStatusEnum } from "../shared/types/topicStatus";
import { topicInput } from "../shared/interfaces/topicInterface";

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

const postNewTopic = (topic: topicInput) => {
    return axios.post(TOPIC_API_URL, { topic: topic }, { headers: authHeader() })
            .then((response) => {
                console.log(response.data);
                return response.data.topic;
            })
}

export default{
    getTopicListService,
    postNewTopic
}