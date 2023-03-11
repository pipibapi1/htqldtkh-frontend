import axios from "axios";
import authHeader from "./authHeader";
import { topicInput } from "../shared/interfaces/topicInterface";
import { TopicQuery } from "../shared/queryInterface/topicQuery";

const TOPIC_API_URL = process.env.REACT_APP_API_URL + "/api/topic";

const getTopicListService = (queryData: TopicQuery) => {
    const {page, limit, period, type, status, student, isExtended, 
        reviewCouncil, acceptanceCouncil} = queryData;
    const queryString = '?' + (period !== undefined ? `period=${period}&` : "") 
                        +  (page !== undefined ? `page=${page}&` : "")
                        +  (limit !== undefined ? `limit=${limit}&` : "")
                        +  (type !== undefined ? `type=${type}&` : "")
                        +  (status !== undefined ? `status=${status}&` : "")
                        +  (student !== undefined ? `student=${student}&` : "")
                        +  (isExtended !== undefined ? `isExtended=${isExtended}&` : "")
                        +  (reviewCouncil !== undefined ? `reviewCouncil=${reviewCouncil}&` : "")
                        +  (acceptanceCouncil !== undefined ? `acceptanceCouncil=${acceptanceCouncil}&` : "");
    return axios.get(TOPIC_API_URL + queryString, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const postNewTopic = (topic: topicInput) => {
    return axios.post(TOPIC_API_URL, { topic: topic }, { headers: authHeader() })
        .then((response) => {
            return response.data.topic;
        })
}
            
const getTopicDetailService = (_id: string) => {
    return axios.get(TOPIC_API_URL + "/" + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const putUpdateATopicService = (updateInfo: any) => {
    const {_id, topic} = updateInfo;
    return axios.put(TOPIC_API_URL + "/" + _id, {topic: topic}, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const deleteRemoveATopicService = (_id: string) => {
    return axios.delete(TOPIC_API_URL + "/" + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    getTopicListService,
    postNewTopic,
    getTopicDetailService,
    putUpdateATopicService,
    deleteRemoveATopicService
}