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
                                placeholder = "Nguyễn Văn"
                                required
                                />
                                </div>

                                <div className = 'ml-6 w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Tên
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "A"
                                required
                                />
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mr-6 w-[230px]'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    MSCB
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "111111"
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
                                    Số điện thoại
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "0999999999"
                                required
                                />
                                </div>

                                <div className = 'ml-6 w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Vai Trò
                                </label>
                                <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {}}
                                defaultValue={"dfdasf"}
                                >
                                    <option value="">Phó chủ nhiệm</option>
                                    <option value="">Thư ký</option>
                                    <option value="">Giảng Viên</option>
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
                                placeholder = "Phochunhiem123"
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