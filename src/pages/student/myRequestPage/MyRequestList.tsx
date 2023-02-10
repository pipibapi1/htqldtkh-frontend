import React, { useState, useRef, Fragment } from 'react';
import {Link} from "react-router-dom";
import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';
import Modal from "./Modal";

const RECORD_PER_PAGE = 5;
const TOTAL_PAGE_DEFAULT = 1;

const MyRequestList: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(TOTAL_PAGE_DEFAULT);
    const totalPage = useRef(TOTAL_PAGE_DEFAULT);

    const prevPage = () => {
        if (currentPage <= 1) return;
        setCurrentPage(currentPage - 1);
      };
      const nextPage = () => {
        if (currentPage >= totalPage.current) return;
        setCurrentPage(currentPage + 1);
      }; 

    return(
    <div>
        <div className='p-4 overflow-y-auto'>
            <div className='grid justify-items-end px-5'>
                <div className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                    onClick={(e:any) => {
                        e.preventDefault();
                        setShowModal(true);
                    }}
                >
                    Tạo yêu cầu
                </div>
  
            </div>

            <div className='grid justify-items-end px-5'>
                <div className='flex items-center py-4'>
                    <div className='flex items-center mr-20'>
                        <div className='mr-5'>
                            Loại yêu cầu: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                <option value="">Xin giấy chứng nhận</option>
                                <option value="">Gia hạn đề tài</option>
                                <option value="">Hủy đề tài</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <div className='mr-5'>
                            Trạng thái: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                <option value="">Chờ xét duyệt</option>
                                <option value="">Đã duyệt</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full'>
                <div className='flex flex-col'>
                    <div className=''>
                        <div className='inline-block w-full pr-5'>
                        <div className=''>
                            <table className='w-full table-fixed border-separate border-spacing-y-1 border-2'>
                                <thead className='bg-[#1577D2] border-b'>
                                    <tr>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Mã yêu cầu
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Loại yêu cầu
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Trạng thái
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Mã đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Ngày tạo
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Thông tin bổ sung
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    <RowTable
                                    index={1}
                                    requestId={"RQ1890-TH00-MM55"}
                                    requestType={"Xin giấy chứng nhận"}
                                    requestStatus={"Chờ xét duyệt"}
                                    createdDate={"date"}
                                    additionalInfor={""}
                                    topicId={"KH1890-MX201-MM55"}
                                    />

                                    <RowTable
                                    index={2}
                                    requestId={"RQ1890-TH00-MM55"}
                                    requestType={"Gia hạn đề tài"}
                                    requestStatus={"Đã duyệt"}
                                    createdDate={"date"}
                                    additionalInfor={"Thời gian gia hạn: 6 tháng"}
                                    topicId={"KH1890-MX201-MM55"}
                                    />

                                    <RowTable
                                    index={3}
                                    requestId={"RQ1890-TH00-MM55"}
                                    requestType={"Hủy đề tài"}
                                    requestStatus={"Chờ xét duyệt"}
                                    createdDate={"date"}
                                    additionalInfor={""}
                                    topicId={"KH1890-MX201-MM55"}
                                    />
    
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid justify-items-end px-5'>
                        <ul className='inline-flex items-center -space-x-px'>
                            <LeftTag onClick={prevPage} />
                            {Array.from(Array(totalPage.current).keys()).map((index) => (
                                <PaginationTag
                                key={index}
                                numPage={index + 1}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                />
                            ))}
                            <RightTag onClick={nextPage} />
                        </ul>
                </div>
        </div>
        <Modal isVisible = {showModal} onClose = {() => setShowModal(false)}/>
    </div>
    )
}

export default MyRequestList;