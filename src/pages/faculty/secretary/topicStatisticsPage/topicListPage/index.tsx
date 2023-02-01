import React, { useState, useRef } from 'react';
import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';
import BackIcon from '../../../../../assets/images/🦆 icon _arrow circle left_.png';

const RECORD_PER_PAGE = 5;
const TOTAL_PAGE_DEFAULT = 1;

interface Props{
    moveBack: () => void
}

const TopicListPage: React.FC<Props> = (props: Props) => {

    const{moveBack} = props;

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
            <div className=''>
                <div className='hover:cursor-pointer w-fit' onClick={moveBack}>
                    <img src={BackIcon} className='h-5' alt="" />
                </div>
                <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        Đợt: 
                    </div>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                onChange={(e) => {
                                }}
                                defaultValue={"dfdasf"}
                            >
                            <option value="">06/2022</option>
                            <option value="">06/2021</option>
                            <option value="">06/2020</option>
                            <option value="">06/2019</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='grid justify-items-end px-5'>
                <div className='flex items-center py-4'>
                    <div className='flex items-center mr-20'>
                        <div className='mr-5'>
                            Gia hạn: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                <option value="">Chưa gia hạn</option>
                                <option value="">Đã gia hạn</option>
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
                                <option value="">Đến hạn nghiệm thu</option>
                                <option value="">Đã hoàn thành</option>
                                <option value="">Trễ hạn</option>
                                <option value="">Bị hủy</option>
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
                                        Chủ nhiệm
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
                                        topicStatus={"Đang thực hiện"}
                                        extensionStatus={"topic Extension Status"}
                                        topicRegister={"Trần Anh Quân"}
                                        date={"12/09/2022"}
                                    /> 
                                        <RowTable
                                        index={2}
                                        topicId={"KH1890-MX201-MM55"}
                                        topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                        topicType={"Chính quy"}
                                        topicStatus={"Đang thực hiện"}
                                        extensionStatus={"topic Extension Status"}
                                        topicRegister={"Trần Anh Quân"}
                                        date={"12/09/2022"}
                                    />    
                                        <RowTable
                                        index={3}
                                        topicId={"KH1890-MX201-MM55"}
                                        topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                        topicType={"Chính quy"}
                                        topicStatus={"Đang thực hiện"}
                                        extensionStatus={"topic Extension Status"}
                                        topicRegister={"Trần Anh Quân"}
                                        date={"12/09/2022"}
                                    />    
                                        <RowTable
                                        index={4}
                                        topicId={"KH1890-MX201-MM55"}
                                        topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                        topicType={"Chính quy"}
                                        topicStatus={"Đang thực hiện"}
                                        extensionStatus={"topic Extension Status"}
                                        topicRegister={"Trần Anh Quân"}
                                        date={"12/09/2022"}
                                    />
                                        <RowTable
                                        index={5}
                                        topicId={"KH1890-MX201-MM55"}
                                        topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                        topicType={"Chính quy"}
                                        topicStatus={"Đang thực hiện"}
                                        extensionStatus={"topic Extension Status"}
                                        topicRegister={"Trần Anh Quân"}
                                        date={"12/09/2022"}
                                    />
                                        <RowTable
                                        index={6}
                                        topicId={"KH1890-MX201-MM55"}
                                        topicName={"Hệ thống quản lý đề tài khoa học cấp sinh viên"}
                                        topicType={"Chính quy"}
                                        topicStatus={"Đang thực hiện"}
                                        extensionStatus={"topic Extension Status"}
                                        topicRegister={"Trần Anh Quân"}
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