import React, {useState, useRef, useEffect} from 'react';
import { TopicStatusEnum } from '../../../../shared/types/topicStatus';
import NewIcon from '../../../../assets/images/new.png';
import CarryOutIcon from '../../../../assets/images/carryOut.png';
import DueToAcceptIcon from '../../../../assets/images/dueToAccept.png';
import FinishedIcon from '../../../../assets/images/finished.png';
import OutOfDateIcon from '../../../../assets/images/outOfDate.png';
import CanceledIcon from '../../../../assets/images/canceled.png';
import { PieChart } from 'react-minimal-pie-chart';
import TopicListPage from './topicListPage';
import { PeriodStatus } from '../../../../shared/types/periodStatus';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';


import {getAllPeriodsAction} from "../../../../actions/periodAction"
import { getTopicListAction } from '../../../../actions/topicAction';
import { TopicTypeEnum } from '../../../../shared/types/topicType';

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
    productPath: string;
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
        color = "13B049";
        icon = NewIcon;
        type = "tạo mới";
    }

    if(status === TopicStatusEnum.CARRY_OUT){
        color = "1C2ED1";
        icon = CarryOutIcon;
        type = "đang thực hiện";
    }

    if(status === TopicStatusEnum.DUE_TO_ACCEPT){
        color = "A516D8";
        icon = DueToAcceptIcon;
        type = "đến hạn nghiệm thu";
    }

    if(status === TopicStatusEnum.FINISHED){
        color = "0F7438";
        icon = FinishedIcon;
        type = "đã hoàn thành";
    }

    if(status === TopicStatusEnum.OUT_OF_DATE){
        color = "C2C61C";
        icon = OutOfDateIcon;
        type = "trễ hạn"
    }

    if(status === TopicStatusEnum.CANCELED){
        color = "CC2929";
        icon = CanceledIcon;
        type = "bị hủy"
    }
    return(
        <div className='rounded-lg px-2 py-2' style={{ backgroundColor: `#${color}`, opacity: 0.6}}>
            <div className='flex justify-end'>
                <img src={icon} alt="" />
            </div>
            <div className='text-white font-bold text-3xl ml-5'>
                {quantity}
            </div>
            <div className='text-white font-medium text-base ml-5'>
                Tổng số đề tài
            </div>
            <div className='text-white font-medium text-base ml-5'>
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

    const [numOfTotal, setNumOfTotal] = useState(-1);

    const [numOfNew, setNumOfNew] = useState(-1);
    const [numOfCarryOut, setNumOfCarryOut] = useState(-1);
    const [numOfDueToAccept, setNumOfDueToAccept] = useState(-1);
    const [numOfFinished, setNumOfFinished] = useState(-1);
    const [numOfOutOfDated, setNumOfOutOfDated] = useState(-1);
    const [numOfCanceled, setNumOfCanceled] = useState(-1);

    const [numOfExtended, setNumOfExtended] = useState(-1);

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
                    setNumOfCarryOut(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.CARRY_OUT).length)
                    setNumOfDueToAccept(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.DUE_TO_ACCEPT).length)
                    setNumOfFinished(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FINISHED).length)
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
                setCurrentPeriod(data?.periods[0]._id)
                let queryData: any = {
                    period: data?.periods[0]._id
                }
                dispatch(getTopicListAction(queryData))
                .then((data) => {
                    setTopics(data?.topics)
                    setNumOfTotal(data?.topics.length)
                    setNumOfNew(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.NEW).length)
                    setNumOfCarryOut(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.CARRY_OUT).length)
                    setNumOfDueToAccept(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.DUE_TO_ACCEPT).length)
                    setNumOfFinished(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.FINISHED).length)
                    setNumOfOutOfDated(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.OUT_OF_DATE).length)
                    setNumOfCanceled(data?.topics.filter((topic:any) => topic.status === TopicStatusEnum.CANCELED).length)
                    setNumOfExtended(data?.topics.filter((topic:any) => topic.isExtended === true).length)
                    }
                )
                .catch((error) => {

                })
                
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

    const periodDisplay = (period: string) => {
        const x = new Date(period);
        return (x.getMonth() + 1) + "/" + x.getFullYear();
    }

    const periodDisplatFromId = (periodId: string) => {
        const period = periods.find((period) => period._id === periodId);
        if(period){
            return periodDisplay(period.period);
        }
    }

    if(isFirst){
        return(
            <div className="px-5 py-5 flex">
                <div className="w-1/2">
                    <div className='flex items-center mb-5'>
                        <div className='mr-5'>
                                Đợt: 
                        </div>
                        <div className="">
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
                                <option value={period._id} id={period._id}>{periodDisplay(period.period)}</option>
                                )}
                            </select>
                        </div>
                    </div>
    
                    <div className='w-full flex mt-10 px-10'>
                        <div className='w-1/2'>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.NEW}
                                    quantity={numOfNew}
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
                                    status={TopicStatusEnum.OUT_OF_DATE}
                                    quantity={numOfOutOfDated}
                                />
                            </div>
                        </div>
    
                        <div className='w-1/2 ml-20'>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.CARRY_OUT}
                                    quantity={numOfCarryOut}
                                />
                            </div>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.FINISHED}
                                    quantity={numOfFinished}
                                />
                            </div>
                            <div>
                                <TopicStatusCard
                                    status={TopicStatusEnum.CANCELED}
                                    quantity={numOfCanceled}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
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
                        { title: 'Tạo mới', value: numOfNew, color: '#13B04999' },
                        { title: 'Đang thực hiện', value: numOfCarryOut, color: '#1C2ED199' },
                        { title: 'Đến hạn nghiệm thu', value: numOfDueToAccept, color: '#A516D899' },
                        { title: 'Đã hoàn thành', value: numOfFinished, color: '#0F743899' },
                        { title: 'Trễ hạn', value: numOfOutOfDated, color: '#C2C61C99' },
                        { title: 'Bị hủy', value: numOfCanceled, color: '#CC292999' },
                    ]}
                    />;
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <div className='font-bold w-2/3 text-center'>
                            THỐNG KÊ CÁC TRẠNG THÁI CỦA TOÀN BỘ CÁC ĐỀ TÀI TRONG ĐỢT {periodDisplatFromId(currentPeriod)}
                        </div>
                    </div>
                    
                    <div className='flex justify-end mt-10'>
                        <div className='text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer' onClick={moveToTopicListPage}>
                        Danh sách đề tài
                        </div>
                        
                    </div>
                </div>
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