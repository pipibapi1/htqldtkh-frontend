import statisticService from "../services/statisticService"

const getExpenseStatisticAction = (timeRange: any) => (dispatch: any) => {
    return statisticService.getExpenseStatisticService(timeRange).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

export{
    getExpenseStatisticAction
}