import axios from "axios";
import authHeader from "./authHeader";

const TEMPLATE_API_URL = process.env.REACT_APP_API_URL + "/api/template";

const getTemplatesService = (queryData: any) => {
    const {forStudent} = queryData;
    const queryString = '?' + (forStudent !== undefined ? `forStudent=${forStudent}&` : "") ;

    return axios
        .get(TEMPLATE_API_URL + queryString, {headers: authHeader()})
        .then((response) => {
            return response.data
        })
}

const postAddATemplateService = (template: FormData) => {
    let headers: any = authHeader();
    headers = {
        ... headers,
        'Content-Type': 'multipart/form-data'
    }
    return axios
        .post(TEMPLATE_API_URL, template, {
            headers: headers
        })
        .then((response) => {
            return response.data
        })
}

const deleteRemoveATemplateService = (_id: string) => {
    return axios
        .delete(TEMPLATE_API_URL + '/' + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const getTemplatesWithPapersService = (queryData: any) => {
    const {topicId, forStudent}  = queryData;
    const queryString = '?' + (forStudent !== undefined ? `forStudent=${forStudent}&` : "") ;

    return axios
        .get(TEMPLATE_API_URL + '/' + 'withPapers' + '/' + topicId +queryString, {headers: authHeader()})
        .then((response) => {
            return response.data
        })
}

export default{
    getTemplatesService,
    getTemplatesWithPapersService,
    deleteRemoveATemplateService,
    postAddATemplateService
}