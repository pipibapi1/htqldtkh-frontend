import periodService from "../services/periodService"
import { PeriodQuery } from "../shared/queryInterface/periodQuery"

const getAllPeriodsAction = (query: PeriodQuery) => (dispatch: any) => {
    return periodService.getAllPeriodsService(query).then(
        (data) => {
            return Promise.resolve(data)
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

const postAddAPeriodAction = (newPeriod: any) => (dispatch: any) => {
    return periodService.postAddAPeriodService(newPeriod).then(
        (data) => {
            return Promise.resolve(data)
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

const putUpdateAPeriodAction = (updateInfo: any) => (dispatch: any) => {
    return periodService.putUpdateAPeriodService(updateInfo).then(
        (data) => {
            return Promise.resolve(data)
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

export {
    getAllPeriodsAction,
    postAddAPeriodAction,
    putUpdateAPeriodAction
}