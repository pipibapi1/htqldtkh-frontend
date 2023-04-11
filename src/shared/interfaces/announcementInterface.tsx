export interface AnnouncementType {
  _id: string,
  title: string,
  fileType?: string,
  fileName?: string,
  createAt?: Date,
  content: string,
}

export interface OldAnnouncement{
  _id: string,
  title: string,
  fileType?: string,
  fileName?: string,
  createAt?: Date,
  content: string,
}