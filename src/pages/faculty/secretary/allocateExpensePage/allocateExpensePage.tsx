import {FC, useState, useEffect} from 'react';

import DatePicker from 'react-datepicker';
import Calendar from "../../../../assets/images/calendar.png";

import { PeriodStatus } from '../../../../shared/types/periodStatus';
import { TopicTypeEnum } from '../../../../shared/types/topicType';
import { TopicStatusEnum } from '../../../../shared/types/topicStatus';

import { getAllPeriodsAction } from "../../../../actions/periodAction";
import { getExpenseDetailByPeriodAction } from '../../../../actions/expenseAction';
import { getTopicListAction } from '../../../../actions/topicAction';

import AllocatedGeneralExpenseForm from './AllocateGeneralExpenseForm/indes';
import AllocateTopicExpenseForm from './AllocatedTopicExpenseForm';
import TopicListComponent from './TopicListComponent';

import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';

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
    used: {[k: string]: number}
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
    productPath: string;
    studentId: string;
    creationDate: string;
    topicGivenId: string;
    expense: number;
    student: {
        _id: string;
        name: string;
    }
}

interface TopicExpenseFormData {
    topic: Topic,
    isOpen: boolean
}

const initExpense = {
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
    used: {}
}

const initTopic = {
    _id: "",
    name: "",
    type: TopicTypeEnum.CQ,
    startTime: "",
    endTime: "",
    isExtended: false,
    extensionTime: 0,
    status: TopicStatusEnum.NEW, 
    period: "",
    productPath: "",
    studentId: "",
    creationDate: "",
    topicGivenId: "",
    expense: 0,
    student: {
        _id: "",
        name: ""
    }
}

const AllocateExpensePage: FC = () => {
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const [periods, setPeriods] = useState<Period[]>([]);
    const [expense, setExpense] = useState<Expense>(initExpense);
    const [currYear, setCurrYear] = useState(new Date());
    const [topics, setTopics] = useState<Topic[]>([]);
    const [currentPeriod, setCurrentPeriod] = useState<string>("");
    const [currentType, setCurrentType] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);

    const [isOpenAllocatedForm, setIsOpenAllocatedForm] = useState<boolean>(false);
    const [topicExpenseFormData, setTopicExpenseFormData] = useState<TopicExpenseFormData>({
        topic: initTopic,
        isOpen: false
    })

    const periodDisplay = (period: string) => {
        const x = new Date(period);
        return (x.getMonth() + 1) + "/" + x.getFullYear();
    }

    const onChangeTopicType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentType(event.target.value);
    }

    const onClickSetExpenseBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpenAllocatedForm(true);
    }

    const onChangePeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const period = event.target.value;
        setCurrentPeriod(period); 
        dispatch(getExpenseDetailByPeriodAction({period: period}))
            .then((data) => {
                setExpense(data?.expense)
            });
    }

    const onChangeYear = (date: any) => {
        if(date){
            setCurrYear(date);
        }
        else {
            setCurrYear(new Date())
        }
    }

    const setDisplayedPeriod = (year: any, period: string) => {
        setCurrYear(year);
        setCurrentPeriod(period);
    }

    const onChangePage = (newPage: number) => {
        setCurrentPage(newPage);
    }

    useEffect(() => {
        if (currYear) {
            let query= {
                year: currYear.getFullYear()
            };
            dispatch(getAllPeriodsAction(query))
                .then((data) => {
                    setPeriods(data?.periods);
                    if (data && data.periods.length > 0) {
                        setCurrentPeriod(data.periods[0]._id);
                        // dispatch(getExpenseDetailByPeriodAction({period: data.periods[0]._id}))
                        // .then((data) => {
                        //     setExpense(data?.expense);
                        // })
                        // .catch((error) => {
                        //     setExpense({
                        //         _id: "",
                        //         createAt: "",
                        //         lastModified: "",
                        //         note: "",
                        //         generalExpense: 0,
                        //         period: "",
                        //         totalExpense: 0,
                        //         allocated:[{
                        //             type: "",
                        //             totalExpense: 0,
                        //             maxExpensePerTopic: 0}
                        //         ],
                        //         usedExpense:0,
                        //         used: {}
                        //     })
                        // })
                        // setCurrentPage(1);
                        // setCurrentType("");
                        // let queryForTopic: any = {
                        //     period: data.periods[0]._id,
                        //     page: 1,
                        //     limit: RECORD_PER_PAGE,
                        // }
                        // dispatch(getTopicListAction(queryForTopic))
                        // .then((data) => {
                        //     setTopics(data?.topics)
                        //     if(data?.metadata.totalPage > 0){
                        //         setTotalPage(data?.metadata.totalPage)
                        //     }
                        // })
                        // .catch((error) => {
                        // })
                    }
                });
        }
    }, [currYear, dispatch])

    useEffect(() => {
        if (currentPeriod) {
            let query= {
                period: currentPeriod
            };
            dispatch(getExpenseDetailByPeriodAction(query))
                .then((data) => {
                    setExpense(data?.expense);
                })
                .catch((error) => {
                    setExpense({
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
                        used: {}
                    })
                })
            setCurrentPage(1);
            setCurrentType("")
        }
    }, [currentPeriod, dispatch])

    useEffect(() => {
        let query: any = {
            period: currentPeriod,
            page: currentPage,
            limit: RECORD_PER_PAGE,
        }
        if (currentType !== "") {
            query = {
                ...query,
                type: currentType
            }
        }
        dispatch(getTopicListAction(query))
        .then((data) => {
            setTopics(data?.topics)
            if(data?.metadata.totalPage > 0){
                setTotalPage(data?.metadata.totalPage)
            }
        })
        .catch((error) => {
        })
    }, [currentPage, currentPeriod, currentType, dispatch])
    
    const leftExpense = (type: string) => {
        if(expense?.allocated.find((x) => x.type === type)?.totalExpense){
            return ((expense?.allocated.find((x) => x.type === type)?.totalExpense as number) - (expense?.used[type] === undefined ? 0 : expense?.used[type])).toLocaleString() + ' VNĐ'
        }
        return (
            <i>Không đủ dữ liệu</i>
        )
    }

    const getTotalExpenseByType = (type: string) => {
        const totalExpense = expense?.allocated.find((x) => x.type === type)?.totalExpense;
        if (totalExpense) {
            return totalExpense.toLocaleString() + 'VNĐ'
        }
        else {
            return (
                <i>Không có</i>
            )
        }
    }
    
    const getMaxExpensePerTopicByType = (type: string) => {
        const maxExpensePer = expense?.allocated.find((x) => x.type === type)?.maxExpensePerTopic;
        if (maxExpensePer) {
            return maxExpensePer.toLocaleString() + 'VNĐ'
        }
        else {
            return (
                <i>Không có</i>
            )
        }
    }

    const onOpenTopicExpenseForm = (topic: Topic) => {
        setTopicExpenseFormData({
            topic: topic,
            isOpen: true
        })
    }

    const onConfirmTopicExpenseForm = (newTopicExpense: number) => {
        let query= {
            period: currentPeriod
        };
        dispatch(getExpenseDetailByPeriodAction(query))
            .then((data) => {
                setExpense(data?.expense);
            })
        const newTopics = topics.map((topic) => {
            if (topic._id === topicExpenseFormData.topic._id) {
                return {
                    ...topic,
                    expense: newTopicExpense
                }
            }
            else return topic
        });
        setTopics(newTopics);
        setTopicExpenseFormData({
            ...topicExpenseFormData,
            isOpen: false
        })
    }

    const onCancelTopicExpenseForm = () => {
        setTopicExpenseFormData({
            ...topicExpenseFormData,
            isOpen: false
        })
    }

    return(
        <div className='px-5 py-2'>
            <div className='flex flex-row justify-between items-center mb-5 mt-2 w-4/5'>
                <div className='flex flex-row items-center'>
                    <div className='mr-5'>
                        Năm: 
                    </div>
                    <div className='grid justify-items-end items-center mr-10'>
                        <DatePicker
                            onChange={onChangeYear}
                            selected={currYear}
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
                                onChange={onChangePeriod}
                                value={currentPeriod}
                            >
                            {periods.map((period, index) => 
                                <option value={period._id} id={period._id} key={period._id}>{periodDisplay(period.period)}</option>
                            )}
                        </select>
                    </div>}
                </div>
                {periods.length > 0 && <button
                    className='btn bg-[#1488d8] text-white rounded py-2 px-5'
                    onClick={onClickSetExpenseBtn}
                >
                    Chỉnh sửa
                </button>}
            </div>
            
            {periods.length > 0 ? (<div className='mb-5'>
                <div>
                    Tổng kinh phí: <span className='text-[#030391]'>{expense?.totalExpense.toLocaleString()}</span> VNĐ
                </div>
                <div>
                    Loại đề tài:
                </div>
                <div className='ml-6'>
                    {Object.values(TopicTypeEnum).map((type) => {
                        return (
                            <div className='w-9/10' key={type}>
                                <div className='flex flex-col w-full border-x-0 border-y'>
                                    <div className='w-1/2 mb-1'>
                                        {type}:
                                    </div>
                                    <div className='flex flex-row mb-1 mx-4'>
                                        <div className='w-1/2'>
                                            Tổng: <span className='text-[#030391]'>
                                                {getTotalExpenseByType(type)}
                                            </span>
                                        </div>
                                        <div className='w-1/2'>
                                            Tối đa mỗi đề tài: <span className='text-[#030391]'>{getMaxExpensePerTopicByType(type)}</span>
                                        </div>
                                    </div>
                                    <div className='flex flex-row mb-1 mx-4'>
                                        <div className='w-1/2'>
                                            Đã dùng: <span className='text-[#030391]'>{expense?.used[type] === undefined ? 0 : expense?.used[type].toLocaleString()}</span> VNĐ 
                                        </div>
                                        <div className='w-1/2'>
                                            Dư: <span className='text-[#030391]'>{leftExpense(type)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    Chi phí chung: <span className='text-[#030391]'>{expense?.generalExpense.toLocaleString()}</span> VNĐ
                </div>

                <div>
                    Dư: <span className='text-[#030391]'>{(expense?.totalExpense - expense?.usedExpense - expense?.generalExpense).toLocaleString()}</span> VNĐ
                </div>
            </div>) :
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
                            defaultValue={""}
                            onChange={onChangeTopicType}
                        >
                            <option value="">Toàn bộ</option>
                            <option value={TopicTypeEnum.CQ}>Chính quy</option>
                            <option value={TopicTypeEnum.KSTN}>Kĩ sư tài năng</option>
                            <option value={TopicTypeEnum.CLC}>Chất lượng cao</option>
                            <option value={TopicTypeEnum.CLC_LVTN}>Chất lượng cao(LVTN)</option>
                        </select>
                    </div>
                </div>
            </div>}
                        
            {periods.length > 0 && <TopicListComponent 
                topics={topics} 
                totalPage={totalPage}
                onChangePage={onChangePage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onOpenTopicExpenseForm={onOpenTopicExpenseForm}
            />}

            <AllocatedGeneralExpenseForm
                isOpen={isOpenAllocatedForm}
                setIsOpen={setIsOpenAllocatedForm}
                setDisplayedPeriod={setDisplayedPeriod}
            />
            {topicExpenseFormData.isOpen && topicExpenseFormData.topic.expense !== undefined && (
                <AllocateTopicExpenseForm 
                    data={topicExpenseFormData}
                    year={currYear.getFullYear()}
                    period={periods.find(period => period._id === currentPeriod)?.period}
                    expenseRule={expense}
                    onConfirm={onConfirmTopicExpenseForm}
                    onCancel={onCancelTopicExpenseForm}
                />
            )}
        </div>
    )
}

export default AllocateExpensePage;