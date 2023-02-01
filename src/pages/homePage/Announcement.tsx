import OldAnnouncement from './OldAnnouncement';
import { appRouters } from '../../shared/urlResources';
import {Link} from "react-router-dom";
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack5';
import {useState} from 'react'

interface AnnouncementType{
  _id: string;
  title: string;
  fileType: string;
  fileName: string;
  createAt: Date;
  content: string;
}

  const Announcement = ({image, announcements, _id}: {image: string, announcements: AnnouncementType[], _id:string}) => {

    const oldAnnouncements = announcements.slice(1);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({numPages}: {numPages: any}) => {
      setNumPages(numPages);
      setPageNumber(1);
    }
  
    const changePage = (offSet: number) => {
      setPageNumber(prevPageNumber => prevPageNumber + offSet);
    }
  
    const changePageBack = () => {
      changePage(-1);
    }
  
    const changePageNext = () => {
      changePage(+1);
    }
    
    return (
      <div className= 'grid grid-cols-3'>
        <main className = 'px-12 py-6 border-r col-span-2'>
          <Link to={`/${appRouters.LINK_TO_OLD_ANNOUNCEMENT_PAGE}` + `/${_id}`}>
          <div className = 'py-4 text-blue-600 font-semibold'>THÔNG BÁO MỚI NHẤT</div>
          </Link>

          <Document file ={image} onLoadSuccess={onDocumentLoadSuccess} className = 'border border-3 rounded-lg py-5 px-1 m-1 flex flex-col justify-center items-center'>
            <Page width = {900}  pageNumber={pageNumber} renderTextLayer = {false} renderAnnotationLayer = {false} />
            <p className = 'text-center'> Page {pageNumber} of {numPages}</p>

          { pageNumber > 1 && 
              <button onClick={changePageBack} className="bg-[#0079CC] text-xs  transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">Previous Page</button>
          }
          {
            pageNumber < numPages! &&
            <button onClick={changePageNext} className="bg-[#0079CC] text-xs transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">Next Page</button>
          }
          </Document>
        </main>

        <OldAnnouncement oldAnnouncements={oldAnnouncements}/>

      </div>
    );
  };
  
  export default Announcement;