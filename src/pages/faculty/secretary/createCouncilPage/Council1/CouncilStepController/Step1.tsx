import React, { useState, useEffect } from "react";
import { useStepperContext } from "./StepperContext";

import { getAllPeriodsAction } from "../../../../../../actions/periodAction";
import { AppDispatch } from "../../../../../../store";
import { useDispatch } from "react-redux";

import DatePicker from 'react-datepicker';
import Calendar from '../../../../../../assets/images/calendar.png';

import { Period } from "../../../../../../shared/interfaces/periodInterface";

export default function Step1() {
    const { council, setCouncil, year } = useStepperContext();
    const [currYear, setCurrYear] = useState<Date>(year);
    const [periods, setPeriods] = useState<Period[]>([]);

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    const periodDisplay = (period: string) => {
        const x = new Date(period);
        return (x.getMonth() + 1) + "/" + x.getFullYear();
    }

    const onChangePeriodSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCouncil({
            ...council,
            period: event.target.value
        })
    }

    const onChangeCouncilName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCouncil({
            ...council,
            name: event.target.value
        })
    }

    const onChangeCouncilPlace = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCouncil({
            ...council,
            place: event.target.value
        })
    }

    const onChangeCouncilTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCouncil({
            ...council,
            time: event.target.value
        })
    }
    
    const onChangeCouncilDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCouncil({
            ...council,
            date: event.target.value
        })
    }

    useEffect(()=>{
        let query: any = {
            year: currYear.getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                const newPeriods: Period[] = data?.periods;
                setPeriods(newPeriods);
                if (newPeriods.findIndex((period) => period._id === council.period) === -1) {
                    setCouncil({
                        ...council,
                        period: newPeriods[0]?._id
                    })
                }
            })
    }, [currYear, dispatch, council, setCouncil])

    return (
        <div className="flex flex-col ">
            <div className="mx-2 w-full flex-1">
                <div className = 'mb-4 pb-2 text-xl font-normal text-gray-900 text-center'>
                    Bước 1: Thêm thông tin chung
                </div>
                <form className = "space-y-4" action = "#">
                    <div className='flex flex-row items-center mb-5'>
                        <div className = "block mx-6 text-base font-medium text-gray-900">
                            Năm:
                        </div>
                        <div className='grid justify-items-end items-center mr-10 relative'>
                            <DatePicker
                                onChange={date => {
                                    if(date){
                                        setCurrYear(date);
                                    }
                                    }}
                                selected={currYear}
                                dateFormat="yyyy"
                                showYearPicker
                                className="h-[40px] w-[90px] border border-black border-1 rounded-md px-2"
                            />
                            <div className='absolute mr-2'>
                                <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                            </div>
                        </div>
                        <div 
                            className = "block mr-5 text-base font-medium text-gray-900"
                        >
                            Đợt:
                        </div>
                        {periods.length > 0? <select
                                    className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={onChangePeriodSelect}
                                    value={council.period}
                                >
                                {periods.map((period, index) => 
                                    <option value={period._id} id={period._id} key={period._id}>{periodDisplay(period.period)}</option>
                                )}
                            </select> : "Không có đợt nào"}
                    </div>

                <div className = 'flex flex-row '>
                    <div className = 'mx-6 w-full '>
                        <div className = "block mb-2 text-base font-medium text-gray-900">
                            Tên hội đồng:
                        </div>
                        <input
                            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder = "Tên hội đồng"
                            type="text"
                            value={council.name}
                            onChange={onChangeCouncilName}
                        />
                    </div>
                </div>

                <div className = 'flex flex-row '>
                    <div className = 'mx-6 w-full'>
                        <div className = "block mb-2 text-base font-medium text-gray-900">
                            Thời gian:
                        </div>
                        <input
                            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder = "Thời gian"
                            type="time"
                            value={council.time}
                            onChange={onChangeCouncilTime}
                            required
                        />
                    </div>
                    <div className = 'mx-6 w-full'>
                        <div className = "block mb-2 text-base font-medium text-gray-900">
                            Ngày diễn ra :
                        </div>
                        <input
                            className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="dd-mm-yyyy"
                            value={council.date}
                            onChange={onChangeCouncilDate}
                            type="date"
                            required
                        />
                    </div>
                </div>

                <div className = 'flex flex-row '>
                    <div className = 'mx-6 w-full'>
                    <div className = "block mb-2 text-base font-medium text-gray-900">
                        Địa điểm:
                    </div>
                    <input
                        className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder = "Địa điểm"
                        type="text"
                        required
                        value={council.place}
                        onChange={onChangeCouncilPlace}
                    />
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}
