import periodService from "../services/periodService"

const getAllPeriodsAction = () => (dispatch: any) => {
    return periodService.getAllPeriodsService().then(
        (data) => {
            return Promise.resolve(data)
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

export {
    getAllPeriodsAction
}