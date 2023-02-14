import React, { useState } from 'react';
import BackIcon from '../../../assets/images/🦆 icon _arrow circle left_.png';
import DownIcon from '../../../assets/images/down-arrow.png';
import RightIcon from '../../../assets/images/next.png';
import {Link} from "react-router-dom";
import ThongBao from '../../../assets/images/ThongBaoMoiNhat.pdf';

const TopicPaperCard = () => {
    const [show, setShow] = useState(true);
    return (
    <div className='w-4/5 mb-5'>
                <div className='flex items-center'>
                    <div className='mr-2' onClick={(e) => {
                        e.preventDefault();
                        setShow(!show);
                    }}>
                        <img src={show? DownIcon: RightIcon} className='h-7' alt="" />
                    </div>
                    <div className='text-lg font-bold'>
                        Thuyết minh
                    </div>
                </div>
                {show && (<div className='border border-black rounded-lg px-5 pt-5 pb-2 mt-1'>
                    <div className='flex items-center px-5'>
                        <input type="file" 
                                className='file:bg-[#1488D8] 
                                            file:p-3
                                            file:text-white
                                            file:text-sm
                                            file:font-semibold
                                            file:border-none
                                            file:rounded-lg
                                            w-full
                                            text-sm
                                            '

                        />
                        {/* <div className='text-md font-bold ml-2 mr-10'>
                            hoặc
                        </div>
                        <div className="bg-[#1488D8] p-3 text-white font-semibold text-sm rounded-lg hover:bg-[#025A97] hover:cursor-pointer">
                            Tạo mới
                        </div> */}
                    </div>
                    <div className='w-fit text-[#1488D8] text-sm mt-5 hover:underline hover:cursor-pointer'>
                        File biểu mẫu
                    </div>
                </div>)}
            </div>
    )

}


const TopicPapers:React.FC = () => {
    return (
        <div className='p-3'>
            <Link to={'/myTopic'} className='hover:cursor-pointer w-fit'>
                <img src={BackIcon} className='h-5' alt="" />
            </Link>
            <div className='flex flex-col items-center w-full'>

                <TopicPaperCard />
                <TopicPaperCard />
                <TopicPaperCard />
                <TopicPaperCard />
            </div>
        </div>
    )
}

export default TopicPapers;