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

const getTopicDetailAction = (_id: string) => (dispatch: any) => {
    return topicService.getTopicDetailService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

export {
    getTopicListAction,
    getTopicDetailAction
}