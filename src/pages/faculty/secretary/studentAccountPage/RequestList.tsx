import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { AppDispatch } from '../../../../store';

import { StudentAccountStatusEnum } from '../../../../shared/types/studentAccountStatus';

import { getStudentListAction } from '../../../../actions/studentAction';

import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';

const RECORD_PER_PAGE = 10;

interface Student{
    _id: string;
    name: string;
    gender: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
    studentId: string;
    image: string;
    educationType: string;
    birthDate: string;
    accountStatus: string;
    accountCreationDate: string;
}

const RequestList: React.FC = () => {

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState(1);
    const [students, setStudents] = useState<Student[]>([]);
    const [currentStatus, setCurrentStatus] = useState("")

    const prevPage = () => {
        if (currentPage <= 1) return;
        onChangePage(currentPage - 1)
        setCurrentPage(currentPage - 1);
      };
    const nextPage = () => {
        if (currentPage >= totalPage) return;
        onChangePage(currentPage + 1)
        setCurrentPage(currentPage + 1);
    };
    
    const onChangeStatus = (e:any) =>{
        setCurrentPage(1)
        let queryData: any = {
            page: currentPage,
            limit: RECORD_PER_PAGE,
        }
        if(e.target.value !== ""){
            queryData = {
                ...queryData,
                status: e.target.value
            }
        }

        dispatch(getStudentListAction(queryData))
        .then((data) => {
            setStudents(data?.students)
            if(data?.metadata.totalPage > 0){
                setTotalPage(totalPage)
            }
            }
        )
        .catch((error) => {

        })
    }

    const onChangePage = (page: number) => {
        let queryData: any = {
            page: page,
            limit: RECORD_PER_PAGE,
        }
        if(currentStatus != ""){
            queryData= {
                ... queryData,
                status: currentStatus
            }
        }
        dispatch(getStudentListAction(queryData))
        .then((data) => {
            setStudents(data?.students)
            }
        )
        .catch((error) => {

        })
    }

      useEffect(() => {
        let queryData: any = {
            page: currentPage,
            limit: RECORD_PER_PAGE,
        }

        dispatch(getStudentListAction(queryData))
        .then((data) => {
            setStudents(data?.students)
            if(data?.metadata.totalPage > 0){
                setTotalPage(totalPage)
            }
            }
        )
        .catch((error) => {

        })
    }, []);

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
                                        e.preventDefault()
                                        setCurrentStatus(e.target.value)
                                        onChangeStatus(e);
                                        }
                                    }
                                    defaultValue={""}
                                >
                                <option value="">Toàn bộ</option>
                                <option value={StudentAccountStatusEnum.waiting}>Chờ duyệt</option>
                                <option value={StudentAccountStatusEnum.approved}>Đã duyệt</option>
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
                                        className='w-[5%] text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        STT
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
                                    
                                    {students.map((student: any, index: number) => {
                                        return (<RowTable
                                            index={index+1}
                                            fullName={student.name}
                                            accountName={student.username}
                                            createdDate={student.accountCreationDate}
                                            accountStatus={student.accountStatus}
                                            currentPage={currentPage}
                                            student={student}
                                    />)
                                    })}
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
                            {Array.from(Array(totalPage).keys()).map((index) => (
                                <PaginationTag
                                key={index}
                                numPage={index + 1}
                                setCurrentPage={setCurrentPage}
                                currentPage={currentPage}
                                onChangePage={onChangePage}
                                />
                            ))}
                            <RightTag onClick={nextPage} />
                        </ul>
                </div>
        </div>
    )
}

export default RequestList;