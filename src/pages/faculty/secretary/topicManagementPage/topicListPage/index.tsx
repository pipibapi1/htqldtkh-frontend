import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import vi from 'date-fns/locale/vi';

import { AppDispatch } from '../../../../../store';

import { PeriodStatus } from '../../../../../shared/types/periodStatus';
import { TopicTypeEnum } from '../../../../../shared/types/topicType';
import { TopicStatusEnum } from '../../../../../shared/types/topicStatus';
import { Topic } from '../../../../../shared/interfaces/topicInterface';
import { displayDate, displayPeriod } from '../../../../../shared/functions';

import { getTopicListAction } from '../../../../../actions/topicAction';
import { getAllPeriodsAction } from '../../../../../actions/periodAction';

import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';

import Calendar from "../../../../../assets/images/calendar.png";
import SearchIcon from "../../../../../assets/images/searchIcon.png";

const RECORD_PER_PAGE = 5;

interface Period {
    _id: string;
    period: string;
    status: PeriodStatus;
    createAt: Date;
}

const TopicListPage = () => {

    const [year, setYear] = useState(new Date())
    const [periods, setPeriods] = useState<Period[]>([]);
    const [currentPeriod, setCurrentPeriod] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentType, setCurrentType] = useState<string>("");
    const [currentStatus, setCurrentStatus] = useState<string>("");
    const [currentExtensionStatus, setCurrentExtensionStatus] = useState<string>("");
    const [currentTextSearch, setCurrentTextSearch] = useState<string>("");

    const onChangeFilter = (period: string, type: string, status: string, extensionStatus: string, textSearch: string) => {
        setCurrentPage(1)
        let queryData: any = {
            page: 1,
            limit: RECORD_PER_PAGE,
            period: period
        }
        if (textSearch !== "") {
            queryData = {
                ...queryData,
                textSearch: textSearch
            }
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
        if (extensionStatus !== "") {
            queryData = {
                ...queryData,
                isExtended: extensionStatus
            }
        }

        dispatch(getTopicListAction(queryData))
            .then((data) => {
                setTopicList(data?.topics)
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
    const [topicList, setTopicList] = useState<Topic[]>([]);

    const [totalPage, setTotalPage] = useState<number>(1);

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    useEffect(() => {
        let query = {
            year: (new Date()).getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
                if (data?.periods.length > 0) {
                    setCurrentPeriod(data?.periods[0]._id)
                    let queryData: any = {
                        period: data?.periods[0]._id
                    }
                    dispatch(getTopicListAction(queryData))
                        .then((data) => {
                            setTopicList(data?.topics)
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

            })
            .catch((error) => {

            })
    }, []);

    const onChangePage = (page: number) => {
        let queryData: any = {
            page: page,
            limit: RECORD_PER_PAGE,
            period: currentPeriod
        }
        if (currentTextSearch !== "") {
            queryData = {
                ...queryData,
                textSearch: currentTextSearch
            }
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
        if (currentExtensionStatus !== "") {
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

    const onChangeYear = (d: Date) => {
        let query: any = {
            year: d.getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
                if (data?.periods.length > 0) {
                    setCurrentPeriod(data?.periods[0]._id)
                    onChangeFilter(data?.periods[0]._id, currentType, currentStatus, currentExtensionStatus, currentTextSearch)
                }
            })
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

    return (
        <div className='p-4 overflow-y-auto'>
            <div className=''>
                <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        Năm:
                    </div>
                    <div className='grid justify-items-end items-center mr-10'>
                        <DatePicker
                            onChange={date => {
                                if (date) {
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
                            <img src={Calendar} alt="calendarIcon" className='h-5 w-5' />
                        </div>
                    </div>
                    {periods.length > 0 && <div className='mr-5'>
                        Đợt:
                    </div>}
                    {periods.length > 0 && <div className="">
                        <select
                            className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                            onChange={(e) => {
                                e.preventDefault();
                                setCurrentPeriod(e.target.value);
                                onChangeFilter(e.target.value, currentType, currentStatus, currentExtensionStatus, currentTextSearch)
                            }}
                            defaultValue={periods.length === 0 ? "" : periods[0]._id}
                            value={currentPeriod}
                        >
                            {periods.map((period, index) =>
                                <option value={period._id} id={period._id}>{displayPeriod(period.period)}</option>
                            )}
                        </select>
                    </div>}
                </div>
            </div>

            {periods.length > 0 ?
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
                                        onChangeFilter(currentPeriod, e.target.value, currentStatus, currentExtensionStatus, currentTextSearch)
                                    }}
                                    defaultValue={""}
                                    value={currentType}
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
                                        onChangeFilter(currentPeriod, currentType, currentStatus, e.target.value, currentTextSearch)
                                    }}
                                    value={currentExtensionStatus}
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
                                        onChangeFilter(currentPeriod, currentType, e.target.value, currentExtensionStatus, currentTextSearch)
                                    }}
                                    defaultValue={""}
                                    value={currentStatus}
                                >
                                    <option value="">Toàn bộ</option>
                                    {Object.values(TopicStatusEnum).map((value) => {
                                        return <option value={value} key={value}>{value}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div> : <div>
                    Không có đợt đăng ký
                </div>}

            {periods.length > 0 && <div className='w-full'>
                <div className='flex flex-col'>
                    <div className=''>
                        <div className='inline-block w-full pr-5'>
                            <div className='mb-2 w-[100%] flex justify-start'>
                                <input type="text" placeholder={"Tìm kiếm bằng tên hoặc mã đề tài"}
                                    value={currentTextSearch}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        setCurrentTextSearch(e.target.value);
                                    }}
                                    className='border border-1 border-black px-2 rounded-[8px] h-[35px] w-[97%]'
                                />
                                <div className='w-[3%] flex items-center justify-center p-1 hover:cursor-pointer'
                                    onClick={(e: any) => {
                                        e.preventDefault();
                                        onChangeFilter(currentPeriod, currentType, currentStatus, currentExtensionStatus, currentTextSearch)
                                    }}
                                >
                                    <img src={SearchIcon} alt="searchIcon" className='h-5 w-5' />
                                </div>
                            </div>
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
                                                className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
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
                                                className='w-[8%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
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
                                                className='w-[11%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Gia hạn
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[8%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Chủ nhiệm
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[7%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Ngày tạo
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[11%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Thời gian
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[6%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Đợt
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[4%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {topicList.map((topic, index) => {
                                            return (
                                                <RowTable
                                                    index={index + 1}
                                                    _id={topic._id}
                                                    topicGivenId={topic.topicGivenId}
                                                    topicName={topic.name}
                                                    topicType={topic.type}
                                                    topicStatus={topic.status}
                                                    topicExtensionStatus={topic.isExtended ? "Thời gian gia hạn: " + topic.extensionTime + " tháng" : ""}
                                                    createdDate={topic.creationDate}
                                                    time={displayDate(topic.startTime) + " - " + displayDate(topic.endTime)}
                                                    period={topic.periodValue}
                                                    currentPage={currentPage}
                                                    startTime={topic.startTime}
                                                    endTime={topic.endTime}
                                                    productId={topic.productId}
                                                    student={topic.student}
                                                />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {periods.length > 0 &&
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
                </div>}
        </div>
    )
}

export default TopicListPage;