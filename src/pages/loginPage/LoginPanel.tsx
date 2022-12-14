import React, { useState } from 'react';
import BKlogo from "../../assets/images/hcmut.png";
import EyeOpen from "../../assets/images/eyeOpen.png";
import EyeClose from "../../assets/images/eyeClose.png"
import {Link} from "react-router-dom";

const LoginPanel: React.FC = (props: any) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className='w-full min-h-[calc(100vh-248px)] bg-[#E9E9E9] flex justify-center items-center py-3'>
                <div className='w-1/3 bg-white flex flex-col rounded-lg items-center pt-5 pb-7 px-10 content-center'>
                    <div className='w-full flex flex-row justify-center items-center'>
                        <img 
                        src={BKlogo} 
                        alt="BKlogo"
                        className='h-35 w-35'
                        />
                        <div className = 'text-xl font-semibold text-blue-800 text-center center'>
                        ĐĂNG NHẬP
                        </div>
                    </div>

                    <div className='w-full border-t-2 border-black pt-1 pb-1'>
                        <div className='mb-2 mt-2 text-lg font-bold'>
                        Nhập tài khoản và mật khẩu
                        </div>

                        <div className='mb-1 mt-1 text-lg font-medium'>
                        Tên đăng nhập
                        </div>

                        <input className='w-full h-[40px] border border-black large rounded-lg text-base flex justify-center items-center py-4 mb-3 p-2' />
                        
                        <div className='mb-1 mt-1 text-lg font-medium'>
                        Mật khẩu
                        </div>
                        <div className=' grid justify-items-end items-center'>
                                    <input
                                        type={showPassword? "text":"password"}
                                        name="name"
                                        className="w-full h-[40px] border border-black large rounded-lg text-base flex justify-center items-center py-4 mb-3 p-2"
                                    />
                                    <div className=' absolute mr-2'>
                                        <button onClick={toggleShowPassword}>
                                            {showPassword ? 
                                                (<img src={EyeOpen} alt="eyeIcon" className='h-5 w-6'/>) : 
                                                (<img src={EyeClose} alt="eyeIcon" className='h-5 w-6'/>)
                                            }
                                        </button>
                                    </div>
                        </div>

                        {/* <input className='w-full bg-[#D9D9D9] border border-zinc-600 large rounded-lg text-base flex justify-center items-center py-4 mb-3 hover:bg-[#ffffff]' /> */}
                        
                    </div>

                    <div className='w-full grid grid-cols-2 space-x-3 content-center   '>
                    <Link to={"/myTopic"}>
                    <div className="bg-[#0079CC] w-full transition text-white text-center font-semibold py-4 px-4  border border-white-500  hover:bg-[#025A97] hover:cursor-pointer">
                    ĐĂNG NHẬP
                    </div>
                    </Link>

                    <Link to={"/passwordResetPanel"}>
                    <div className="w-full bg-[#ff0000] transition text-white text-center font-semibold py-4 px-4  border border-white-500  hover:bg-[#b00000] hover:cursor-pointer">
                    QUÊN MẬT KHẨU
                    </div>
                    </Link>
                    </div>
                </div>
            </div>
    )
}

export default LoginPanel;