import React from 'react';
import TopicListPage from './topicListPage';

const ExpenseStatistic: React.FC = () => {
    return(
        <div className='px-5 py-5'>
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
            
            <div>
                <div>
                Tổng kinh phí: <span className='text-[#030391]'>79.000.000</span> VNĐ
                </div>
                <div className='ml-10'>
                    <div>
                    Loại đề tài:
                    </div>
                    <div className='w-9/10'>
                        <div className='flex w-full'>
                            <div className='w-1/4'>
                                Chính quy:
                            </div>
                            <div className='w-1/4'>
                                Mỗi đề tài: <span className='text-[#030391]'>5.000.000</span> VNĐ
                            </div>
                            <div className='w-1/4'>
                                Đã dùng: <span className='text-[#030391]'>15.000.000</span> VNĐ 
                            </div>
                            <div className='w-1/4'>
                                Dư: <span className='text-[#030391]'>0</span> VNĐ
                            </div>
                        </div>
                    </div>
                    <div className='w-9/10'>
                        <div className='flex w-full'>
                            <div className='w-1/4'>
                                Kỹ sư tài năng:  
                            </div>
                            <div className='w-1/4'>
                                Tổng: <span className='text-[#030391]'>30.000.000</span> VNĐ
                            </div>
                            <div className='w-1/4'>
                                Đã dùng: <span className='text-[#030391]'>30.000.000</span> VNĐ  
                            </div>
                            <div className='w-1/4'>
                                Dư: <span className='text-[#030391]'>0</span> VNĐ
                            </div>
                        </div>
                    </div>
                    <div className='w-9/10'>
                        <div className='flex w-full'>
                            <div className='w-1/4'>
                                Chất lượng cao:  
                            </div>
                            <div className='w-1/4'>
                                Tổng: <span className='text-[#030391]'>30.000.000</span> VNĐ
                            </div>
                            <div className='w-1/4'>
                                Đã dùng: <span className='text-[#030391]'>15.000.000</span> VNĐ   
                            </div>
                            <div className='w-1/4'>
                                Dư: <span className='text-[#030391]'>15.000.000</span> VNĐ
                            </div>
                        </div>
                    </div>
                    <div className='w-9/10'>
                        <div className='flex justify-between'>
                            <div className='w-1/4'>
                                Chất lượng cao (LVTN): 
                            </div>
                            <div className='w-1/4'>
                                Tổng: <span className='text-[#030391]'>15.000.000</span> VNĐ
                            </div>
                            <div className='w-1/4'>
                                Đã dùng: <span className='text-[#030391]'>15.000.000</span> VNĐ 
                            </div>
                            <div className='w-1/4'>
                                Dư: <span className='text-[#030391]'>0</span> VNĐ
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    Chi phí chung: <span className='text-[#030391]'>4.000.000</span> VNĐ
                </div>

                <div>
                    Dư: <span className='text-[#030391]'>0</span> VNĐ
                </div>
            </div>

            <div>
                <div className='flex items-center mb-1'>
                    <div className='mr-5'>
                        Loại đề tài: 
                    </div>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                onChange={(e) => {
                                }}
                                defaultValue={"dfdasf"}
                            >
                                <option value="">Tạo mới</option>
                                <option value="">Đang thực hiện</option>
                                <option value="">Đến hạn nghiệm thu</option>
                                <option value="">Đã hoàn thành</option>
                                <option value="">Trễ hạn</option>
                                <option value="">Bị hủy</option>
                        </select>
                    </div>
                </div>

                <TopicListPage />
            </div>
            
        </div>
    )
}

export default ExpenseStatistic;