import { TopicTypeEnum } from "../shared/types/topicType";
import { TopicStatusEnum } from "../shared/types/topicStatus";
import topicService from "../services/topicService";
 
const getTopicListAction = (queryData: any) => (dispatch: any) =>{
    return topicService.getTopicListService(queryData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

export {
    getTopicListAction
}