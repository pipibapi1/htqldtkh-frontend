import studentService from "../services/studentService";
import { GenderType } from "../shared/types/gender";
import { EducationType } from "../shared/types/educationType";


interface Query{
    page: string;
    limit: string;
    name: string;
    email: string;
    phoneNumber: string;
    status: string;
    eduType: string;
}

const getStudentListAction = (query: Query) => (dispatch: any) => {
    return studentService.getStudentListService(query).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const updateStudentPersonalInfoAction = (newInfoData: any) => (dispatch: any) => {
    return studentService.updateStudentPersonalInfoService(newInfoData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

const deleteAStudentAction = (_id: string) => (dispatch: any) => {
    return studentService.deleteAStudentService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
              return Promise.reject(error);
        }
    )
}

export {
    getStudentListAction,
    updateStudentPersonalInfoAction,
    deleteAStudentAction
}