import staffService from "../services/staffService"

const getAllStaffsAction = () => (dispatch: any) => {
    return staffService.getAllStaffsService().then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )

}

export{
    getAllStaffsAction
}