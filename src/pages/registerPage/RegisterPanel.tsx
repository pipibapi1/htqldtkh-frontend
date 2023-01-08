import React, { useState } from 'react';
import BKlogo from "../../assets/images/hcmut.png";
import Calendar from "../../assets/images/calendar.png";
import EyeOpen from "../../assets/images/eyeOpen.png";
import EyeClose from "../../assets/images/eyeClose.png"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const RegisterPanel: React.FC = (props: any) => {
    const [birhtDate, setBirthDate] = useState(new Date());
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    
    return(
        <div className='w-full min-h-[calc(100vh-248px)] h-[100%] bg-[#E9E9E9] flex justify-center items-center'>
            <div className='bg-white flex flex-col rounded-lg items-center py-3 px-20'>
                <div className='flex justify-center items-center'>
                        <img 
                        src={BKlogo} 
                        alt="BKlogo"
                        className='h-35 w-35'
                        />
                        <div className='text-[#030391] text-lg font-semibold'>
                            ĐĂNG KÝ TÀI KHOẢN
                        </div>
                </div>

                <div className='border-t-2 border-b-2 border-[#B5B5B5] border-black pt-3 pb-5 mb-5'>
                        <div className='mb-3 text-lg font-bold'>
                        Nhập thông tin cần thiết để đăng ký tài khoản
                        </div>

                        <div className='flex mb-2'>
                            <div className='mr-7'>
                                <div>
                                    Họ và tên lót *
                                </div>
                                <input
                                    type="text"
                                    name="lastAndMiddleName"
                                    className="w-full border border-black border-1 rounded-lg p-2"
                                    />
                            </div>
                            
                            <div className='ml-7'>
                                <div>
                                    Tên *
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    className="border border-black border-1 rounded-lg p-2"
                                />
                            </div>
                        </div>

                        <div className='flex mb-2'>
                            <div className='mr-7'>
                                <div>
                                    Mã số sinh viên *
                                </div>
                                <input
                                    type="text"
                                    name="studentId"
                                    className="border border-black border-1 rounded-lg p-2"
                                    />
                            </div>
                            
                            <div className='ml-7'>
                                <div>
                                    Giới tính *
                                </div>
                                <div className="">
                                    <select
                                        className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                        onChange={(e) => {

                                        }}
                                        defaultValue={"dfdasf"}
                                    >
                                        <option value="">Nam</option>
                                        <option value="">Nữ</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='flex mb-2'>
                            <div className='mr-7'>
                                <div>
                                    Email *
                                </div>
                                <input
                                    type="text"
                                    name="lastAndMiddleName"
                                    className="border border-black border-1 rounded-lg p-2"
                                    />
                            </div>
                            
                            <div className='ml-7'>
                                <div>
                                    Ngày sinh *
                                </div>
                                <div className='flex grid justify-items-end items-center'>
                                    <DatePicker
                                    onChange={date => {
                                        if(date){
                                            setBirthDate(date);
                                        }
                                    }}
                                    selected={birhtDate}
                                    dateFormat="dd/MM/yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    locale="vi"
                                    className="h-[40px] w-[270px] border border-black border-1 rounded-lg px-2"
                                    />
                                    <div className='absolute mr-2'>
                                        <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex mb-2'>
                            <div className='mr-7'>
                                <div>
                                    Số điện thoại *
                                </div>
                                <input
                                    type="text"
                                    name="lastAndMiddleName"
                                    className="border border-black border-1 rounded-lg p-2"
                                    />
                            </div>
                            
                            <div className='ml-7'>
                                <div>
                                    Chương trình đào tạo *
                                </div>
                                <div className="">
                                    <select
                                        className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                        onChange={(e) => {

                                        }}
                                        defaultValue={"dfdasf"}
                                    >
                                        <option value="">Chính quy</option>
                                        <option value="">Chất lượng cao</option>
                                        <option value="">Chất lượng cao (LVTN)</option>
                                        <option value="">Kỹ sư tài năng</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='mr-7'>
                                <div>
                                    Tên đăng nhập *
                                </div>
                                <input
                                    type="text"
                                    name="lastAndMiddleName"
                                    className="border border-black border-1 rounded-lg p-2"
                                    />
                            </div>
                            
                            <div className='ml-7'>
                                <div>
                                    Mật khẩu *
                                </div>
                                <div className='flex grid justify-items-end items-center'>
                                    <input
                                        type={showPassword? "text":"password"}
                                        name="name"
                                        className="border border-black border-1 rounded-lg p-2"
                                    />
                                    <div className='absolute mr-2'>
                                        <button onClick={toggleShowPassword}>
                                            {showPassword ? 
                                                (<img src={EyeOpen} alt="eyeIcon" className='h-4 w-5'/>) : 
                                                (<img src={EyeClose} alt="eyeIcon" className='h-4 w-5'/>)
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>

                <div className='flex justify-center items-center'>
                    <button className='bg-[#0079CC] px-7 py-3 hover:bg-[#025790]'>
                        <div className='text-white font-semibold'>
                        ĐĂNG KÝ
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPanel;