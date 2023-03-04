import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import {Link} from "react-router-dom";
import { appRouters } from '../../shared/urlResources';
import { useSelector } from "react-redux";
import { RootState} from '../../store';
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack5';
import {useState} from 'react'
import {
  useParams
} from "react-router-dom";


const Home: React.FC = (props: any) => {
  let { announcementId} = useParams();
  const file = process.env.REACT_APP_API_URL + "/api/announcement" + `/${announcementId}/file`;
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

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

  const downloadPaperFile = (_id: string | undefined, fileName: string | undefined) => {
    if(_id && fileName){
        const url = process.env.REACT_APP_API_URL + "/api/announcement" + "/" + _id + "/download";
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }
    else{
        console.log("SOMETHING WRONG!!!!")
    }
}


    return (
        <div className=''>
        <Header isLogin={isLoggedIn} isAccountServicePage={false}/>
        <div className= 'm-10 grid grid-cols-1 justify-items-start px-5'>      
        <Link to={`/${appRouters.LINK_TO_HOME_PAGE}`}>
            <div className="bg-[#0079CC] text-xs transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
            TRỞ VỀ TRANG CHỦ
            </div>
        </Link>  
        </div>
        
    
        <Document file ={file} onLoadSuccess={onDocumentLoadSuccess} className = ' border border-3 rounded-lg py-5 px-5 mx-28 my-10 flex flex-col justify-center items-center'>
            <Page width = {1200}  pageNumber={pageNumber} renderTextLayer = {false} renderAnnotationLayer = {false} />
            <p className = 'text-center'> Page {pageNumber} of {numPages}</p>

          { pageNumber > 1 && 
              <button onClick={changePageBack} className="bg-[#0079CC] text-xs  transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">Previous Page</button>
          }
          {
            pageNumber < numPages! &&
            <button onClick={changePageNext} className="bg-[#0079CC] text-xs transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">Next Page</button>
          }
        <div className="flex items-center justify-center w-full">
          <div className='w-full flex justify-end text-xl text-[#0079CC] font-bold hover:underline hover:cursor-pointer'
          onClick={(e) => {
            e.preventDefault();
            downloadPaperFile(announcementId, "randomname");
          }}
          >
            Tải tài liệu
          </div>
        </div>
        </Document>  

    
            <Footer/>
        </div>
    );
}

export default Home;