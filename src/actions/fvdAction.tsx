import fvdService from "../services/fvdService";

const getFvdListAction = (queryData: any) => (dispatch: any) => {
    return fvdService.getFvdListService(queryData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

const addAFvdAction = (info: any) => (dispatch: any) => {
    return fvdService.addAFvdService(info).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

const updateFvdPersonalInfoAction = (newInfoData: any) => (dispatch: any) => {
    return fvdService.updateFvdPersonalInfoService(newInfoData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

const deleteAFvdAction = (_id: string) => (dispatch: any) => {
    return fvdService.deleteAFvdService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

export {
    getFvdListAction,
    addAFvdAction,
    updateFvdPersonalInfoAction,
    deleteAFvdAction
}