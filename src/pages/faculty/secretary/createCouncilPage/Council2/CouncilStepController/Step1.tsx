import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DatePicker from 'react-datepicker';

import { AppDispatch } from "../../../../../../store";

import { Period } from "../../../../../../shared/interfaces/periodInterface";
import { displayPeriod } from "../../../../../../shared/functions";

import { getAllPeriodsAction } from "../../../../../../actions/periodAction";

import { useStepperContext } from "./StepperContext";

import Calendar from '../../../../../../assets/images/calendar.png';

export default function Step1() {
    const { council, setCouncil, year, error, setError } = useStepperContext();
    const [currYear, setCurrYear] = useState<Date>(year);
    const [periods, setPeriods] = useState<Period[]>([]);

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    const onChangePeriodSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setCouncil({
            ...council,
            period: value
        })
    }

    const onChangeCouncilName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCouncil({
            ...council,
            name: value
        })
    }

    const onChangeCouncilPlace = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCouncil({
            ...council,
            place: value
        })
    }

    const onChangeCouncilTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCouncil({
            ...council,
            time: value
        })
    }
    
    const onChangeCouncilDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCouncil({
            ...council,
            date: value
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
                if (newPeriods.length === 0) {
                    setError({
                        ...error,
                        periodErr: true
                    })
                }
                else {
                    setError({
                        ...error,
                        periodErr: false
                    })
                }
                if (newPeriods.findIndex((period) => period._id === council.period) === -1) {
                    setCouncil({
                        ...council,
                        period: newPeriods[0]?._id
                    })
                }
            })
    }, [currYear, dispatch, council, setCouncil, error, setError])

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
                                    <option value={period._id} id={period._id} key={period._id}>{displayPeriod(period.period)}</option>
                                )}
                            </select> : "Không có đợt nào. Vui lòng thêm đợt mới"}
                    </div>

                <div className = 'flex flex-row '>
                    <div className = 'px-6 w-full flex flex-col'>
                        <div className = "block mb-2 text-base font-medium text-gray-900">
                            Tên hội đồng:
                        </div>
                        <div className = 'w-full flex flex-col'>
                            <input
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "Tên hội đồng"
                                type="text"
                                value={council.name}
                                onChange={onChangeCouncilName}
                            />
                            <div className="text-sm text-red-600 p-1">
                                {error.nameErr}
                            </div>
                        </div>
                    </div>
                </div>

                <div className = 'flex flex-row '>
                    <div className = 'mx-6 w-full'>
                        <div className = "block mb-2 text-base font-medium text-gray-900">
                            Thời gian:
                        </div>
                        <div className = 'w-full flex flex-col'>
                            <input
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "Thời gian"
                                type="time"
                                value={council.time}
                                onChange={onChangeCouncilTime}
                                required
                            />
                            <div className="text-sm text-red-600 p-1">
                                {error.timeErr}
                            </div>
                        </div>
                    </div>
                    <div className = 'mx-6 w-full'>
                        <div className = "block mb-2 text-base font-medium text-gray-900">
                            Ngày diễn ra :
                        </div>
                        <div className = 'w-full flex flex-col'>
                            <input
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "Ngày diễn ra"
                                value={council.date}
                                onChange={onChangeCouncilDate}
                                type="date"
                                required
                            />
                            <div className="text-sm text-red-600 p-1">
                                {error.dateErr}
                            </div>
                        </div>
                    </div>
                </div>

                <div className = 'flex flex-row '>
                    <div className = 'mx-6 w-full'>
                        <div className = "block mb-2 text-base font-medium text-gray-900">
                            Địa điểm:
                        </div>
                        <div className = 'w-full flex flex-col'>
                            <input
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "Địa điểm"
                                type="text"
                                required
                                value={council.place}
                                onChange={onChangeCouncilPlace}
                            />
                            <div className="text-sm text-red-600 p-1">
                                {error.placeErr}
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
}
