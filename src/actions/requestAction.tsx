import { RequestType } from "../shared/types/requestType";
import { RequestStatus } from "../shared/types/requestStatus";
import requestService from "../services/requestService";

interface Query{
    page: string;
    limit: string;
    period: string;
    type: RequestType | "";
    status: RequestStatus | "";
}

const getRequestListAction = (queryData: Query) => (dispatch: any) =>{
    return requestService.getRequestListService(queryData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

export {
    getRequestListAction
}