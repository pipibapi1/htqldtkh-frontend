import fsService from "../services/fsService";
import { FsNewInfoInput } from "../shared/interfaces/fsInterface";

const updateFsPersonalInfoAction = (newInfoData: FsNewInfoInput) => (dispatch: any) => {
    return fsService.updateFsPersonalInfoService(newInfoData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

export {
    updateFsPersonalInfoAction
}