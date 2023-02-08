import axios from "axios";
import authHeader from "./authHeader";
const TOPIC_CONDITION_API_URL = process.env.REACT_APP_API_URL + "/api/topicCondition";

interface topicConditionIntf {
    _id?: string,
    type?: string,
    createAt?: string,
    expression?: {[k: string]: (relationExprIntf | logicExprIntf)},
    isLoading?: boolean
}

interface relationExprIntf {
    operator: string
}

interface logicExprIntf{
    operator: string,
    object: string,
    leftExpr: {variable: string, weight?: string}[],
    rightValue: string
}

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

export default {
    getTopicConditionByType,
    postTopicCondition
}