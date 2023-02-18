import {useState} from 'react';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../../store';
import Swal from 'sweetalert2';

const Modal = ({isVisible, onClose}: {isVisible: boolean, onClose: any}) => {
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()
    if (!isVisible) return null;
    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast: any) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    return ( 
        <div className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center" id= "wrapper" onClick={handleClose}>
            <div className = "md:w-[600px] w-[90%] mx-auto">
                <div className = 'bg-white rounded px-5 py-7'>
                    <div className = 'mb-2 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                        Chức năng khác
                    </div>
                    <div className = "space-y-5 px-5 py-2 flex flex-col items-center justify-center">
                        <div className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-5 hover:bg-[#06609E] hover:cursor-pointer'>
                            Thông báo kết quả
                        </div>
                        <div className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-5 hover:bg-[#06609E] hover:cursor-pointer'>
                            Góp ý
                        </div>
                        <div className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-5 hover:bg-[#06609E] hover:cursor-pointer'>
                            Bắt đầu đề tài
                        </div>
                        <div className='bg-[#E1000E] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-5 hover:bg-[#980B14] hover:cursor-pointer'
                        onClick={onClose}
                        >
                            Hủy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal