import React, { useState, useRef } from 'react';
import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';
import BackIcon from '../../../../../assets/images/🦆 icon _arrow circle left_.png';

const RECORD_PER_PAGE = 5;
const TOTAL_PAGE_DEFAULT = 1;



const TopicListPage: React.FC = (props: any) => {


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
                                        Chủ nhiệm
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Kinh phí
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Ngày tạo
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    <RowTable
                                        index={1}
                                        topicId={"KH1890-MX201-MM55"}
                                        topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                        topicType={"Chính quy"}
                                        topicRegister={"Trần Anh Quân"}
                                        expense={'5.000.000 VNĐ'}
                                        date={"12/09/2022"}
                                    />
                                    <RowTable
                                        index={2}
                                        topicId={"KH1890-MX201-MM55"}
                                        topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                        topicType={"Chính quy"}
                                        topicRegister={"Trần Anh Quân"}
                                        expense={'5.000.000 VNĐ'}
                                        date={"12/09/2022"}
                                    />
                                    <RowTable
                                        index={3}
                                        topicId={"KH1890-MX201-MM55"}
                                        topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                        topicType={"Chính quy"}
                                        topicRegister={"Trần Anh Quân"}
                                        expense={'5.000.000 VNĐ'}
                                        date={"12/09/2022"}
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

export default TopicListPage;