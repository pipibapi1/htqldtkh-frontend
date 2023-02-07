import {useState} from 'react';
import Calendar from "../../../../assets/images/calendar.png";
import DatePicker from "react-datepicker";
import EyeOpen from "../../../../assets/images/eyeOpen.png";
import EyeClose from "../../../../assets/images/eyeClose.png"



const Modal = ({isVisible, onClose}: {isVisible: boolean, onClose: any}) => {
    const [birthDate, setBirthDate] = useState(new Date());
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    if (!isVisible) return null;

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }

    return (
        <div className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center" id= "wrapper" onClick={handleClose}>
            <div className = "md:w-[600px] w-[90%] mx-auto">
                <div className = 'bg-white rounded p-2'>
                    <div className = "py-6 px-6 lg:px-8 text-left">
                        <div className = 'mb-8 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                            Thông tin chi tiết tài khoản
                        </div>
                        <form className = "space-y-4" action = "#">
                            <div className = 'flex flex-row '>
                                <div className = 'mr-6 w-[230px]'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Họ và tên lót
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "Trương Anh"
                                required
                                />
                                </div>

                                <div className = 'ml-6 w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Tên
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "Khoa"
                                required
                                />
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mr-6 w-[230px]'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    MSSV
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "1913828"
                                required
                                />
                                </div>

                                <div className = 'ml-6 w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Giới tính
                                </label>
                                <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {}}
                                defaultValue={"dfdasf"}
                                >
                                    <option value="">Nam</option>
                                    <option value="">Nữ</option>
                                </select>
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mr-6 w-[230px]'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "khoa.truong2001@hcmut.edu.vn"
                                required
                                />
                                </div>

                                <div className = 'ml-6 w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Ngày sinh
                                </label>
                                {/* <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "name@company.com"
                                required
                                /> */}
                                <div className = "grid justify-items-end items-center">
                                    <DatePicker
                                    onChange={date => {
                                    if(date){
                                        setBirthDate(date);
                                    }
                                    }}
                                    selected={birthDate}
                                    dateFormat="dd/MM/yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    locale="vi"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    <div className='absolute mr-2'>
                                        <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mr-6 w-[230px]'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Số điện thoại
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "0386206317"
                                required
                                />
                                </div>

                                <div className = 'ml-6 w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Chương trình đào tạo
                                </label>
                                <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {}}
                                defaultValue={"dfdasf"}
                                >
                                    <option value="">Chính quy</option>
                                    <option value="">Chất lượng cao</option>
                                    <option value="">Kỹ sư tài năng</option>
                                </select>
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mr-6 w-[230px]'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Tên tài khoản
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "khoa.truong2001"
                                required
                                />
                                </div>

                                <div className = 'ml-6 w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Mật khẩu
                                </label>
                                <div className='grid justify-items-end items-center'>
                                    <input
                                        type={showPassword? "text":"password"}
                                        name="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

                            <div className = 'flex flex-row '>
                            <button type = 'submit' 
                                className = 'w-full mr-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
                            >
                                Duyệt
                            </button>

                            <button
                                className = 'w-full ml-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300'
                                onClick={handleClose}
                                id = "wrapper"
                            >
                                Hủy
                            </button>


                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal