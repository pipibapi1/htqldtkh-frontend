import formService from "../services/formService"

const postAddAFormAction = (form: FormData) => (dispatch: any) => {
    return formService.postAddAFormService(form).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

const getAFormAction = (_id: string) => (dispatch: any) => {
    return formService.getAFormService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error);
        }
    )
}

const putUpdateAFormAction = (updateInfo: any) => (dispatch: any) => {
    return formService.putUpdateAFormService(updateInfo).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error);
        }
    )
}

const deleteRemoveAFormAction = (_id: string) => (dispatch: any) => {
    return formService.deleteRemoveAFormService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error);
        }
    )
}

export{
    postAddAFormAction,
    getAFormAction,
    putUpdateAFormAction,
    deleteRemoveAFormAction
}