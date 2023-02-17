import axios from "axios";
import authHeader from "./authHeader";

const PRODUCT_API_URL = process.env.REACT_APP_API_URL + "/api/product";

const postAddAProductService = (product: FormData) => {
    let headers: any = authHeader();
    headers = {
        ... headers,
        'Content-Type': 'multipart/form-data'
    }

    return axios.
        post(PRODUCT_API_URL, product, { 
            headers: headers
        })
        .then((response) => {
            return response.data
        })
}

const getAProductService = (_id: string) => {
    return axios
        .get(PRODUCT_API_URL + '/' + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const getAProductByTopicIdService = (topicId: string) => {
    return axios
        .get(PRODUCT_API_URL + '/'+ "getByTopicId" + "/" +  topicId, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

const putUpdateAProductService = (product: FormData, _id: string) => {
    let headers: any = authHeader();
    headers = {
        ... headers,
        'Content-Type': 'multipart/form-data'
    }

    return axios.
        put(PRODUCT_API_URL + "/" + _id, product, { 
            headers: headers
        })
        .then((response) => {
            return response.data
        })
}

const deleteRemoveAProductService = (_id: string) => {
    return axios
        .delete(PRODUCT_API_URL + '/' + _id, { headers: authHeader() })
        .then((response) => {
            return response.data
        })
}

export default{
    postAddAProductService,
    putUpdateAProductService,
    getAProductService,
    getAProductByTopicIdService,
    deleteRemoveAProductService
}