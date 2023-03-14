import requestService from "../services/requestService";
import { RequestQuery } from "../shared/queryInterface/requestQuery";

const getRequestListAction = (queryData: RequestQuery) => (dispatch: any) =>{
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

const putApproveARequestAction = (_id: string) => (dispatch: any) => {
    return requestService.putApproveARequestService(_id).then(
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
    deleteRemoveARequestAction,
    putApproveARequestAction
}