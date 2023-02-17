import paperService from "../services/paperService";

const postAddAPaperAction = (paper: FormData) => (dispatch: any) => {
    return paperService.postAddAPaperService(paper).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

const putUpdateAPaperAction = (paper: FormData) => (dispatch: any) => {
    return paperService.putUpdateAPaperService(paper).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

const deleteRemoveAPaperAction = (_id: string) => (dispatch: any) => {
    return paperService.deleteRemoveAPaperService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

export{
    postAddAPaperAction,
    putUpdateAPaperAction,
    deleteRemoveAPaperAction
}
