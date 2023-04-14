import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { PieChart } from 'react-minimal-pie-chart';
import { useDispatch} from "react-redux";
import vi from 'date-fns/locale/vi';

import { AppDispatch } from '../../../../store';

import { TopicStatusEnum } from '../../../../shared/types/topicStatus';
import { PeriodStatus } from '../../../../shared/types/periodStatus';
import { TopicTypeEnum } from '../../../../shared/types/topicType';
import { displayPeriod } from '../../../../shared/functions';

import { getAllPeriodsAction } from "../../../../actions/periodAction"
import { getTopicListAction } from '../../../../actions/topicAction';

import TopicListPage from './topicListPage';

import Calendar from "../../../../assets/images/calendar.png";
import NewIcon from '../../../../assets/images/new.png';
import ReadyIcon from "../../../../assets/images/ready.png";
import CarryOutIcon from '../../../../assets/images/carryOut.png';
import FailReviewIcon from "../../../../assets/images/failReview.png";
import DueToAcceptIcon from '../../../../assets/images/dueToAccept.png';
import FinishedIcon from '../../../../assets/images/finished.png';
import FailAcceptIcon from '../../../../assets/images/failAccept.png';
import OutOfDateIcon from '../../../../assets/images/outOfDate.png';
import CanceledIcon from '../../../../assets/images/canceled.png';
interface CardProps{
    status: TopicStatusEnum;
    quantity: number;
}
interface Period{
    _id: string;
    period: string;
    status: PeriodStatus;
    createAt: Date;
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
    student: {
        _id: string;
        name: string;
    }
}


const TopicStatusCard: React.FC<CardProps> = (props: CardProps) => {

    const {status, quantity} = props;
    let color: string = '0';
    let icon: any = "";
    let type: string = "";

    if(status === TopicStatusEnum.NEW){
        color = "4169E1";
        icon = NewIcon;
        type = "tạo mới";
    }

    if(status === TopicStatusEnum.READY){
        color = "32CD32";
        icon = ReadyIcon;
        type = "sẵn sàng xét duyệt";
    }

    if(status === TopicStatusEnum.CARRY_OUT){
        color = "FF8C00";
        icon = CarryOutIcon;
        type = "đang thực hiện";
    }

    if(status === TopicStatusEnum.FAIL_REVIEW){
        color = "FF6347";
        icon = FailReviewIcon;
        type = "rớt xét duyệt";
    }

    if(status === TopicStatusEnum.DUE_TO_ACCEPT){
        color = "008080";
        icon = DueToAcceptIcon;
        type = "đến hạn nghiệm thu";
    }

    if(status === TopicStatusEnum.FINISHED){
        color = "1E90FF";
        icon = FinishedIcon;
        type = "đã hoàn thành";
    }

    if(status === TopicStatusEnum.FAIL_ACCEPT){
        color = "FF4500";
        icon = FailAcceptIcon;
        type = "rớt nghiệm thu";
    }

    if(status === TopicStatusEnum.OUT_OF_DATE){
        color = "B22222";
        icon = OutOfDateIcon;
        type = "trễ hạn"
    }

    if(status === TopicStatusEnum.CANCELED){
        color = "A9A9A9";
        icon = CanceledIcon;
        type = "bị hủy"
    }
    return(
        <div className='rounded-lg px-2 py-2' style={{ backgroundColor: `#${color}`, opacity: 0.6}}>
            <div className='flex justify-end'>
                <img className='h-10' src={icon} alt="" />
            </div>
            <div className='text-white font-bold text-3xl ml-2'>
                {quantity}
            </div>
            <div className='text-white font-medium text-sm ml-2'>
                Số đề tài
            </div>
            <div className='text-white font-medium text-sm ml-2'>
                {type}
            </div>
        </div>
    )
}

const TopicStatistic: React.FC = () => {
    const [isFirst, setFirstState] = useState<boolean>(true);

    const [periods, setPeriods] = useState<Period[]>([]);
    const [currentPeriod, setCurrentPeriod] = useState<string>("");
    const [topics, setTopics] = useState<Topic[]>([]);

    const [numOfTotal, setNumOfTotal] = useState(0);

    const [numOfNew, setNumOfNew] = useState(0);
    const [numOfReady, setNumOfReady] = useState(0);
    const [numOfCarryOut, setNumOfCarryOut] = useState(0);
    const [numOfFailReview, setNumOfFailReview] = useState(0);
    const [numOfDueToAccept, setNumOfDueToAccept] = useState(0);
    const [numOfFinished, setNumOfFinished] = useState(0);
    const [numOfFailAccept, setNumOfFailAccept] = useState(0);
    const [numOfOutOfDated, setNumOfOutOfDated] = useState(0);
    const [numOfCanceled, setNumOfCanceled] = useState(0);

    const [numOfExtended, setNumOfExtended] = useState(0);
    const [year, setYear] = useState(new Date())
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const getTopicList = async(period: string) => {
        let queryData: any = {
            period: period
        }

        dispatch(getTopicListAction(queryData))
                .then((data) => {
                    setTopics(data?.topics)
                    setNumOfTotal(data?.topics.length)
                    setNumOfNew(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.NEW).length)
                    setNumOfReady(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.READY).length)
                    setNumOfCarryOut(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.CARRY_OUT).length)
                    setNumOfFailReview(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FAIL_REVIEW).length)
                    setNumOfDueToAccept(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.DUE_TO_ACCEPT).length)
                    setNumOfFinished(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FINISHED).length)
                    setNumOfFailAccept(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FAIL_ACCEPT).length)
                    setNumOfOutOfDated(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.OUT_OF_DATE).length)
                    setNumOfCanceled(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.CANCELED).length)
                    setNumOfExtended(data?.topics.filter((topic:any) => topic.isExtended === true).length)
                    }
                )
                .catch((error) => {

                })
    }

    useEffect(() => {
        let query= {
            year: (new Date()).getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
                if(data?.periods.length > 0){
                    setCurrentPeriod(data?.periods[0]._id)
                    let queryData: any = {
                        period: data?.periods[0]._id
                    }
                    dispatch(getTopicListAction(queryData))
                    .then((data) => {
                        setTopics(data?.topics)
                        setNumOfTotal(data?.topics.length)
                        setNumOfNew(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.NEW).length)
                        setNumOfReady(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.READY).length)
                        setNumOfCarryOut(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.CARRY_OUT).length)
                        setNumOfFailReview(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FAIL_REVIEW).length)
                        setNumOfDueToAccept(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.DUE_TO_ACCEPT).length)
                        setNumOfFinished(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FINISHED).length)
                        setNumOfFailAccept(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FAIL_ACCEPT).length)
                        setNumOfOutOfDated(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.OUT_OF_DATE).length)
                        setNumOfCanceled(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.CANCELED).length)
                        setNumOfExtended(data?.topics.filter((topic:any) => topic.isExtended === true).length)
                        }
                    )
                    .catch((error) => {
    
                    })
                }
                
            })
            .catch((error) => {
                
            })
    }, []);


    const moveToTopicListPage = () => {
        setFirstState(false);
    }

    const moveBacktoTopicStatisticPage = () => {
        setFirstState(true);
    }

    const periodDisplayFromId = (periodId: string) => {
        const period = periods.find((period) => period._id === periodId);
        if(period){
            return displayPeriod(period.period);
        }
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
                    let queryData: any = {
                        period: data?.periods[0]._id
                    }
                    dispatch(getTopicListAction(queryData))
                    .then((data) => {
                        setTopics(data?.topics)
                        setNumOfTotal(data?.topics.length)
                        setNumOfNew(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.NEW).length)
                        setNumOfReady(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.READY).length)
                        setNumOfCarryOut(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.CARRY_OUT).length)
                        setNumOfFailReview(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FAIL_REVIEW).length)
                        setNumOfDueToAccept(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.DUE_TO_ACCEPT).length)
                        setNumOfFinished(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FINISHED).length)
                        setNumOfFailAccept(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FAIL_ACCEPT).length)
                        setNumOfOutOfDated(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.OUT_OF_DATE).length)
                        setNumOfCanceled(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.CANCELED).length)
                        setNumOfExtended(data?.topics.filter((topic:any) => topic.isExtended === true).length)
                        }
                    )
                    .catch((error) => {
    
                    })
                }
            })
            .catch((error) => {
                
            })
    }

    if(isFirst){
        return(
            <div className="px-5 py-5 flex">
                <div className="w-1/2">

                    <div className='flex items-center mb-5'>
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
                            locale={vi}
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
                                        getTopicList(e.target.value);
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
    
                    {(periods.length > 0 ? <div className='w-full flex mt-10 px-10'>
                        <div className='w-1/3'>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.NEW}
                                    quantity={numOfNew}
                                />
                            </div>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.CARRY_OUT}
                                    quantity={numOfCarryOut}
                                />
                            </div>
                            <div>
                                <TopicStatusCard
                                    status={TopicStatusEnum.FINISHED}
                                    quantity={numOfFinished}
                                />
                            </div>
                        </div>
    
                        <div className='w-1/3 ml-5'>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.READY}
                                    quantity={numOfReady}
                                />
                            </div>
                            <div className='mb-5'>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                <TopicStatusCard
                                    status={TopicStatusEnum.DUE_TO_ACCEPT}
                                    quantity={numOfDueToAccept}
                                />
                            </div>
                            <div>
                                <TopicStatusCard
                                    status={TopicStatusEnum.FAIL_ACCEPT}
                                    quantity={numOfFailAccept}
                                />
                            </div>                  
                        </div>                      

                        <div className='w-1/3 ml-5'>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.FAIL_REVIEW}
                                    quantity={numOfFailReview}
                                />
                            </div>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.OUT_OF_DATE}
                                    quantity={numOfOutOfDated}
                                />
                            </div>
                            <div>
                                <TopicStatusCard
                                    status={TopicStatusEnum.CANCELED}
                                    quantity={numOfCanceled}
                                />
                            </div>
                        </div>
                    </div> : 
                    <div>
                        Không có đợt đăng ký
                    </div>
                    )}
                </div>
                {periods.length > 0 && <div className=''>
                    <div className='text-base font-bold'>
                        Tổng số đề tài: {numOfTotal}
                    </div>
                    <div className='text-base font-normal'>
                        Đã gia hạn: {numOfExtended}
                    </div>
                    <div className='flex justify-center my-10'>
                    <PieChart className='w-1/2 text-[6px]'
                    label={({ dataEntry }) => { return dataEntry.percentage > 0 ? `${Math.round(dataEntry.percentage)} %` : ''}}
                    data={[
                        { title: 'Tạo mới', value: numOfNew, color: 'rgba(65, 105, 225, 0.6)'},
                        { title: 'Sẵn sàng xét duyệt', value: numOfReady, color: 'rgba(50, 205, 50, 0.6)' },
                        { title: 'Đang thực hiện', value: numOfCarryOut, color: 'rgba(255, 140, 0, 0.6)' },
                        { title: 'Rớt xét duyệt', value: numOfFailReview, color: 'rgba(255, 99, 71, 0.6)' },
                        { title: 'Đến hạn nghiệm thu', value: numOfDueToAccept, color: 'rgba(0, 128, 128, 0.6)' },
                        { title: 'Đã hoàn thành', value: numOfFinished, color: 'rgba(30, 144, 255, 0.6)' },
                        { title: 'Rớt nghiệm thu', value: numOfFailAccept, color: 'rgba(255, 69, 0, 0.6)' },
                        { title: 'Trễ hạn', value: numOfOutOfDated, color: 'rgba(178, 34, 34, 0.6)' },
                        { title: 'Bị hủy', value: numOfCanceled, color: 'rgba(169, 169, 169, 0.6)' },
                    ]}
                    />
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <div className='font-bold w-2/3 text-center'>
                            THỐNG KÊ CÁC TRẠNG THÁI CỦA TOÀN BỘ CÁC ĐỀ TÀI TRONG ĐỢT {periodDisplayFromId(currentPeriod)}
                        </div>
                    </div>
                    
                    <div className='flex justify-end mt-10'>
                        <div className='text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer' onClick={moveToTopicListPage}>
                        Danh sách đề tài
                        </div>
                        
                    </div>
                </div>}
            </div>
            
        )
    }
    else{
        return (
            <TopicListPage moveBack={moveBacktoTopicStatisticPage} 
            periods={periods} 
            currentPeriod={currentPeriod}
            setCurrentPeriod={setCurrentPeriod}
            getTopicList={getTopicList}
            />
        )
    }
    
}

export default TopicStatistic;