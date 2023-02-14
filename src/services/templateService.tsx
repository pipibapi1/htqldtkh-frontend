import axios from "axios";
import authHeader from "./authHeader";

const TEMPLATE_API_URL = process.env.REACT_APP_API_URL + "/api/template";

const getTemplatesService = (queryData: any) => {
    const {forStudent} = queryData;
    const queryString = '?' + (forStudent !== undefined ? `forStudent=${forStudent}&` : "") ;

    return axios.
        get(TEMPLATE_API_URL + queryString, {headers: authHeader()})
        .then((response) => {
            return response.data
        })
}


export default{
    getTemplatesService
}