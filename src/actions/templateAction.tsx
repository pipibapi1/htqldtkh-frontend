import templateService from "../services/templateService";
import { TemplateQuery, TemplateWithPaperQuery } from "../shared/queryInterface/templateQuery";

const getTemplatesAction = (queryData: TemplateQuery) => (dispatch: any) =>{
    return templateService.getTemplatesService(queryData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const getTemplatesWithPapersAction = (topicId: string, queryData: TemplateWithPaperQuery) => (dispatch: any) =>{
    return templateService.getTemplatesWithPapersService(topicId, queryData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const putUpdateATemplateAction = (updateInfo: any) => (dispatch: any) => {
    return templateService.putUpdateATemplateService(updateInfo).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const deleteRemoveATemplateAction = (_id: string) => (dispatch: any) => {
    return templateService.deleteRemoveATemplateService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const postAddATemplateAction = (template: FormData) => (dispatch: any) => {
    return templateService.postAddATemplateService(template).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

export {
    getTemplatesAction,
    getTemplatesWithPapersAction,
    putUpdateATemplateAction,
    deleteRemoveATemplateAction,
    postAddATemplateAction
}