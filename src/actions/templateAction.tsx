import templateService from "../services/templateService";

const getTemplatesAction = (queryData: any) => (dispatch: any) =>{
    return templateService.getTemplatesService(queryData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const getTemplatesWithPapersAction = (queryData: any) => (dispatch: any) =>{
    return templateService.getTemplatesWithPapersService(queryData).then(
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
    deleteRemoveATemplateAction,
    postAddATemplateAction
}