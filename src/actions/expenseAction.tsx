import expenseService from "../services/expenseService";

interface Query{
    period: string;
}

interface Expense{
    _id: string;
    createAt: string;
    lastModified: string;
    note: string;
    generalExpense: number;
    period: string;
    totalExpense: number;
    allocated:{
        type: string;
        totalExpense: number;
        maxExpensePerTopic: number;
    }[]
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

const postNewExpenseAction = (expense: Expense, periodId: string) => (dispatch: any) =>{
    return expenseService.postNewExpense(expense, periodId).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const updateExpenseAction = (expense: Expense, expenseId: string) => (dispatch: any) =>{
    return expenseService.updateExpense(expense, expenseId).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

export {
    getExpenseDetailByPeriodAction,
    postNewExpenseAction,
    updateExpenseAction
}