import studentService from "../services/studentService";
import { GenderType } from "../shared/types/gender";
import { EducationType } from "../shared/types/educationType";

interface NewInfoInput{
    _id: string;
    name: string;
    studentId: string;
    gender: GenderType;
    birthDate: Date;
    educationType: EducationType;
    email: string;
    phoneNumber: string;
    image: string;
}

const updateStudentPersonalInfoAction = (newInfoData: NewInfoInput) => (dispatch: any) => {
    return studentService.updateStudentPersonalInfoService(newInfoData).then(
        (data) => {
            return Promise.resolve();
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

export {
    updateStudentPersonalInfoAction
}