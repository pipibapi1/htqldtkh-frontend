import React, { useState, useRef } from 'react';
import {Link} from "react-router-dom";
import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';

const RECORD_PER_PAGE = 5;
const TOTAL_PAGE_DEFAULT = 1;

const RequestList: React.FC = () => {

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
                <div className='flex items-center py-4'>
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
                                <option value="">Toàn bộ</option>
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
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Mã tài khoản
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Họ và Tên
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Tên đăng nhập
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Mật khẩu
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Vai trò
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Trạng thái
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Ngày tạo
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    <RowTable
                                    index={1}
                                    accountId={"RQ1890-TH00-MM55"}
                                    fullName={"Trần Anh Quân"}
                                    accountName={"quan123"}
                                    password={"123456"}
                                    role={"Sinh Viên"}
                                    createdDate={"date"}
                                    accountStatus={"Chờ xét duyệt"}
                                    />
                                    <RowTable
                                    index={2}
                                    accountId={"RQ1890-TH00-MM55"}
                                    fullName={"Trương Anh Khoa"}
                                    accountName={"khoa123"}
                                    password={"123456"}
                                    role={"Sinh Viên"}
                                    createdDate={"date"}
                                    accountStatus={"Đã duyệt"}
                                    />
                                    <RowTable
                                    index={3}
                                    accountId={"RQ1890-TH00-MM55"}
                                    fullName={"Phạm Minh Duy"}
                                    accountName={"duy123"}
                                    password={"123456"}
                                    role={"Sinh Viên"}
                                    createdDate={"date"}
                                    accountStatus={"Chờ xét duyệt"}
                                    />
                                    <RowTable
                                    index={4}
                                    accountId={"RQ1890-TH00-MM55"}
                                    fullName={"Trương Anh Khoa"}
                                    accountName={"khoa456"}
                                    password={"123456"}
                                    role={"Sinh Viên"}
                                    createdDate={"date"}
                                    accountStatus={"Chờ xét duyệt"}
                                    />
                                    <RowTable
                                    index={5}
                                    accountId={"RQ1890-TH00-MM55"}
                                    fullName={"Trần Anh Quân"}
                                    accountName={"quan456"}
                                    password={"123456"}
                                    role={"Sinh Viên"}
                                    createdDate={"date"}
                                    accountStatus={"Đã duyệt"}
                                    />
                                    <RowTable
                                    index={6}
                                    accountId={"RQ1890-TH00-MM55"}
                                    fullName={"Phạm Minh Duy"}
                                    accountName={"duy456"}
                                    password={"123456"}
                                    role={"Sinh Viên"}
                                    createdDate={"date"}
                                    accountStatus={"Đã duyệt"}
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

export default RequestList;