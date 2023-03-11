import axios from "axios";
import { Expense } from "../shared/interfaces/expenseInterface";
import authHeader from "./authHeader";

const EXPENSE_API_URL = process.env.REACT_APP_API_URL + "/api/expense";

const getExpenseDetailByPeriodService = (periodId: string) => {
    return axios.get(EXPENSE_API_URL + '/findByPeriod/' + periodId, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const postNewExpense = (expense: Expense, periodId: string) => {
    expense.period = periodId;
    delete expense._id;
    return axios.post(EXPENSE_API_URL, {expense: expense}, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const updateExpense = (expense: Expense, expenseId: string) => {
    return axios.put(EXPENSE_API_URL + `/${expenseId}`, {expense: expense}, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    getExpenseDetailByPeriodService,
    postNewExpense,
    updateExpense
}