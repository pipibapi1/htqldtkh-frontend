import fvdService from "../services/fvdService";
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

const updateFvdPersonalInfoAction = (newInfoData: NewInfoInput) => (dispatch: any) => {
    return fvdService.updateFvdPersonalInfoService(newInfoData).then(
        (data) => {
            return Promise.resolve();
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

export {
    updateFvdPersonalInfoAction
}