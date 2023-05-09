import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { pdfjs } from 'react-pdf';
import { useSelector } from "react-redux";

import { appRouters } from '../../shared/urlResources';
import { RootState } from '../../store';

import Footer from '../../components/footer';
import Header from '../../components/header';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const url = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = url;

const OldAnnouncementFull: React.FC = () => {

  const { announcementId } = useParams();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const file = process.env.REACT_APP_API_URL + "/api/announcement" + `/${announcementId}/file`;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
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
    if (_id && fileName) {
      const url = process.env.REACT_APP_API_URL + "/api/announcement" + "/" + _id + "/download";
      const aTag = document.createElement('a');
      aTag.href = url;
      aTag.setAttribute("download", fileName);
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    }
    else {
      console.log("SOMETHING WRONG!!!!")
    }
  }


  return (
    <div className=''>

      <Header isLogin={isLoggedIn} isAccountServicePage={false} />
      <div className='m-10 grid grid-cols-1 justify-items-start px-5'>
        <Link to={`/${appRouters.LINK_TO_HOME_PAGE}`}>
          <div className="bg-[#0079CC] text-xs transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
            TRỞ VỀ TRANG CHỦ
          </div>
        </Link>
      </div>


      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className=' border border-3 rounded-lg py-5 px-5 mx-28 my-10 flex flex-col justify-center items-center'>
        <Page width={1200} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        <p className='text-center'> Page {pageNumber} of {numPages}</p>

        {pageNumber > 1 &&
          <button onClick={changePageBack} className="bg-[#0079CC] text-xs  transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">Previous Page</button>}

        {pageNumber < numPages! &&
          <button onClick={changePageNext} className="bg-[#0079CC] text-xs transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">Next Page</button>}

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

      <Footer />

    </div>
  );
}

export default OldAnnouncementFull;