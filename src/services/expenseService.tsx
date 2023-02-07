import axios from "axios";
import authHeader from "./authHeader";

const EXPENSE_API_URL = process.env.REACT_APP_API_URL + "/api/expense";

interface Query{
    period: string;
}

const getExpenseDetailByPeriodService = (queryData: Query) => {
    const {period} = queryData;
    return axios.get(EXPENSE_API_URL + '/findByPeriod/' + period, { headers: authHeader() })
                .then((response) => {
                    return response.data
                })
}

export default{
    getExpenseDetailByPeriodService
}