import {OldAnnouncement} from "./OldAnnouncementData";

const AnnouncementBanner = ({SmallAnnouncement}: {SmallAnnouncement: OldAnnouncement}) => {
    const {src, title} = SmallAnnouncement
    return <div className = 'border border-3 rounded-lg static overflow-hidden '>
        <img src={src} className= 'mx-4 my-4 w-11/12  '/>
        <div className= 'p-4 text-center'>{title}</div>
    </div>
}

export default AnnouncementBanner