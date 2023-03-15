export interface NotificationIntf {
    _id: string,
    author: string,
    subject: string,
    content: string,
    createAt: string,
    redirect?: string,
    isRead: boolean
}