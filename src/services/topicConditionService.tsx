import axios from "axios";
import { topicConditionIntf } from "../shared/interfaces/topicConditionInterface";
import authHeader from "./authHeader";
const TOPIC_CONDITION_API_URL = process.env.REACT_APP_API_URL + "/api/topicCondition";


const getTopicConditionByType = (type: string) => {
    return axios.get(TOPIC_CONDITION_API_URL + `?type=${type}`)
        .then((response) => {
            return response.data.topicCondition;
        })
}

const postTopicCondition = (condition: topicConditionIntf) => {
    const {isLoading, ...data} = condition;
    return axios.post(TOPIC_CONDITION_API_URL, {topicCondition : data}, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data.topicCondition;
        })
}

const getAvaiableTopicType = (type: string) => {
    return axios.get(TOPIC_CONDITION_API_URL + `/types?leader=${type}`, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data.types;
        })
}

export default {
    getTopicConditionByType,
    postTopicCondition,
    getAvaiableTopicType
}