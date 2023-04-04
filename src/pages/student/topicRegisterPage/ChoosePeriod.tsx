import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";

import { AppDispatch } from '../../../store';

import { Period } from '../../../shared/interfaces/periodInterface';
import { PeriodStatus } from '../../../shared/types/periodStatus';

import { getAllPeriodsAction } from "../../../actions/periodAction";

import PeriodRowTable from './PeriodRowTable';

import Calendar from "../../../assets/images/calendar.png";

const ChoosePeriod = (props: any) => {
    const {choosePeriod, setTopic, topic} = props

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [periods, setPeriods] = useState<Period[]>([])
    const [year, setYear] = useState(new Date());
    const [status, setStatus] = useState("")
    
    useEffect(() => {
        let query= {
            year: (new Date()).getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
            })
            .catch((error) => {
                
            })
    }, [dispatch]);

    const onChangeYear = (d: Date) => {
        let query: any = {
            year: d.getFullYear()
        }
        if(status !== ""){
            query = {
                ...query,
                status: status
            }
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
            })
            .catch((error) => {
                
            })
    }

    const onChangeStatus = (s: string) =>{
        let query: any = {
            year: year.getFullYear(),
        }
        if(s !== ""){
            query = {
                ...query,
                status: s
            }
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
            })
            .catch((error) => {
                
            })
    }

    return(
        <div className="p-4">
            <div className='flex items-center'>
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
            </div>

            <div className='grid justify-items-end px-5'>
                <div className='flex items-center py-4'>
                    <div className='flex items-center'>
                        <div className='mr-3'>
                            Trạng thái: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[250px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setStatus(e.target.value);
                                        onChangeStatus(e.target.value)
                                    }}
                                    defaultValue={""}
                                >
                                <option value="">Toàn bộ</option>
                                {Object.values(PeriodStatus).map((value) => {
                                    return <option value={value} key={value}>{value}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {periods.length > 0 ? null : (
                <div className='mt-5'> 
                    Không có đợt đăng ký
                </div>
            )}

            {periods.length > 0 &&<div className='grid justify-items-start'>
                <div className='text-xl font-bold mb-2'>
                    Đợt đăng ký
                </div>
            </div>}

            {periods.length > 0 &&<div className='w-full'>
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
                                        className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Đợt đăng ký
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
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {periods.map((period, index) => {
                                        return(
                                            <PeriodRowTable 
                                                key={index}
                                                index={index+1}
                                                period={period}
                                                choosePeriod={choosePeriod}
                                                topic={topic}
                                                setTopic={setTopic}
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
        </div>
    )
}

export default ChoosePeriod;