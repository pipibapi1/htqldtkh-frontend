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


export {
    getTemplatesAction
}