import AnnouncementBanner from './AnnouncementBanner';
import {useState, useEffect} from 'react';

interface AnnouncementType{
  _id: string;
  title: string;
  fileType: string;
  fileName: string;
  createAt: Date;
  content: string;
}

const OldAnnouncement = ({oldAnnouncements, currentPeriodValue, year}: {oldAnnouncements: AnnouncementType[], currentPeriodValue: string|undefined, year: Date}) => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>(oldAnnouncements)
  const [searchText, setSearchText] = useState<string>("");
  const [displayMode, setDisplayMode] = useState<boolean>(false);
  const searchAnnouncement = (text: string) => {
    if(text === "") {
      setAnnouncements(oldAnnouncements)
    }
    else{
      setAnnouncements(oldAnnouncements.filter(
        (announcement) => announcement.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      ))
    }
  }

  useEffect(() => {
    setAnnouncements(oldAnnouncements);
    setSearchText("");
    setDisplayMode(false);
  }, [oldAnnouncements]);

    return (
      <div className = "col-span-1">
        <div className = 'px-4 py-6 mx-4 justify-between items-center'>
          {oldAnnouncements.length > 0 && <div className = 'py-4 text-blue-600 font-semibold'>CÁC THÔNG BÁO CỦA {currentPeriodValue!== "" ?"ĐỢT " + currentPeriodValue : "NĂM " + year.getFullYear()}</div>}
          {oldAnnouncements.length === 0 && <div className = 'py-4 text-blue-600 font-semibold'>KHÔNG CÓ THÔNG BÁO</div>}
          <div className='mb-4 flex items-center'>
            <input type="text" placeholder={"Tìm kiếm bằng văn bản"} className='border-2 px-2 rounded-[5px] h-10'
            value={searchText}
            onChange={(e:any) => {
              e.preventDefault();
              setSearchText(e.target.value)
            }}
            />
            <div className='ml-2 font-semibold hover:underline hover:cursor-pointer'
            onClick={(e:any) => {
              e.preventDefault();
              setDisplayMode(true);
              searchAnnouncement(searchText);
            }}
            >
              Tìm kiếm
            </div>
          </div>
          <div className = 'grid gap-10 mb-12'> 
            {displayMode ? announcements.map((SmallAnnouncement, index) => 
              (
                <AnnouncementBanner key={index} SmallAnnouncement={SmallAnnouncement} />
              )
              )
              :
              oldAnnouncements.map((SmallAnnouncement, index) => 
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