import React from 'react';
import DatePicker from 'react-datepicker';
import Calendar from "../../../../../assets/images/calendar.png";
import ExpenseForType from './expenseForType';

import { PeriodStatus } from '../../../../../shared/types/periodStatus';
import { TopicTypeEnum } from '../../../../../shared/types/topicType';
import { TopicStatusEnum } from '../../../../../shared/types/topicStatus';

import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../../store';

import { getAllPeriodsAction } from '../../../../../actions/periodAction';
import { getExpenseDetailByPeriodAction, postNewExpenseAction, 
    updateExpenseAction } from '../../../../../actions/expenseAction';

interface Props {
    isOpen: boolean,
    setIsOpen: any,
    setDisplayedPeriod: any
}

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
    }[]
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

const AllocatedGeneralExpenseForm: React.FC<Props> = (props: Props) => {
    const {isOpen, setIsOpen, setDisplayedPeriod} = props;
    
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const [periods, setPeriods] = React.useState<Period[]>([]);
    const [expense, setExpense] = React.useState<Expense>({
        _id: "",
        createAt: "",
        lastModified: "",
        note: "",
        generalExpense: 0,
        period: "",
        totalExpense: 0,
        allocated:[]
    });
    const [currYear, setCurrYear] = React.useState(new Date());
    const [currentPeriod, setCurrentPeriod] = React.useState<string>("");

    const onCloseForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(false);
    }

    const periodDisplay = (period: string) => {
        const x = new Date(period);
        return (x.getMonth() + 1) + "/" + x.getFullYear();
    }
  
    const onChangeYear = (date: any) => {
        if(date){
            setCurrYear(date);
        }
        else {
            setCurrYear(new Date())
        }
    }

    const onChangeTotalExpense = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setExpense({
            ...expense,
            totalExpense: isNaN(value)? 0 : value
        })
    }

    const onChangeGeneralExpense = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setExpense({
            ...expense,
            generalExpense: isNaN(value)? 0 : value
        })
    }

    const onClickConfirmBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (expense._id === "") {
            dispatch(postNewExpenseAction(expense, currentPeriod))
                .then((data) => {
                    if (data) {
                        setIsOpen(false);
                        setDisplayedPeriod(currYear, currentPeriod);
                    }
                })
        }
        else {
            dispatch(updateExpenseAction(expense, expense._id))
            .then((data) => {
                if (data) {
                    setIsOpen(false);
                    setDisplayedPeriod(currYear, currentPeriod);
                }
            })
        }
    }

    React.useEffect(() => {
        if (currYear) {
            let query= {
                year: currYear.getFullYear()
            };
            dispatch(getAllPeriodsAction(query))
                .then((data) => {
                    setPeriods(data?.periods);
                    if (data && data.periods.length > 0) {
                        setCurrentPeriod(data.periods[0]._id);
                    }
                });
        }
    }, [currYear, dispatch])

    React.useEffect(() => {
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
                        allocated:[]
                    })
                })
        }
    }, [currentPeriod, dispatch])

    return (
        <div className={`${isOpen? '' : 'hidden'} fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm`}>
            <div className='flex flex-col items-center w-[800px] h-[400px] snap-y overflow-auto overscroll-contain bg-white rounded'>
                <div className='font-bold text-lg mt-2'>
                    Chỉnh sửa thông tin chung
                </div>
                <div className='flex flex-row items-center w-11/12 my-4'>
                    <div className='mr-5'>
                        Năm: 
                    </div>
                    <div className='grid justify-items-end items-center mr-10 relative'>
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
                                onChange={(e) => {
                                    e.preventDefault();
                                    setCurrentPeriod(e.target.value);
                                }}
                                value={currentPeriod}
                            >
                            {periods.map((period, index) => 
                                <option value={period._id} id={period._id} key={period._id}>{periodDisplay(period.period)}</option>
                            )}
                        </select>
                    </div>}
                </div>
                {periods.length? (
                    <>
                        <div className='flex flex-row justify-between my-1 w-11/12'>
                            <div className='flex flex-col'>
                                <div>
                                    Tổng chi phí
                                </div>
                                <input
                                    className='w-[300px] rounded px-2 py-1 my-1 border border-[#1488d8] focus:outline-[#1577d2]'
                                    value={expense?.totalExpense}
                                    onChange={onChangeTotalExpense}
                                >
                                </input>
                            </div>
                            <div className='flex flex-col'>
                                <div>
                                    Chi phí khác
                                </div>
                                <input
                                    className='w-[300px] rounded px-2 py-1 my-1 border border-[#1488d8] focus:outline-[#1577d2]'
                                    value={expense?.generalExpense}
                                    onChange={onChangeGeneralExpense}
                                >
                                </input>
                            </div>
                        </div>
                        {Object.values(TopicTypeEnum).map((type) => {
                            return (
                                <ExpenseForType
                                    key={type}
                                    type={type}
                                    expense={expense}
                                    setExpense={setExpense}
                                />
                            )
                        })}
                    </>
                ) : 
                (<div>
                    Không có đợt đăng ký
                </div>)}
                <div className='flex flex-row justify-evenly w-11/12 my-4'>
                    <button
                        className='py-2 px-6 border border-1 bg-[#1488d8] text-white rounded'
                        onClick={onCloseForm}
                    >
                        Hủy bỏ
                    </button>
                    <button
                        className='py-2 px-6 border border-1 bg-[#1488d8] text-white rounded'
                        onClick={onClickConfirmBtn}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllocatedGeneralExpenseForm;