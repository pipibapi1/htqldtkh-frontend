import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";

import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';

import { RootState, AppDispatch } from '../../../store';

import { TopicTypeEnum } from '../../../shared/types/topicType';
import { TopicStatusEnum } from '../../../shared/types/topicStatus';
import { Topic } from '../../../shared/interfaces/topicInterface';
import { displayDate } from '../../../shared/functions';

import { getTopicListAction } from '../../../actions/topicAction';

const RECORD_PER_PAGE = 5;

const MyTopicList: React.FC = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentType, setCurrentType] = useState<string>("");
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [myTopics, setMyTopics] = useState<Topic[]>([]);

    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

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

    const onChangeFilter = (type: string, status: string) =>{
        setCurrentPage(1);
        let queryData: any = {
            page: 1,
            limit: RECORD_PER_PAGE,
            student: currentUser._id
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
        dispatch(getTopicListAction(queryData))
        .then((data) => {
            setMyTopics(data?.topics)
            if(data?.metadata.totalPage > 0){
                setTotalPage(data?.metadata.totalPage)
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
            student: currentUser._id
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
        dispatch(getTopicListAction(queryData))
        .then((data) => {
            setMyTopics(data?.topics)
            }
        )
        .catch((error) => {

        })
    }

    useEffect(() => {
        let queryData: any = {
            page: currentPage,
            limit: RECORD_PER_PAGE,
            student: currentUser._id
        }
        dispatch(getTopicListAction(queryData))
                .then((data) => {
                    setMyTopics(data?.topics)
                    if(data?.metadata.totalPage > 0){
                        setTotalPage(data?.metadata.totalPage)
                    }
                    }
                )
                .catch((error) => {

                })
    }, []);

    return(
        <div className='p-4 overflow-y-auto'>
            <div className='grid grid-cols-14 px-5 flex'>
                <div className="col-start-13 col-span-2 flex justify-end">
                    <Link to={'/registerTopic'} className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                    Nhập đề tài mới
                    </Link>
                </div>
            </div>

            <div className='flex grid justify-items-end px-5'>
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
                                        onChangeFilter(e.target.value, currentStatus)
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
                                        onChangeFilter(currentType, e.target.value)
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
                                        className='w-[13%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
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
                                        Ngày tạo
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Thời gian
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Đợt
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myTopics.map((topic, index) => {
                                        return(
                                            <RowTable
                                            index={index+1}
                                            _id={topic._id}
                                            topicGivenId={topic.topicGivenId}
                                            topicName={topic.name}
                                            topicType={topic.type}
                                            topicStatus={topic.status}
                                            topicExtensionStatus={topic.isExtended? "Thời gian gia hạn: " + topic.extensionTime + " tháng" : ""}
                                            createdDate={topic.creationDate}
                                            time={displayDate(topic.startTime) + " - " + displayDate(topic.endTime)}
                                            period={topic.periodValue}
                                            currentPage={currentPage}
                                            startTime={topic.startTime}
                                            endTime={topic.endTime}
                                            productId={topic.productId}
                                            />
                                        )
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

export default MyTopicList;