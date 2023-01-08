import {OldAnnouncement} from "./OldAnnouncementData";

const AnnouncementBanner = ({SmallAnnouncement}: {SmallAnnouncement: OldAnnouncement}) => {
    const {src, title} = SmallAnnouncement
    return <div className = 'border border-slate-900 static overflow-hidden '>
        <img src={src} className= 'mx-4 my-4 w-11/12  mx border border-blue-700 rounded-md'/>
        <div className= 'p-4 text-center'>{title}</div>
    </div>
}

export default AnnouncementBanner