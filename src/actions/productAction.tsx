import productService from "../services/productService"

const postAddAProductAction = (product: FormData) => (dispatch: any) =>{
    return productService.postAddAProductService(product).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

const getAProductAction = (_id: string) => (dispatch: any) => {
    return productService.getAProductService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

const getAProductByTopicIdAction = (topicId: string) => (dispatch: any) => {
    return productService.getAProductByTopicIdService(topicId).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

const putUpdateAProductAction = (product: FormData, _id: string) => (dispatch: any) => {
    return productService.putUpdateAProductService(product, _id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

const deleteRemoveAProductAction = (_id: string) => (dispatch: any) => {
    return productService.deleteRemoveAProductService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

export {
    postAddAProductAction,
    getAProductAction,
    getAProductByTopicIdAction,
    putUpdateAProductAction,
    deleteRemoveAProductAction
}

