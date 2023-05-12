import { useState } from 'react';
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';

import { AppDispatch } from '../../../../store';

import { GenderType } from '../../../../shared/types/gender';
import { Toast } from '../../../../shared/toastNotify/Toast';

import { updateFvdPersonalInfoAction } from '../../../../actions/fvdAction';

import Calendar from "../../../../assets/images/calendar.png";
import EyeOpen from "../../../../assets/images/eyeOpen.png";
import EyeClose from "../../../../assets/images/eyeClose.png";

const Modal = ({ isVisible, onClose, vicedean }: { isVisible: boolean, onClose: any, vicedean: any }) => {
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()
    const [birthDate, setBirthDate] = useState(new Date(vicedean.birthDate));
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(vicedean.username);
    const [password, setPassword] = useState<string>(vicedean.rawPassword)
    const toggleShowPassword = (e: any) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }
    if (!isVisible) return null;

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }

    const handleUpdate = (e: any) => {
        e.preventDefault();
        if (username === "") {
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để trống tên đăng nhập'
            })
        }
        else if (password === "") {
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để  trống mật khẩu'
            })
        }
        else {
            const updateInfo = {
                _id: vicedean._id,
                username: username,
                password: password,
                rawPassword: password
            }

            Swal.fire({
                icon: 'question',
                title: 'Bạn có chắc muốn cập nhật tài khoản cán bộ quản lý này?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
            }).then((result) => {

                if (result.isConfirmed) {
                    dispatch(updateFvdPersonalInfoAction(updateInfo))
                        .then((data) => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Cập nhật tài khoản thành công',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            })
                        }
                        )
                        .catch((error) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Có lỗi gì đó đã xảy ra, thử lại sau!',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                            })
                        })
                }

                if (result.isDenied) {
                }
            })
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center z-50" id="wrapper" onClick={handleClose}>
            <div className="md:w-[600px] w-[90%] mx-auto">
                <div className='bg-white rounded p-2'>
                    <div className="py-6 px-6 lg:px-8 text-left">
                        <div className='mb-8 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                            Thông tin chi tiết tài khoản
                        </div>
                        <form className="space-y-4" action="#">
                            <div className='flex flex-row '>
                                <div className='mr-6 w-[230px]'>
                                    <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900">
                                        Họ và tên
                                    </label>
                                    <input type='text' name='name' id='name'
                                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                        value={vicedean.name}
                                        disabled
                                    />
                                </div>

                                <div className='ml-6 w-[230px] '>
                                    <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900">
                                        MSCB
                                    </label>
                                    <input type='email' name='email' id='email'
                                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                        value={vicedean.staffId}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row '>
                                <div className='mr-6 w-[230px] '>
                                    <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900">
                                        Giới tính
                                    </label>
                                    <select
                                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        onChange={(e) => { }}
                                        value={vicedean.gender}
                                        disabled
                                    >
                                        {Object.values(GenderType).map((value) => {
                                            return <option value={value} key={value}>{value}</option>
                                        })}
                                    </select>
                                </div>
                                <div className='ml-6 w-[230px] '>
                                    <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900">
                                        Ngày sinh
                                    </label>
                                    <div className="grid justify-items-end items-center">
                                        <DatePicker
                                            disabled
                                            onChange={date => {
                                                if (date) {
                                                    setBirthDate(date);
                                                }
                                            }}
                                            selected={birthDate}
                                            dateFormat="dd/MM/yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            locale={vi}
                                            className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                        <div className='absolute mr-2'>
                                            <img src={Calendar} alt="calendarIcon" className='h-5 w-5' />
                                        </div>
                                    </div>
                                </div>


                            </div>


                            <div className='flex flex-row '>
                                <div className='mr-6 w-[230px]'>
                                    <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900">
                                        Email
                                    </label>
                                    <input type='email' name='email' id='email'
                                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={vicedean.email}
                                        required
                                        disabled
                                    />
                                </div>

                                <div className='ml-6 w-[230px] '>
                                    <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900">
                                        Số điện thoại
                                    </label>
                                    <input type='email' name='email' id='email'
                                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                        value={vicedean.phoneNumber}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row '>
                                <div className='mr-6 w-[230px]'>
                                    <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900">
                                        Tên tài khoản
                                    </label>
                                    <input type='text' name='username' id='username'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        defaultValue={vicedean.username}
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setUsername(e.target.value);
                                        }}
                                        required
                                    />
                                </div>

                                <div className='ml-6 w-[230px] '>
                                    <label htmlFor='email' className="block mb-2 text-sm font-medium text-gray-900">
                                        Mật khẩu
                                    </label>
                                    <div className='grid justify-items-end items-center'>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="name"
                                            defaultValue={vicedean.rawPassword}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setPassword(e.target.value);
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                        <div className='absolute mr-2'>
                                            <button onClick={toggleShowPassword}>
                                                {showPassword ?
                                                    (<img src={EyeOpen} alt="eyeIcon" className='h-4 w-5' />) :
                                                    (<img src={EyeClose} alt="eyeIcon" className='h-4 w-5' />)
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-row '>
                                <button type='submit'
                                    className='w-full mr-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
                                    onClick={handleUpdate}
                                >
                                    Cập nhật
                                </button>

                                <button
                                    className='w-full ml-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300'
                                    onClick={handleClose}
                                    id="wrapper"
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