import studentService from "../services/studentService";
import { GenderType } from "../shared/types/gender";
import { EducationType } from "../shared/types/educationType";

interface NewInfoInput{
    fmName: string;
    name: string;
    studentId: string;
    gender: GenderType;
    birthDate: Date;
    educationType: EducationType;
    email: string;
    phoneNumber: string;
    image: string;
}

const updatePersonalInfoAction = (newInfoData: NewInfoInput) => (dispatch: any) => {
    return studentService.updatePersonalInfoService(newInfoData).then(
        (data) => {
            return Promise.resolve();
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

export {
    updatePersonalInfoAction
}