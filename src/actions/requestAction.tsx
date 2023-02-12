import requestService from "../services/requestService";


const getRequestListAction = (queryData: any) => (dispatch: any) =>{
    return requestService.getRequestListService(queryData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const putUpdateARequestAction = (updateInfo: any) => (dispatch: any) => {
    return requestService.putUpdateARequestService(updateInfo).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const postAddARequestAction = (newRequest: any) => (dispatch: any) => {
    return requestService.postAddARequestService(newRequest).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const deleteRemoveARequestAction = (_id: string) => (dispatch: any) => {
    return requestService.deleteRemoveARequestService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

export {
    getRequestListAction,
    putUpdateARequestAction,
    postAddARequestAction,
    deleteRemoveARequestAction
}