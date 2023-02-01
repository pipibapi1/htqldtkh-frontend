import React, {useState} from 'react';
import { TopicStatusEnum } from '../../../../shared/types/topicStatus';
import NewIcon from '../../../../assets/images/new.png';
import CarryOutIcon from '../../../../assets/images/carryOut.png';
import DueToAcceptIcon from '../../../../assets/images/dueToAccept.png';
import FinishedIcon from '../../../../assets/images/finished.png';
import OutOfDateIcon from '../../../../assets/images/outOfDate.png';
import CanceledIcon from '../../../../assets/images/canceled.png';
import { PieChart } from 'react-minimal-pie-chart';
import TopicListPage from './topicListPage';

interface CardProps{
    status: TopicStatusEnum;
    quantity: number;
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

    const moveToTopicListPage = () => {
        setFirstState(false);
    }

    const moveBacktoTopicStatisticPage = () => {
        setFirstState(true);
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
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                <option value="">06/2022</option>
                                <option value="">06/2021</option>
                                <option value="">06/2020</option>
                                <option value="">06/2019</option>
                            </select>
                        </div>
                    </div>
    
                    <div className='w-full flex mt-10 px-10'>
                        <div className='w-1/2'>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.NEW}
                                    quantity={5}
                                />
                            </div>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.DUE_TO_ACCEPT}
                                    quantity={3}
                                />
                            </div>
                            <div>
                                <TopicStatusCard
                                    status={TopicStatusEnum.OUT_OF_DATE}
                                    quantity={1}
                                />
                            </div>
                        </div>
    
                        <div className='w-1/2 ml-20'>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.CARRY_OUT}
                                    quantity={6}
                                />
                            </div>
                            <div className='mb-5'>
                                <TopicStatusCard
                                    status={TopicStatusEnum.FINISHED}
                                    quantity={2}
                                />
                            </div>
                            <div>
                                <TopicStatusCard
                                    status={TopicStatusEnum.CANCELED}
                                    quantity={1}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='text-base font-bold'>
                        Tổng số đề tài: 18
                    </div>
                    <div className='text-base font-normal'>
                        Đã gia hạn: 3
                    </div>
                    <div className='flex justify-center my-10'>
                    <PieChart className='w-1/2 text-[6px]'
                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                    data={[
                        { title: 'Tạo mới', value: 5, color: '#13B04999' },
                        { title: 'Đang thực hiện', value: 6, color: '#1C2ED199' },
                        { title: 'Đến hạn nghiệm thu', value: 3, color: '#A516D899' },
                        { title: 'Đã hoàn thành', value: 2, color: '#0F743899' },
                        { title: 'Trễ hạn', value: 1, color: '#C2C61C99' },
                        { title: 'Bị hủy', value: 1, color: '#CC292999' },
                    ]}
                    />;
                    </div>
                    <div className='w-full flex justify-center items-center'>
                        <div className='font-bold w-2/3 text-center'>
                            THỐNG KÊ CÁC TRẠNG THÁI CỦA TOÀN BỘ CÁC ĐỀ TÀI TRONG ĐỢT 06/2022
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
            <TopicListPage moveBack={moveBacktoTopicStatisticPage}/>
        )
    }
    
}

export default TopicStatistic;