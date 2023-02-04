import expenseService from "../services/expenseService";

interface Query{
    period: string;
}

const getExpenseDetailByPeriodAction = (queryData: Query) => (dispatch: any) =>{
    return expenseService.getExpenseDetailByPeriodService(queryData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

export {
    getExpenseDetailByPeriodAction
}