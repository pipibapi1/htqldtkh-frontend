import { useState } from 'react';
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import vi from 'date-fns/locale/vi';

import { AppDispatch } from '../../../../store';

import { Toast } from '../../../../shared/toastNotify/Toast';

import { postAddAPeriodAction } from '../../../../actions/periodAction';

import Calendar from "../../../../assets/images/calendar.png";

const Modal = ({isVisible, onClose, year}: {isVisible: boolean, onClose: any, year: Date}) => {
    const[monthAndYear, setMonthAndYear] = useState<Date>()
    const[title, setTitle] = useState<string>("")

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    if (!isVisible) return null;

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }
    const displayYear = (date: Date) => {
        return date.getFullYear();
    }

    const addNewPeriod = (e:any) => {
        e.preventDefault();
        const newPeriod = {
            period:{
                period: monthAndYear,
                title: title,
                year: year.getFullYear()
            }
        }
        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn tạo một đợt đăng ký mới? Đợt đăng ký sẽ ở trạng thái mở!',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
      
            if(result.isConfirmed){
            dispatch(postAddAPeriodAction(newPeriod))
              .then((data) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Tạo đợt đăng ký mới thành công',
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
      
            if(result.isDenied){
            }
        })

    }

    return ( 
        <div className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center z-50" id= "wrapper" onClick={handleClose}>
            <div className = "md:w-[600px] w-[90%] mx-auto">
                <div className = 'bg-white rounded px-5 py-7'>
                    <div className = 'mb-2 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                        Thêm đợt đăng ký mới cho năm {displayYear(year)}
                    </div>
                    <form className = "space-y-5 px-5 py-2" action = "#">
                        <div className = ''>
                            <div className = 'w-[230px] mb-5'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Đợt
                                </label>
                                <div className='grid justify-items-end items-center mr-10'>
                                    <DatePicker
                                        onChange={date => {
                                            if(date){
                                                if(date.getFullYear() !== year.getFullYear())
                                                {
                                                    Toast.fire({
                                                    icon: 'warning',
                                                    title: "Vui lòng chọn đúng trong năm " + year.getFullYear()
                                                    })
                                                }
                                                else{
                                                    setMonthAndYear(date);
                                                }
                                            }
                                            }}
                                        selected={monthAndYear}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        locale={vi}
                                        className="h-[40px] w-full border border-black border-1 rounded-md px-2"
                                                />
                                    <div className='absolute mr-2'>
                                        <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                                    </div>
                                </div>
                            </div>

                            <div className = 'w-full '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Tên đợt
                                </label>
                                <textarea
                                onChange={(e:any) => {
                                    e.preventDefault();
                                    setTitle(e.target.value)
                                }}
                                className = "bg-gray-50 h-[150px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>

                        </div>

                        <div className = 'flex flex-row justify-end'>
                            <button
                                className = 'w-1/4 mr-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
                                onClick={addNewPeriod}
                            >
                                Mở đợt
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