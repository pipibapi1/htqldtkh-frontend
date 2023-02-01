import announcementService from "../services/announcementService";

interface Query{
    page: string;
    limit: string;
}

const getAnnouncementsAction = (queryData: Query) => (dispatch: any) => {
    return announcementService.getAnnouncementsService(queryData).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) =>{
            return Promise.reject(error);
        }
    )
}

const getAnnouncementFileAction = (_id: string) => (dispatch: any) => {
    return announcementService.getAnnouncementFileService(_id).then(
        (data) => {
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

export {
    getAnnouncementsAction,
    getAnnouncementFileAction
}