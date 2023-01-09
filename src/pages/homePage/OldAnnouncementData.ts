import AnnouncementImage from "../../assets/images/ThongBao.png";


export interface OldAnnouncement{
    src: string;
    title: string;
}

export const OldAnnouncementData: OldAnnouncement[] = [
    {
        src: AnnouncementImage, title: 'THÔNG BÁO VỀ ĐIỀU KIỆN ĐĂNG KÝ ĐỀ TÀI NĂM 2021 - ĐỢT 2'
    },
    {
        src: AnnouncementImage, title: 'THÔNG BÁO VỀ ĐIỀU KIỆN ĐĂNG KÝ ĐỀ TÀI NĂM 2021 - ĐỢT 1'
    },
    {
        src: AnnouncementImage, title: 'THÔNG BÁO VỀ ĐIỀU KIỆN ĐĂNG KÝ ĐỀ TÀI NĂM 2020 - ĐỢT 2'
    }
]