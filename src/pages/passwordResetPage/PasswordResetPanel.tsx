import React from 'react';
import BKlogo from "../../assets/images/hcmut.png";
import {Link} from "react-router-dom";

const PasswordResetPanel: React.FC = (props: any) => {
    return (
        <div className='w-full min-h-[calc(100vh-248px)] bg-[#E9E9E9] flex justify-center items-center py-3'>
                <div className='w-1/3 bg-white flex flex-col rounded-lg items-center pt-5 pb-10 px-10'>
                    <div className='w-full flex flex-row justify-center items-center'>
                        <img 
                        src={BKlogo} 
                        alt="BKlogo"
                        className='h-35 w-35'
                        />
                        <div className = 'text-xl font-semibold text-blue-800'>
                        QUÊN MẬT KHẨU
                        </div>
                    </div>

                    <div className='w-full border-t-2 border-black pt-3 pb-5'>
                        <div className='mb-3 mt-1 text-lg font-bold'>
                        Nhập email đã đăng ký để lấy lại mật khẩu
                        </div>

                        <div className='mb-3 mt-3 text-lg font-medium'>
                        Email
                        </div>

                        <input className='w-full h-[40px] border border-black large rounded-lg text-base flex justify-center items-center py-4 mb-3 p-2' />
                        
                    </div>

                    <div className='w-full content-center grid place-items-center'>
                    <Link to={"/myTopic"}>
                    <div className="w-full bg-[#0079CC] transition text-white text-center font-semibold py-5 px-8  border border-white-500  hover:bg-[#025A97] hover:cursor-pointer">
                    XÁC NHẬN
                    </div>
                    </Link>
                    </div>
                </div>
            </div>
    )
}

export default PasswordResetPanel;