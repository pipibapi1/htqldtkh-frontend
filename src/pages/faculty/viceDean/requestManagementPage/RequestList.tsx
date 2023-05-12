import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import vi from 'date-fns/locale/vi';

import { AppDispatch } from '../../../../store';

import { RequestStatus } from '../../../../shared/types/requestStatus';
import { RequestType } from '../../../../shared/types/requestType';
import { Period } from '../../../../shared/interfaces/periodInterface';
import { Request } from '../../../../shared/interfaces/requestInterface';
import { displayPeriod } from '../../../../shared/functions';

import { getRequestListAction, putApproveARequestAction, putUpdateARequestAction } from '../../../../actions/requestAction';
import { getAllPeriodsAction } from "../../../../actions/periodAction";

import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';

import Calendar from "../../../../assets/images/calendar.png";

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
                if(data?.periods.length > 0){
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
                }
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
                if(data?.periods.length > 0){
                    setCurrentPeriod(data?.periods[0]._id)
                    setCurrentType("")
                    setCurrentStatus("")
                    getRequestList(data?.periods[0]._id, "", "");
                }
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
                            locale={vi}
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
                            {periods.map((period, index) => <option value={period._id}>{displayPeriod(period.period)}</option>)}
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
                                data-testid='type-select'
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCurrentType(e.target.value);
                                        getRequestList(currentPeriod, e.target.value, currentStatus);
                                    }}
                                    defaultValue={""}
                                >
                                <option value="">Toàn bộ</option>
                                {Object.values(RequestType).map((value) => {
                                    return <option value={value} key={value}>{value}</option>
                                })}
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
                                {Object.values(RequestStatus).map((value) => {
                                    return <option value={value} key={value}>{value}</option>
                                })}
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
                                                `Thời gian gia hạn: ${request.extensionTime} tháng`:
                                                (request.type === RequestType.OTHER ? `Nội dung yêu cầu: ${request.text}` : "")
                                            }
                                            topicName={request.topicName}
                                            currentPage={currentPage}
                                            approveARequest={approveARequest}
                                            refuseARequest={refuseARequest}
                                            topicId={request.topicId}
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