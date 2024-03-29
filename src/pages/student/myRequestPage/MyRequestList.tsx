import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from '../../../store';

import { RequestType } from '../../../shared/types/requestType';
import { RequestStatus } from '../../../shared/types/requestStatus';
import { Request } from '../../../shared/interfaces/requestInterface';
import { Topic } from '../../../shared/interfaces/topicInterface';

import { getRequestListAction } from '../../../actions/requestAction';
import { getTopicListAction } from '../../../actions/topicAction';

import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';
import Modal from "./Modal";

const RECORD_PER_PAGE = 7;

const MyRequestList: React.FC = () => {
    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState(1);
    const [currentType, setCurrentType] = useState<string>("");
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [requests, setRequests] = useState<Request[]>([]);
    const [myTopics, setMyToics] = useState<Topic[]>([])
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

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

    useEffect(() => {
        let query = {
            page: 1,
            limit: RECORD_PER_PAGE,
            studentId: currentUser ? currentUser._id : ""
        }
        dispatch(getRequestListAction(query))
            .then((data) => {
                setRequests(data?.requests)
                if (data?.metadata.totalPage > 0) {
                    setTotalPage(data?.metadata.totalPage)
                }
                else if (data?.metadata.totalPage === 0) {
                    setTotalPage(1)
                }
            }
            )
            .catch((error) => {

            })
        let queryForMyTopic = {
            student: currentUser ? currentUser._id : ""
        }
        dispatch(getTopicListAction(queryForMyTopic))
            .then((data) => {
                setMyToics(data?.topics)
            }
            )
            .catch((error) => {

            })
    }, []);

    const onChangePage = (page: number) => {
        let queryData: any = {
            page: page,
            limit: RECORD_PER_PAGE,
        }
        if (currentType !== "") {
            queryData = {
                ...queryData,
                type: currentType
            }
        }
        if (currentStatus !== "") {
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

    const getRequestList = async (type: string, status: string) => {
        setCurrentPage(1)
        let queryData: any = {
            page: 1,
            limit: RECORD_PER_PAGE,
        }
        if (type !== "") {
            queryData = {
                ...queryData,
                type: type
            }
        }
        if (status !== "") {
            queryData = {
                ...queryData,
                status: status
            }
        }
        dispatch(getRequestListAction(queryData))
            .then((data) => {
                setRequests(data?.requests)
                if (data?.metadata.totalPage > 0) {
                    setTotalPage(data?.metadata.totalPage)
                }
                else if (data?.metadata.totalPage === 0) {
                    setTotalPage(1)
                }
            }
            )
            .catch((error) => {

            })
    }

    return (
        <div>
            <div className='p-4 overflow-y-auto'>
                <div className='grid justify-items-end px-5'>
                    <div className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                        onClick={(e: any) => {
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
                                        e.preventDefault()
                                        setCurrentType(e.target.value)
                                        getRequestList(e.target.value, currentStatus)
                                    }}
                                    defaultValue={""}
                                >
                                    <option value={""}>Toàn bộ</option>
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
                                        e.preventDefault()
                                        setCurrentStatus(e.target.value)
                                        getRequestList(currentType, e.target.value)
                                    }}
                                    defaultValue={""}
                                >
                                    <option value={""}>Toàn bộ</option>
                                    {Object.values(RequestStatus).map((value) => {
                                        return <option value={value} key={value}>{value}</option>
                                    })}
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
                                                    className='w-[13%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                                >
                                                    Loại yêu cầu
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-[13%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                                >
                                                    Trạng thái
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-[26%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                                >
                                                    Tên đề tài
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-[8%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                                >
                                                    Đợt
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-[9%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                                >
                                                    Ngày tạo
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-[22%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                                >
                                                    Thông tin bổ sung
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='w-[4%] text-sm text-center font-bold text-white px-2 py-3 border-l-2'
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
                                                    createdDate={request.createAt}
                                                    additionalInfor={request.type === RequestType.EXTEND_PROJECT ?
                                                        `Thời gian gia hạn: ${request.extensionTime} tháng` :
                                                        (request.type === RequestType.OTHER ? `Nội dung yêu cầu: ${request.text}` : "")
                                                    }
                                                    topicName={request.topicName}
                                                    periodValue={request.periodValue}
                                                    currentPage={currentPage}
                                                    topicId={request.topicId}
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
            <Modal isVisible={showModal} myTopics={myTopics} onClose={() => setShowModal(false)} />
        </div>
    )
}

export default MyRequestList;