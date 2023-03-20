import resultAndFeedbackService from "../services/resultAndFeedbackService";


const resultAndFeedbackAction = (email: FormData) => (dispatch: any) => {
    return resultAndFeedbackService.resultAndFeedbackService(email).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

export{
    resultAndFeedbackAction
}