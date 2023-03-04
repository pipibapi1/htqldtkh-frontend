import axios from "axios";
import authHeader from "./authHeader";
import { TopicTypeEnum } from "../shared/types/topicType";
import { TopicStatusEnum } from "../shared/types/topicStatus";

const TOPIC_API_URL = process.env.REACT_APP_API_URL + "/api/topic";

const getTopicListService = (queryData: any) => {
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
        +  (acceptanceCouncil !== undefined ? `acceptanceCouncil=${acceptanceCouncil}&` : "")
        ;
    return axios
        .get(TOPIC_API_URL + queryString, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    getTopicListService
}