import React, { useState, Fragment, useEffect } from 'react';
import AddCouncilModal from "./AddCouncilModal";
import CouncilList from './CouncilList';

import DatePicker from 'react-datepicker';
import Calendar from '../../../../../assets/images/calendar.png';

import { CouncilStatisticIntf, CouncilInfoIntf } from '../../../../../shared/interfaces/councilInterface';
import { Period } from '../../../../../shared/interfaces/periodInterface';

import { getAllPeriodsAction } from '../../../../../actions/periodAction';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../../store';
import CouncilService from '../../../../../services/councilService';

const RECORD_PER_PAGE = 5;
const TOTAL_PAGE_DEFAULT = 1;

const CouncilsGeneralInfo: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(TOTAL_PAGE_DEFAULT);

    const [year, setYear] = useState(new Date());
    const [periods, setPeriods] = useState<Period[]>([]);
    const [currentPeriod, setCurrentPeriod] = useState<string>(periods.length === 0 ? "" : periods[0]._id);

    const [councilStatistic, setCouncilStatistic] = useState<CouncilStatisticIntf>({});
    const [councilList, setCouncilList] = useState<CouncilInfoIntf[]>([]);
    console.log(councilList);

    const totalPage = councilStatistic.numCouncil? (Math.floor((councilStatistic.numCouncil - 1) / RECORD_PER_PAGE) + 1):1;

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    const periodDisplay = (period: string) => {
        const x = new Date(period);
        return (x.getMonth() + 1) + "/" + x.getFullYear();
    }

    useEffect(() => {
        let query: any = {
            year: year.getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
                setCurrentPeriod(data?.periods[0]._id)
            })
    }, [year, dispatch])

    useEffect(() => {
        if (currentPeriod) {
            const queryData = {
                type: "Nghiệm thu",
                period: currentPeriod
            }
            CouncilService.getCouncilStatistic(queryData)
                .then((data) => {
                    setCouncilStatistic(data);
                })
        }
    }, [currentPeriod])

    useEffect(() => {
        if (currentPeriod) {
            const queryData = {
                type: "Nghiệm thu",
                period: currentPeriod
            }
            CouncilService.getListCouncil(queryData)
                .then((data) => {
                    if (data) {
                        setCouncilList(data);
                    }
                    else {
                        setCouncilList([])
                    }
                })
        }
    }, [currentPeriod])

    return(
        <div className='p-4 overflow-y-auto'>
            <Fragment>
            <div className='flex items-center mb-5'>
                <div className='mr-5'>
                    Năm: 
                </div>
                <div className='grid justify-items-end items-center mr-10'>
                    <DatePicker
                        onChange={date => {
                            if(date){
                                setYear(date);
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
                {periods.length > 0 && <select
                        className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                            onChange={(e) => {
                                e.preventDefault();
                                setCurrentPeriod(e.target.value);
                            }}
                            defaultValue={periods.length === 0 ? "" : periods[0]._id}
                        >
                        {periods.map((period, index) => 
                        <option value={period._id} id={period._id} key={period._id}>{periodDisplay(period.period)}</option>
                        )}
                    </select>}
            </div>
            
            <div>
                <div>
                    Số đề tài cần được nghiệm thu: <span className='text-[#030391]'>
                        {councilStatistic.topicNeedCouncil}
                    </span> 
                </div>
                <div>
                    Số đề tài đã có hội đồng nghiệm thu: <span className='text-[#030391]'>
                        {councilStatistic.topicHadCouncil}
                    </span> 
                </div>
                <div>
                    Số lượng hội đồng: <span className='text-[#030391]'>
                        {councilStatistic.numCouncil}
                    </span> 
                </div>
            </div>
            <div className='grid justify-items-end px-5'>
                <div className='flex items-center py-4'>
                    <div className='flex items-center'>
                        <div className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer" onClick={() => setShowModal(true)}>
                            Thêm hội đồng
                        </div>
                    </div>
                </div>
            </div>
            <CouncilList
                councilList={councilList}
                totalPage={totalPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <AddCouncilModal isVisible = {showModal} onClose = {() => setShowModal(false)}/>
            </Fragment>
        </div>
    )
}

export default CouncilsGeneralInfo;