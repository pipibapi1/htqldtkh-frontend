import React from 'react';
import BKlogo from "../../assets/images/hcmut.png";
import {Link} from "react-router-dom";
import LoginIndex from './LoginIndex';

const ChooseRolePanel: React.FC = (props: any) => {
    return (
        <div className='w-full min-h-[calc(100vh-248px)] bg-[#E9E9E9] flex justify-center items-center py-3'>
                <div className='bg-white flex flex-col rounded-lg items-center pt-5 pb-7 px-20'>
                    <div className='center'>
                        <img 
                        src={BKlogo} 
                        alt="BKlogo"
                        className='h-35 w-35'
                        />
                    </div>

                    <div className='border-t-2 border-b-2 border-black pb-3'>
                        <div className='mb-3 mt-3 text-lg font-bold'>
                        Đăng nhập trên quyền truy cập của
                        </div>
                       
                        <Link
                            to={"/loginPanel"}
                        >
                            <div className='bg-[#D9D9D9] rounded-lg text-base flex justify-center items-center py-4 mb-3 hover:bg-[#B5B5B5]'>
                                Chủ nhiệm đề tài
                            </div>
                        </Link>
                        <Link
                            to={"/fsExpenseStatistic"}
                        >
                            <div className='bg-[#D9D9D9] rounded-lg text-base flex justify-center items-center py-4 mb-3 hover:bg-[#B5B5B5]'>
                                Thư ký Khoa
                            </div>
                        </Link>
                        <Link
                            to={"/fvdExpenseStatistic"}
                        >
                            <div className='bg-[#D9D9D9] rounded-lg text-base flex justify-center items-center py-4 mb-3 hover:bg-[#B5B5B5]'>
                                Phó chủ nhiệm Khoa
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default ChooseRolePanel;