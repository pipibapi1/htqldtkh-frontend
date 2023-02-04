import React, { useState, useRef, useEffect } from 'react';
import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';
import { RequestStatus } from '../../../../shared/types/requestStatus';
import { RequestType } from '../../../../shared/types/requestType';
import { PeriodStatus } from '../../../../shared/types/periodStatus';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';
import { getRequestListAction } from '../../../../actions/requestAction';

import {getAllPeriodsAction} from "../../../../actions/periodAction"

const RECORD_PER_PAGE = 5;
const TOTAL_PAGE_DEFAULT = 1;

interface Period{
    _id: string;
    period: string;
    status: PeriodStatus;
    createAt: Date;
}

interface Request{
    _id: string;
    type: RequestType;
    topicId: string;
    topicName: string;
    studentName: string;
    studentId: string;
    status: RequestStatus;
    extensionTime: number;
    createAt: string;
}

const RequestList= () => {

    const [periods, setPeriods] = useState<Period[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(TOTAL_PAGE_DEFAULT);
    const [currentPeriod, setCurrentPeriod] = useState<string>("");
    const [currentType, setCurrentType] = useState<string>("");
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [requests, setRequests] = useState<Request[]>([]);
    const totalPage = useRef(TOTAL_PAGE_DEFAULT);

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()


    const getRequestList = async(period: string, type: string, status: string) => {
        let queryData: any = {
            page: currentPage,
            limit: RECORD_PER_PAGE,
            period: period
        }
        if(type !== ""){
            queryData = {
                ...queryData,
                type: type
            }
        }
        if(status !== ""){
            queryData = {
                ...queryData,
                status: status
            }
        }
        dispatch(getRequestListAction(queryData))
        .then((data) => {
             console.log(data?.requests)
             setRequests(data?.requests)
            }
        )
        .catch((error) => {

        })
    }
    useEffect(() => {
        dispatch(getAllPeriodsAction())
            .then((data) => {
                setPeriods(data?.periods)
                setCurrentPeriod(data?.periods[0]._id)
                let queryData: any = {
                    page: currentPage,
                    limit: RECORD_PER_PAGE,
                    period: data?.periods[0]._id
                }
                dispatch(getRequestListAction(queryData))
                .then((data) => {
                    setRequests(data?.requests)
                    }
                )
                .catch((error) => {

                })
            })
            .catch((error) => {
                
            })
    }, []);


    const prevPage = () => {
        if (currentPage <= 1) return;
        setCurrentPage(currentPage - 1);
      };
      const nextPage = () => {
        if (currentPage >= totalPage.current) return;
        setCurrentPage(currentPage + 1);
      };

    const periodDisplay = (period: string) => {
        const x = new Date(period);
        return (x.getMonth() + 1) + "/" + x.getFullYear();
    }

    return(
        <div className='p-4 overflow-y-auto'>
            <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        Đợt: 
                    </div>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setCurrentPeriod(e.target.value);
                                    getRequestList(e.target.value, currentType, currentStatus);
                                }}
                                defaultValue={periods.length === 0 ? "" : periods[0]._id}
                            >
                            {periods.map((period, index) => <option value={period._id}>{periodDisplay(period.period)}</option>)}
                        </select>
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
                                        e.preventDefault();
                                        setCurrentType(e.target.value);
                                        getRequestList(currentPeriod, e.target.value, currentStatus);
                                    }}
                                    defaultValue={""}
                                >
                                <option value="">Toàn bộ</option>
                                <option value={RequestType.GET_CERTIFICATE}>Xin giấy chứng nhận</option>
                                <option value={RequestType.EXTEND_PROJECT}>Gia hạn đề tài</option>
                                <option value={RequestType.CANCEL_PROJECT}>Hủy đề tài</option>
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
                                        e.preventDefault();
                                        setCurrentStatus(e.target.value);
                                        getRequestList(currentPeriod, currentType, e.target.value);
                                    }}
                                    defaultValue={""}
                                >
                                <option value="">Toàn bộ</option>
                                <option value={RequestStatus.WAIT_APPROVAL}>Chờ xét duyệt</option>
                                <option value={RequestStatus.APPROVED}>Đã duyệt</option>
                                <option value={RequestStatus.REFUSED}>Bị từ chối</option>
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
                                        className='w-[5%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        STT
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
                                        className='w-[20%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Tên đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Người tạo
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Ngày tạo
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[20%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
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
                                    {requests.map((request, index) => {
                                        return (<RowTable
                                            index={index + 1}
                                            requestId={request._id}
                                            requestType={request.type}
                                            requestStatus={request.status}
                                            topicRegister={request.studentName}
                                            createdDate={request.createAt}
                                            additionalInfor={""}
                                            topicName={request.topicName}
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