import expenseService from "../services/expenseService";
import { Expense } from "../shared/interfaces/expenseInterface";

const getExpenseDetailByPeriodAction = (periodId: string) => (dispatch: any) =>{
    return expenseService.getExpenseDetailByPeriodService(periodId).then(
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