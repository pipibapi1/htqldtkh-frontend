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
import { getRequestListAction, putApproveARequestAction, putUpdateARequestAction } from '../../../../actions/requestAction';
import DatePicker from "react-datepicker";
import Calendar from "../../../../assets/images/calendar.png";
import {getAllPeriodsAction} from "../../../../actions/periodAction"
import { Period } from '../../../../shared/interfaces/periodInterface';
import { Request } from '../../../../shared/interfaces/requestInterface';
import Swal from 'sweetalert2';


const RECORD_PER_PAGE = 7;


const RequestList= () => {

    const [periods, setPeriods] = useState<Period[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentPeriod, setCurrentPeriod] = useState<string>("");
    const [currentType, setCurrentType] = useState<string>("");
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [requests, setRequests] = useState<Request[]>([]);
    const [totalPage, setTotalPage] = useState(1);
    const [year, setYear] = useState(new Date());
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()


    const getRequestList = async(period: string, type: string, status: string) => {
        setCurrentPage(1)
        let queryData: any = {
            page: 1,
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
             setRequests(data?.requests)
             if(data?.metadata.totalPage > 0){
                setTotalPage(data?.metadata.totalPage)
            }
            }
        )
        .catch((error) => {

        })
    }
    useEffect(() => {
        let query= {
            year: (new Date()).getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
                setCurrentPeriod(data?.periods[0]._id)
                let queryData: any = {
                    page: 1,
                    limit: RECORD_PER_PAGE,
                    period: data?.periods[0]._id
                }
                dispatch(getRequestListAction(queryData))
                .then((data) => {
                    setRequests(data?.requests)
                    if(data?.metadata.totalPage > 0){
                        setTotalPage(data?.metadata.totalPage)
                    }
                    }
                )
                .catch((error) => {

                })
            })
            .catch((error) => {
                
            })
    }, []);

    const onChangeYear = (d: Date) => {
        setCurrentPage(1)
        let query: any = {
            year: d.getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
                setCurrentPeriod(data?.periods[0]._id)
                let queryData: any = {
                    page: 1,
                    limit: RECORD_PER_PAGE,
                    period: data?.periods[0]._id
                }
                dispatch(getRequestListAction(queryData))
                .then((data) => {
                    setRequests(data?.requests)
                    if(data?.metadata.totalPage > 0){
                        setTotalPage(data?.metadata.totalPage)
                    }
                    }
                )
                .catch((error) => {

                })
            })
            .catch((error) => {
                
            })
    }

    const onChangePage = (page: number) => {
        let queryData: any = {
            page: page,
            limit: RECORD_PER_PAGE,
            period: currentPeriod
        }
        if(currentType !== ""){
            queryData = {
                ...queryData,
                type: currentType
            }
        }
        if(currentStatus !== ""){
            queryData = {
                ...queryData,
                status: currentStatus
            }
        }

        dispatch(getRequestListAction(queryData))
                .then((data) => {
                    setRequests(data?.requests)
                    }
                )
                .catch((error) => {

                })
    }

    const approveARequest = (_id: string) => {

        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn duyệt yêu cầu này?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
      
            if(result.isConfirmed){
            dispatch(putApproveARequestAction(_id))
              .then((data) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Duyệt thành công',
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    window.location.reload();
                  } 
                })
                }
              )
              .catch((error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Có lỗi gì đó đã xảy ra, thử lại sau!',
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                })
              })
            }
      
            if(result.isDenied){
            }
        })
    }

    const refuseARequest = (_id: string) => {
        const updateInfo = {
            _id: _id,
            request: {
                status: RequestStatus.REFUSED
            }
        }

        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn từ chối yêu cầu này?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
      
            if(result.isConfirmed){
            dispatch(putUpdateARequestAction(updateInfo))
              .then((data) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Từ chối thành công',
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    window.location.reload();
                  } 
                })
                }
              )
              .catch((error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Có lỗi gì đó đã xảy ra, thử lại sau!',
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                })
              })
            }
      
            if(result.isDenied){
            }
        })
    }


    const prevPage = () => {
        if (currentPage <= 1) return;
        setCurrentPage(currentPage - 1);
        onChangePage(currentPage - 1)
      };
      const nextPage = () => {
        if (currentPage >= totalPage) return;
        setCurrentPage(currentPage + 1);
        onChangePage(currentPage + 1)
      };

    const periodDisplay = (period: string) => {
        const x = new Date(period);
        return (x.getMonth() + 1) + "/" + x.getFullYear();
    }

    return(
        <div className='p-4 overflow-y-auto'>

            <div className='flex items-center mb-5'>
            <div className='mr-5'>
                        Năm: 
                    </div>
                    <div className='grid justify-items-end items-center mr-10'>
                        <DatePicker
                            onChange={date => {
                                if(date){
                                    setYear(date);
                                    onChangeYear(date);
                                }
                                }}
                            selected={year}
                            dateFormat="yyyy"
                            showYearPicker
                            className="h-[40px] w-[90px] border border-black border-1 rounded-md px-2"
                                    />
                        <div className='absolute mr-2'>
                            <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                        </div>
                    </div>
                    {periods.length > 0 && <div className='mr-5'>
                        Đợt: 
                    </div>}
                    {periods.length > 0 &&<div className="">
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
                    </div>}
            </div>

            {periods.length > 0 ? (<div className='grid justify-items-end px-5'>
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
            </div>) : (<div>
                Không có đợt đăng ký
            </div>
            )}

            {periods.length > 0 && <div className='w-full'>
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
                                        className='w-[25%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
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
                                        className='w-[15%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Thông tin bổ sung
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[8%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>

                                    <th
                                        scope='col'
                                        className='w-[8%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
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
                                            additionalInfor={request.type === RequestType.EXTEND_PROJECT ? 
                                                `Thời gian gia hạn: ${request.extensionTime} tháng` : ""}
                                            topicName={request.topicName}
                                            currentPage={currentPage}
                                            approveARequest={approveARequest}
                                            refuseARequest={refuseARequest}
                                            />)
                                    })}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>}

            {periods.length > 0 && <div className='grid justify-items-end px-5'>
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
            </div>}
        </div>
    )
}

export default RequestList;