import announcementService from "../services/announcementService";
import { AnnouncementQuery } from "../shared/queryInterface/announcementQuery";

const getAnnouncementsAction = (queryData: AnnouncementQuery) => (dispatch: any) => {
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

const postAddAnAnnouncementAction = (announcement: FormData) => (dispatch: any) => {
    return announcementService.postAddAnAnnouncementService(announcement).then(
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
    getAnnouncementFileAction,
    postAddAnAnnouncementAction
}