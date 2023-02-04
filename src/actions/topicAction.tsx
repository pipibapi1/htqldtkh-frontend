import { TopicTypeEnum } from "../shared/types/topicType";
import { TopicStatusEnum } from "../shared/types/topicStatus";
import topicService from "../services/topicService";

interface Query{
    page: string;
    limit: string;
    period: string;
    type: TopicTypeEnum;
    status: TopicStatusEnum;
    student: string;
    isExtended: string;
}
 
const getTopicListAction = (queryData: Query) => (dispatch: any) =>{
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