import { OldAnnouncementData } from './OldAnnouncementData';
import AnnouncementBanner from './AnnouncementBanner';

const OldAnnouncement = () => {
    return (
      <div className = "col-span-1">
      <div className = 'px-4 py-6 mx-4 justify-between items-center'>
      <div className = 'py-4 text-blue-600 font-semibold'>MỘT SỐ THÔNG BÁO ĐỢT TRƯỚC</div>

      <div className = 'grid gap-10 mb-12'> 
        {OldAnnouncementData.map((SmallAnnouncement, index) => 
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