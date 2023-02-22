import React, { useState, useRef, Fragment } from 'react';
import {Link} from "react-router-dom";
import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';
import AddCouncilModal from "./AddCouncilModal";


const RECORD_PER_PAGE = 5;
const TOTAL_PAGE_DEFAULT = 1;

const RequestList: React.FC = () => {

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
        <div className='p-4 overflow-y-auto'>
            <Fragment>
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
            
            <div>
                <div>
                Số đề tài cần được xét duyệt: <span className='text-[#030391]'>15</span> 
                </div>
                <div>
                Số đề tài đã có hội đồng xét duyệt: <span className='text-[#030391]'>10</span> 
                </div>
                <div>
                Số lượng hội đồng: <span className='text-[#030391]'>5</span> 
                </div>
            </div>
            <div className='grid justify-items-end px-5'>
                <div className='flex items-center py-4'>
                    <div className='flex items-center'>
                        <div className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer" onClick={() => setShowModal(true)}>
                            Thêm hội đồng
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
                                        STT
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Tên hội đồng
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Số lượng TV
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Thời gian diễn ra
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Số đề tài
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
                                    councilName={"Hội đồng 1"}
                                    member={2}
                                    time={"24/5/2023"}
                                    numOfTopic={3}
                                    status={"Chưa gửi thông báo"}
                                    />
                                    <RowTable
                                    index={2}
                                    councilName={"Hội đồng 2"}
                                    member={3}
                                    time={"25/5/2023"}
                                    numOfTopic={3}
                                    status={"Chờ xác nhận"}
                                    />
                                    <RowTable
                                    index={3}
                                    councilName={"Hội đồng 3"}
                                    member={4}
                                    time={"26/5/2023"}
                                    numOfTopic={3}
                                    status={"Đã xác nhận"}
                                    />
                                    <RowTable
                                    index={4}
                                    councilName={"Hội đồng 4"}
                                    member={2}
                                    time={"21/5/2023"}
                                    numOfTopic={2}
                                    status={"Chưa gửi thông báo"}
                                    />
                                    <RowTable
                                    index={5}
                                    councilName={"Hội đồng 5"}
                                    member={5}
                                    time={"28/5/2023"}
                                    numOfTopic={4}
                                    status={"Chờ xác nhận"}
                                    />
                                    <RowTable
                                    index={6}
                                    councilName={"Hội đồng 6"}
                                    member={4}
                                    time={"22/5/2023"}
                                    numOfTopic={4}
                                    status={"Đã xác nhận"}
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

            <AddCouncilModal isVisible = {showModal} onClose = {() => setShowModal(false)}/>
            </Fragment>
        </div>
    )
}

export default RequestList;