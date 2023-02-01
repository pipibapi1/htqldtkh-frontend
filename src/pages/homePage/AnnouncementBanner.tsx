import { appRouters } from '../../shared/urlResources';
import {Link} from "react-router-dom";
import AnnouncementImage from "../../assets/images/ThongBao.png";

interface OldAnnouncement{
    _id: string;
  title: string;
  fileType: string;
  fileName: string;
  createAt: Date;
  content: string;
}

const AnnouncementBanner = ({SmallAnnouncement}: {SmallAnnouncement: OldAnnouncement}) => {
    const {_id,title} = SmallAnnouncement
    return (
    <Link to={`/${appRouters.LINK_TO_OLD_ANNOUNCEMENT_PAGE}` + `/${_id}`} >

        <div className = 'border border-3 rounded-lg static overflow-hidden '>
            <img src={AnnouncementImage} className= 'mx-4 my-4 w-11/12  '/>
            <div className= 'p-4 text-center'>{title}</div>
        </div>
    </Link>
    )
}

export default AnnouncementBanner