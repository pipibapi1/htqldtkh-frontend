import React from 'react';
import BKlogo from "../../assets/images/hcmut.png";
import {Link} from "react-router-dom";

const LoginPanel: React.FC = (props: any) => {
    return (
        <div className='w-auto h-[calc(150vh-400px)] bg-[#E9E9E9] flex justify-center items-center'>
                <div className='w-1/3 bg-white flex flex-col rounded-lg items-center pt-10 pb-20 px-20'>
                    <div className='w-full flex flex-row content-center '>
                        <img 
                        src={BKlogo} 
                        alt="BKlogo"
                        className='h-40 w-40'
                        />
                        <div className = 'pt-14 pb-20 text-2xl font-extrabold text-blue-800'>
                        ĐĂNG NHẬP
                        </div>
                    </div>

                    <div className='w-full border-t-2   border-black pt-3 pb-5'>
                        <div className='mb-3 mt-3 text-lg font-bold'>
                        Nhập tài khoản và mật khẩu
                        </div>

                        <div className='mb-3 mt-3 text-lg font-medium'>
                        Tên đăng nhập
                        </div>

                        <input className='w-full bg-[#D9D9D9] border border-zinc-600 large rounded-lg text-base flex justify-center items-center py-4 mb-3 hover:bg-[#ffffff]' />
                        
                        <div className='mb-3 mt-3 text-lg font-medium'>
                        Mật khẩu
                        </div>

                        <input className='w-full bg-[#D9D9D9] border border-zinc-600 large rounded-lg text-base flex justify-center items-center py-4 mb-3 hover:bg-[#ffffff]' />
                        
                    </div>

                    <div className='w-full flex flex-row content-center '>
                    <Link to={"/myTopic"}>
                    <div className="bg-[#0079CC] transition text-white text-center font-semibold py-4 px-4 mr-10 border border-white-500  hover:bg-[#025A97] hover:cursor-pointer">
                    ĐĂNG NHẬP
                    </div>
                    </Link>

                    <Link to={"/passwordPanel"}>
                    <div className="w-full bg-[#ff0000] transition text-white text-center font-semibold py-4 px-4 ml-1  border border-white-500  hover:bg-[#b00000] hover:cursor-pointer">
                    QUÊN MẬT KHẨU
                    </div>
                    </Link>
                    </div>
                </div>
            </div>
    )
}

export default LoginPanel;