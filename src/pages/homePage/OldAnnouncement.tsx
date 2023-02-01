import { OldAnnouncementData } from './OldAnnouncementData';
import AnnouncementBanner from './AnnouncementBanner';

interface AnnouncementType{
  _id: string;
  title: string;
  fileType: string;
  fileName: string;
  createAt: Date;
  content: string;
}

const OldAnnouncement = ({oldAnnouncements}: {oldAnnouncements: AnnouncementType[]}) => {
    return (
      <div className = "col-span-1">
        <div className = 'px-4 py-6 mx-4 justify-between items-center'>
          <div className = 'py-4 text-blue-600 font-semibold'>MỘT SỐ THÔNG BÁO ĐỢT TRƯỚC</div>

          <div className = 'grid gap-10 mb-12'> 
            {oldAnnouncements.map((SmallAnnouncement, index) => 
              (
                <AnnouncementBanner key={index} SmallAnnouncement={SmallAnnouncement} />
              )
              )
            }

          </div>
        </div>
      </div>
    );
  };
  
  export default OldAnnouncement;