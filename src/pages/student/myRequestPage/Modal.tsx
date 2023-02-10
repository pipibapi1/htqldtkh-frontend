import {useState} from 'react';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../store';
import Swal from 'sweetalert2';
import { RequestType } from '../../../shared/types/requestType';

const Modal = ({isVisible, onClose}: {isVisible: boolean, onClose: any}) => {
    const [requestType, setRequestType] = useState<string>(RequestType.GET_CERTIFICATE)
    if (!isVisible) return null;
    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }
    return ( 
        <div className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center" id= "wrapper" onClick={handleClose}>
            <div className = "md:w-[600px] w-[90%] mx-auto">
                <div className = 'bg-white rounded px-5 py-7'>
                    <div className = 'mb-2 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                        Tạo yêu cầu
                    </div>
                    <form className = "space-y-5 px-5 py-2" action = "#">
                        <div className = 'flex'>
                            <div className = 'w-[230px] mr-20'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Loại yêu cầu
                                </label>
                                <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setRequestType(e.target.value)
                                }}
                                >
                                    <option value={RequestType.GET_CERTIFICATE}>Xin giấy chứng nhận</option>
                                    <option value={RequestType.CANCEL_PROJECT}>Hủy đề tài</option>
                                    <option value={RequestType.EXTEND_PROJECT}>Gia hạn đề tài</option>
                                </select>
                            </div>

                            <div className = 'w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Chọn đề tài
                                </label>
                                <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {}}
                                >
                                    <option value={"Đề tài 1"}>Đề tài 1</option>
                                    <option value={"Đề tài 1"}>Đề tài 1</option>
                                    <option value={"Đề tài 1"}>Đề tài 1</option>
                                </select>
                            </div>

                        </div>
                            {requestType === RequestType.EXTEND_PROJECT && (<div className = ''>
                                <div className = 'w-2/3 mr-20 flex items-center'>
                                    <label htmlFor='email' className = "block mb-2 mr-5 text-sm font-medium text-gray-900">
                                        Thời gian gia hạn: 
                                    </label>
                                    <input type = 'email' name = 'email' id ='email'
                                    className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
                                    required
                                    />
                                    <label htmlFor='email' className = "block mb-2 ml-2 text-sm font-medium text-gray-900">
                                        tháng.
                                    </label>
                                </div>
                            </div>)}

                        <div className = 'flex flex-row justify-end'>
                            <button
                                className = 'w-1/4 mr-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
                            >
                                Tạo yêu cầu
                            </button>

                            <button
                                className = 'w-1/4 ml-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300'
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
    )
}

export default Modal