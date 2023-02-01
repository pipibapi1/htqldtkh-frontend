import fsService from "../services/fsService";
import { GenderType } from "../shared/types/gender";

interface NewInfoInput{
    _id: string;
    name: string;
    gender: GenderType;
    birthDate: Date;
    email: string;
    phoneNumber: string;
    image: string;
}

const updateFsPersonalInfoAction = (newInfoData: NewInfoInput) => (dispatch: any) => {
    return fsService.updateFsPersonalInfoService(newInfoData).then(
        (data) => {
            return Promise.resolve();
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

export {
    updateFsPersonalInfoAction
}