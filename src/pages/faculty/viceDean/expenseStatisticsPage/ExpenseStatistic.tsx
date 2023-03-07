import React, {useState, useEffect} from 'react';
import TopicListPage from './topicListPage';
import { TopicTypeEnum } from '../../../../shared/types/topicType';
import { PeriodStatus } from '../../../../shared/types/periodStatus';
import { TopicStatusEnum } from '../../../../shared/types/topicStatus';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';

import DatePicker from "react-datepicker";
import Calendar from "../../../../assets/images/calendar.png";

import Swal from 'sweetalert2';

import {getAllPeriodsAction} from "../../../../actions/periodAction"
import { getTopicListAction } from '../../../../actions/topicAction';
import { getExpenseDetailByPeriodAction } from '../../../../actions/expenseAction';

import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianAxis, CartesianGrid, Legend, Label} from 'recharts';
import { getExpenseStatisticAction } from '../../../../actions/statisticAction';

const RECORD_PER_PAGE = 10;

interface Period{
    _id: string;
    period: string;
    status: PeriodStatus;
    createAt: Date;
}

interface Expense{
    _id: string;
    createAt: string;
    lastModified: string;
    note: string;
    generalExpense: number;
    period: string;
    totalExpense: number;
    allocated:{
        type: string;
        totalExpense: number;
        maxExpensePerTopic: number;
    }[],
    usedExpense: number,
    used: any;
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
    expense: number;
    student: {
        _id: string;
        name: string;
    }
}

const ExpenseStatistic: React.FC = () => {
    const [startYear, setStartYear] = useState<Date>(new Date((new Date()).getFullYear(), 0, 1));
    const [endYear, setEndYear] = useState<Date>(new Date(startYear.getFullYear() + 1, 0, 1));
    const [periods, setPeriods] = useState<Period[]>([]);
    const [expense, setExpense] = useState<Expense>({
        _id: "",
        createAt: "",
        lastModified: "",
        note: "",
        generalExpense: 0,
        period: "",
        totalExpense: 0,
        allocated:[{
            type: "",
            totalExpense: 0,
            maxExpensePerTopic: 0}
        ],
        usedExpense:0,
        used: ""
    });
    const [periodUsedExpenseList, setPeriodUsedExpenseList] = useState<{_id: string, period: string, usedExpense: number}[]>([])
    const [year, setYear] = useState(new Date())
    const [topics, setTopics] = useState<Topic[]>([])
    const [currentPeriod, setCurrentPeriod] = useState<string>("");
    const [currentType, setCurrentType] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast: any) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const leftExpense = (type: string) => {
        if(expense?.allocated.find((x) => x.type === type)?.totalExpense){
            return ((expense?.allocated.find((x) => x.type === type)?.totalExpense as number) - (expense?.used[type] === undefined ? 0 : expense?.used[type])).toLocaleString()
        }
        return ""
    }

    const onChangePeriod = (period: string) => {
        setCurrentPage(1)
        let queryDataForExpense: any = {
            period: period
        }
        dispatch(getExpenseDetailByPeriodAction(queryDataForExpense))
            .then((data) => {
                setExpense(data?.expense)
            })
            .catch((error) => {

            })
        let queryDataForTopic: any = {
                period: period,
                page: 1,
                limit: RECORD_PER_PAGE,

        }
        if(currentType != ""){
                queryDataForTopic = {
                    ... queryDataForTopic,
                    type: currentType
                }
            }
        dispatch(getTopicListAction(queryDataForTopic))
        .then((data) => {
            setTopics(data?.topics)
            if(data?.metadata.totalPage > 0){
                setTotalPage(data?.metadata.totalPage)
            }
            }
        )
        .catch((error) => {

        })
    }

    const onChangeType = (type: string) => {
        setCurrentPage(1)
        let queryDataForTopic: any = {
            period: currentPeriod,
            page: 1,
            limit: RECORD_PER_PAGE,

        }
        if(type != ""){
            queryDataForTopic = {
                ... queryDataForTopic,
                type: type
            }
        }
        dispatch(getTopicListAction(queryDataForTopic))
        .then((data) => {
            setTopics(data?.topics)
            if(data?.metadata.totalPage > 0){
                setTotalPage(data?.metadata.totalPage)
            }
            }
        )
        .catch((error) => {

        })
    }

    const onChangePage = (page: number) => {
        let queryDataForTopic: any = {
            period: currentPeriod,
            page: page,
            limit: RECORD_PER_PAGE,

        }
        if(currentType != ""){
            queryDataForTopic = {
                ... queryDataForTopic,
                type: currentType
            }
        }
        dispatch(getTopicListAction(queryDataForTopic))
        .then((data) => {
            setTopics(data?.topics)
            }
        )
        .catch((error) => {

        })
    }

    useEffect(() => {
        let timeRange: any = {
            startYear: startYear,
            endYear: endYear
        }
        dispatch(getExpenseStatisticAction(timeRange))
            .then((data) => {
                setPeriodUsedExpenseList(handlePeriodWithExpenseList(data?.periodListWithUsedExpense))
            })
            .catch((error) => {

            })
        let query= {
            year: (new Date()).getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
                if(data?.periods.length > 0){
                    setCurrentPeriod(data?.periods[0]._id)
                    let queryDataForExpense: any = {
                        period: data?.periods[0]._id
                    }
                    dispatch(getExpenseDetailByPeriodAction(queryDataForExpense))
                        .then((data) => {
                            setExpense(data?.expense)
                        })
                        .catch((error) => {
    
                        })
                        let queryDataForTopic: any = {
                            period: data?.periods[0]._id,
                            page: currentPage,
                            limit: RECORD_PER_PAGE,
                        }
                    dispatch(getTopicListAction(queryDataForTopic))
                    .then((data) => {
                        setTopics(data?.topics)
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

    const periodDisplay = (period: string) => {
        const x = new Date(period);
        return (x.getMonth() + 1) + "/" + x.getFullYear();
    }

    const handlePeriodWithExpenseList = (list: {_id: string, period: string, usedExpense: number}[]) => {
        return list.map((l) => ({_id: l._id, period: periodDisplay(l.period), usedExpense: l.usedExpense / 1000000}))
    }

    const onChangeYear = (d: Date) => {
        let query: any = {
            year: d.getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
                if(data?.periods.length > 0){
                    setCurrentPeriod(data?.periods[0]._id)
                    onChangePeriod(data?.periods[0]._id)
                }
            })
            .catch((error) => {
                
            })
    }

    return(
        <div className='px-5 py-5'>

            <div className='text-lg font-bold'>
                Thống kê kinh phí sử dụng các đợt
            </div>

            <div className='flex items-center mt-5 px-5'>
                <div className='text-md'>
                    Từ năm 
                </div>
                <div className='grid justify-items-end items-center ml-3'>
                        <DatePicker
                            onChange={date => {
                                if(date){
                                    if(date.getFullYear() >= endYear.getFullYear()){
                                        Toast.fire({
                                            icon: 'warning',
                                            title: 'Năm bắt đầu phải bé hơn năm kết thúc!'
                                          })
                                    }
                                    else{
                                        setStartYear(date);
                                        let timeRange: any = {
                                            startYear: date,
                                            endYear: endYear
                                        }
                                        dispatch(getExpenseStatisticAction(timeRange))
                                            .then((data) => {
                                                setPeriodUsedExpenseList(handlePeriodWithExpenseList(data?.periodListWithUsedExpense))
                                            })
                                            .catch((error) => {
                                
                                            })
                                    }
                                }
                                }}
                            selected={startYear}
                            dateFormat="yyyy"
                            showYearPicker
                            className="h-[40px] w-[90px] border border-black border-1 rounded-md px-2"
                                    />
                        <div className='absolute mr-2'>
                            <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                        </div>
                </div>
                <div className='text-md ml-3'>
                    đến năm 
                </div>
                <div className='grid justify-items-end items-center ml-3'>
                        <DatePicker
                            onChange={date => {
                                if(date){
                                    if(date.getFullYear() <= startYear.getFullYear()){
                                        Toast.fire({
                                            icon: 'warning',
                                            title: 'Năm kết thúc phải lớn hơn năm bắt đầu!'
                                          })
                                    }
                                    else{
                                        setEndYear(date);
                                        let timeRange: any = {
                                            startYear: startYear,
                                            endYear: date
                                        }
                                        dispatch(getExpenseStatisticAction(timeRange))
                                            .then((data) => {
                                                setPeriodUsedExpenseList(handlePeriodWithExpenseList(data?.periodListWithUsedExpense))
                                            })
                                            .catch((error) => {
                                
                                            })
                                    }
                                }
                                }}
                            selected={endYear}
                            dateFormat="yyyy"
                            showYearPicker
                            className="h-[40px] w-[90px] border border-black border-1 rounded-md px-2"
                                    />
                        <div className='absolute mr-2'>
                            <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                        </div>
                </div>
            </div>

            <div className='mt-5 w-full flex items-center justify-center'>
                <BarChart data={periodUsedExpenseList} width={1000} height={300}>
                    <CartesianGrid />
                    <XAxis dataKey="period">
                    </XAxis>
                    <YAxis>
                        <Label value="Kinh phí sử dụng (triệu đồng)" angle={-90} position="insideBottomLeft" />
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey="usedExpense" fill="#96060F"/>
                </BarChart>

            </div>

            <div className='mt-2 text-lg font-bold'>
                Chi tiết kinh phí theo đợt
            </div>

            <div className='flex items-center mb-5 mt-2'>
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
                        {periods.length > 0 && <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCurrentPeriod(e.target.value);
                                        onChangePeriod(e.target.value);
                                    }}
                                    defaultValue={periods.length === 0 ? "" : periods[0]._id}
                                    value={currentPeriod}
                                >
                                {periods.map((period, index) => 
                                <option value={period._id} id={period._id}>{periodDisplay(period.period)}</option>
                                )}
                            </select>
                        </div>}
            </div>
            
            {periods.length > 0 ? (<div>
                <div>
                Tổng kinh phí: <span className='text-[#030391]'>{expense?.totalExpense.toLocaleString()}</span> VNĐ
                </div>
                <div className='ml-10'>
                    <div>
                    Loại đề tài:
                    </div>
                    <div className='w-9/10'>
                        <div className='flex w-full'>
                            <div className='w-1/4'>
                                Chính quy:
                            </div>
                            <div className='w-1/4'>
                                Tổng: <span className='text-[#030391]'>{(expense?.allocated.find((x) => x.type === "Chính quy")?.totalExpense)?.toLocaleString()}</span> VNĐ
                            </div>
                            <div className='w-1/4'>
                                Đã dùng: <span className='text-[#030391]'>{expense?.used["Chính quy"] === undefined ? 0 : expense?.used["Chính quy"].toLocaleString()}</span> VNĐ 
                            </div>
                            <div className='w-1/4'>
                                Dư: <span className='text-[#030391]'>{leftExpense("Chính quy")}</span> VNĐ
                            </div>
                        </div>
                    </div>
                    <div className='w-9/10'>
                        <div className='flex w-full'>
                            <div className='w-1/4'>
                                Kỹ sư tài năng:  
                            </div>
                            <div className='w-1/4'>
                                Tổng: <span className='text-[#030391]'>{(expense?.allocated.find((x) => x.type === "Kĩ sư tài năng")?.totalExpense)?.toLocaleString()}</span> VNĐ
                            </div>
                            <div className='w-1/4'>
                                Đã dùng: <span className='text-[#030391]'>{expense?.used["Kĩ sư tài năng"] === undefined ? 0 : expense?.used["Kĩ sư tài năng"].toLocaleString()}</span> VNĐ  
                            </div>
                            <div className='w-1/4'>
                                Dư: <span className='text-[#030391]'>{leftExpense("Kĩ sư tài năng")}</span> VNĐ
                            </div>
                        </div>
                    </div>
                    <div className='w-9/10'>
                        <div className='flex w-full'>
                            <div className='w-1/4'>
                                Chất lượng cao:  
                            </div>
                            <div className='w-1/4'>
                                Tổng: <span className='text-[#030391]'>{(expense?.allocated.find((x) => x.type === "Chất lượng cao")?.totalExpense)?.toLocaleString()}</span> VNĐ
                            </div>
                            <div className='w-1/4'>
                                Đã dùng: <span className='text-[#030391]'>{expense?.used["Chất lượng cao"] === undefined ? 0 : expense?.used["Chất lượng cao"].toLocaleString()}</span> VNĐ   
                            </div>
                            <div className='w-1/4'>
                                Dư: <span className='text-[#030391]'>{leftExpense("Chất lượng cao")}</span> VNĐ
                            </div>
                        </div>
                    </div>
                    <div className='w-9/10'>
                        <div className='flex justify-between'>
                            <div className='w-1/4'>
                                Chất lượng cao (LVTN): 
                            </div>
                            <div className='w-1/4'>
                                Tổng: <span className='text-[#030391]'>{(expense?.allocated.find((x) => x.type === "Chất lượng cao (LVTN)")?.totalExpense)?.toLocaleString()}</span> VNĐ
                            </div>
                            <div className='w-1/4'>
                                Đã dùng: <span className='text-[#030391]'>{expense?.used["Chất lượng cao (LVTN)"] === undefined ? 0 : expense?.used["Chất lượng cao (LVTN)"].toLocaleString()}</span> VNĐ 
                            </div>
                            <div className='w-1/4'>
                                Dư: <span className='text-[#030391]'>{leftExpense("Chất lượng cao (LVTN)")}</span> VNĐ
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    Chi phí chung: <span className='text-[#030391]'>{expense?.generalExpense.toLocaleString()}</span> VNĐ
                </div>

                <div>
                    Dư: <span className='text-[#030391]'>{(expense?.totalExpense - expense?.usedExpense - expense?.generalExpense).toLocaleString()}</span> VNĐ
                </div>
            </div>):
            (<div>
                Không có đợt đăng ký
            </div>)
            }

            {periods.length > 0 && <div>
                <div className='flex items-center mb-1'>
                    <div className='mr-5'>
                        Loại đề tài: 
                    </div>
                    <div className="">
                        <select
                                className="bg-white h-[40px] w-[250px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCurrentType(e.target.value);
                                        onChangeType(e.target.value);
                                    }}
                                    defaultValue={""}
                                >
                                <option value="">Toàn bộ</option>
                                <option value={TopicTypeEnum.CQ}>Chính quy</option>
                                <option value={TopicTypeEnum.KSTN}>Kĩ sư tài năng</option>
                                <option value={TopicTypeEnum.CLC}>Chất lượng cao</option>
                                <option value={TopicTypeEnum.CLC_LVTN}>Chất lượng cao(LVTN)</option>
                            </select>
                    </div>
                </div>

                <TopicListPage topics={topics} 
                    totalPage={totalPage}
                    onChangePage={onChangePage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    />
            </div>}
            
        </div>
    )
}

export default ExpenseStatistic;