import sendEmailService from "../services/sendEmailService"

const sendEmailAction = (email: FormData) => (dispatch: any) => {
    return sendEmailService.sendEmailService(email).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

export{
    sendEmailAction
}