import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';

import { AppDispatch } from '../../../../../store';

import { PeriodStatus } from '../../../../../shared/types/periodStatus';
import { TopicTypeEnum } from '../../../../../shared/types/topicType';
import { TopicStatusEnum } from '../../../../../shared/types/topicStatus';
import { displayPeriod } from '../../../../../shared/functions';

import { getTopicListAction } from '../../../../../actions/topicAction';

import BackIcon from '../../../../../assets/images/🦆 icon _arrow circle left_.png';

const RECORD_PER_PAGE = 8;

interface Period{
    _id: string;
    period: string;
    status: PeriodStatus;
    createAt: Date;
}
interface Props{
    moveBack: () => void,
    currentPeriod: string,
    periods: Period[],
    setCurrentPeriod: React.Dispatch<React.SetStateAction<string>>,
    getTopicList: (period: string) => Promise<void>,
}

interface Topic{
    _id: string;
    name: string;
    type: TopicTypeEnum;
    startTime: string;
    endTime: string;
    isExtended: boolean;
    extensionTime: number;
    status: TopicStatusEnum;
    period: string;
    productId: string;
    studentId: string;
    creationDate: string;
    topicGivenId: string;
    student: {
        _id: string;
        name: string;
    }
}

const TopicListPage: React.FC<Props> = (props: Props) => {

    const{moveBack, currentPeriod, periods, setCurrentPeriod, getTopicList} = props;
    

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentType, setCurrentType] = useState<string>("");
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [currentExtensionStatus, setCurrentExtensionStatus] = useState<string>("");

    const extensionStatus = (topic: Topic) => {
        if(topic.isExtended){
            return "Thời gian gia hạn: " + topic.extensionTime + " tháng"
        }
        return ""
    }

    const onChangeFilter = (period: string, type: string, status: string, extensionStatus: string) => {
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
        if(extensionStatus !== ""){
            queryData = {
                ...queryData,
                isExtended: extensionStatus
            }
        }

        dispatch(getTopicListAction(queryData))
                .then((data) => {
                    setTopicList(data?.topics)
                    if(data?.metadata.totalPage > 0){
                        setTotalPage(data?.metadata.totalPage)
                    }
                    }
                )
                .catch((error) => {

                })
    }

    const [topicList, setTopicList] = useState<Topic[]>([]);

    const [totalPage, setTotalPage] = useState<number>(1);

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    useEffect(() => {
        let queryData: any = {
            page: currentPage,
            limit: RECORD_PER_PAGE,
            period: currentPeriod
        }
        dispatch(getTopicListAction(queryData))
                .then((data) => {
                    setTopicList(data?.topics)
                    if(data?.metadata.totalPage > 0){
                        setTotalPage(data?.metadata.totalPage)
                    }
                    }
                )
                .catch((error) => {

                })
                
    }, []);

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
        if(currentExtensionStatus !== ""){
            queryData = {
                ...queryData,
                isExtended: currentExtensionStatus
            }
        }

        dispatch(getTopicListAction(queryData))
                .then((data) => {
                    setTopicList(data?.topics)
                    }
                )
                .catch((error) => {

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
                                        e.preventDefault();
                                        setCurrentPeriod(e.target.value);
                                        getTopicList(e.target.value);
                                        onChangeFilter(e.target.value, currentType, currentStatus, currentExtensionStatus)
                                    }}
                                    defaultValue={periods.length === 0 ? "" : periods[0]._id}
                                    value={currentPeriod}
                                >
                                {periods.map((period, index) => 
                                <option value={period._id} id={period._id}>{displayPeriod(period.period)}</option>
                                )}
                            </select>
                        </div>
                </div>
            </div>

            <div className='grid justify-items-end px-5'>
                <div className='flex items-center py-4'>
                    <div className='flex items-center mr-20'>
                        <div className='mr-3'>
                            Loại đề tài: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[250px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCurrentType(e.target.value)
                                        onChangeFilter(currentPeriod, e.target.value, currentStatus, currentExtensionStatus)
                                    }}
                                    defaultValue={""}
                                >
                                <option value="">Toàn bộ</option>
                                {Object.values(TopicTypeEnum).map((value) => {
                                    return <option value={value} key={value}>{value}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className='flex items-center mr-20'>
                        <div className='mr-3'>
                            Gia hạn: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[250px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCurrentExtensionStatus(e.target.value);
                                        onChangeFilter(currentPeriod, currentType, currentStatus, e.target.value)
                                    }}
                                    defaultValue={""}
                                >
                                <option value="">Toàn bộ</option>
                                <option value="false">Chưa gia hạn</option>
                                <option value="true">Đã gia hạn</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <div className='mr-3'>
                            Trạng thái: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[250px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCurrentStatus(e.target.value)
                                        onChangeFilter(currentPeriod, currentType, e.target.value, currentExtensionStatus)
                                    }}
                                    defaultValue={""}
                                >
                                <option value="">Toàn bộ</option>
                                {Object.values(TopicStatusEnum).map((value) => {
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
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Mã đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[20%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Tên đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Loại đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
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
                                        className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Chủ nhiệm
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Ngày tạo
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {topicList.map((topic, index) => {
                                        return (<RowTable
                                        index={index+1}
                                        topicId={topic.topicGivenId}
                                        topicName={topic.name}
                                        topicType={topic.type}
                                        topicStatus={topic.status}
                                        extensionStatus={extensionStatus(topic)}
                                        topicRegister={topic.student.name}
                                        date={topic.creationDate}
                                        currentPage={currentPage}
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

export default TopicListPage;