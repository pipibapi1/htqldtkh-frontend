import axios from "axios";
import authHeader from "./authHeader";

const EXPENSE_API_URL = process.env.REACT_APP_API_URL + "/api/expense";

interface Query{
    period: string;
}

interface Expense{
    _id?: string;
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

const getExpenseDetailByPeriodService = (queryData: Query) => {
    const {period} = queryData;
    return axios.get(EXPENSE_API_URL + '/findByPeriod/' + period, { headers: authHeader() })
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