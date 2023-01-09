import React, { useState, useRef } from 'react';
import {Link} from "react-router-dom";
import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';

const RECORD_PER_PAGE = 5;
const TOTAL_PAGE_DEFAULT = 1;

const MyTopicList: React.FC = () => {

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
        <div className='p-4 overflow-y-auto'>
            <div className='grid justify-items-end px-5'>
                <Link to={'/registerTopic'} className="">
                    <div className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                    Nhập đề tài mới
                    </div>
                </Link>
            </div>

            <div className='flex grid justify-items-end px-5'>
                <div className='flex items-center py-4'>
                    <div className='flex items-center mr-20'>
                        <div className='mr-5'>
                            Loại đề tài: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                <option value="">Chính quy</option>
                                <option value="">Chất lượng cao</option>
                                <option value="">Chất lượng cao (LVTN)</option>
                                <option value="">Kỹ sư tài năng</option>
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
                                <option value="">Tạo mới</option>
                                <option value="">Đang thực hiện</option>
                                <option value="">...</option>
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
                                        Mã đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Tên đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Loại đề tài
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
                                        Gia hạn
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
                                        Thời gian
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Đợt
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
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
                                    topicId={"KH1890-MX201-MM55"}
                                    topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                    topicType={"Chính quy"}
                                    topicStatus={"Đang thực hiện"}
                                    topicExtensionStatus={"topic Extension Status"}
                                    createdDate={"createdDate"}
                                    time={"time"}
                                    period={"period"}
                                    />
                                    <RowTable
                                    index={2}
                                    topicId={"KH1890-MX201-MM55"}
                                    topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                    topicType={"Chính quy"}
                                    topicStatus={"Đang thực hiện"}
                                    topicExtensionStatus={"topic Extension Status"}
                                    createdDate={"createdDate"}
                                    time={"time"}
                                    period={"period"}
                                    />
                                    <RowTable
                                    index={3}
                                    topicId={"KH1890-MX201-MM55"}
                                    topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                    topicType={"Chính quy"}
                                    topicStatus={"Đang thực hiện"}
                                    topicExtensionStatus={"topic Extension Status"}
                                    createdDate={"createdDate"}
                                    time={"time"}
                                    period={"period"}
                                    />
                                    <RowTable
                                    index={4}
                                    topicId={"KH1890-MX201-MM55"}
                                    topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                    topicType={"Chính quy"}
                                    topicStatus={"Đang thực hiện"}
                                    topicExtensionStatus={"topic Extension Status"}
                                    createdDate={"createdDate"}
                                    time={"time"}
                                    period={"period"}
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
    )
}

export default MyTopicList;