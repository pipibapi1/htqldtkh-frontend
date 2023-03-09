import studentService from "../services/studentService";
import { StudentQuery } from "../shared/queryInterface/studentQuery";

const getStudentListAction = (query: StudentQuery) => (dispatch: any) => {
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