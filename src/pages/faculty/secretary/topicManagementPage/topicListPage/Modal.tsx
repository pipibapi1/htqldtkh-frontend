import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';

import { AppDispatch } from '../../../../../store';

import { TopicStatusEnum } from '../../../../../shared/types/topicStatus';
import { Toast } from '../../../../../shared/toastNotify/Toast';

import { putUpdateATopicAction } from '../../../../../actions/topicAction';

import Calendar from "../../../../../assets/images/calendar.png";

const Modal = ({ isVisible, onClose, topic }: { isVisible: boolean, onClose: any, topic: any }) => {
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()
    const [showTopicStartPopup, setShowTopicStartPopup] = useState(false);
    const [topicGivenId, setTopicGivenId] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date(startTime.getFullYear(), startTime.getMonth() + 2, startTime.getDate()));

    if (!isVisible) return null;
    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }

    const startATopic = (e: any) => {
        e.preventDefault();

        if (topicGivenId === "") {
            Toast.fire({
                icon: 'warning',
                title: 'Vui lòng nhập mã đề tài'
            })
        }
        else {
            const updateInfo = {
                _id: topic._id,
                topic: {
                    topicGivenId: topicGivenId,
                    startTime: startTime,
                    endTime: endTime,
                    status: TopicStatusEnum.CARRY_OUT
                }
            }
            Swal.fire({
                icon: 'question',
                title: 'Bạn có chắc muốn bắt đầu đề tài này?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
            }).then((result) => {

                if (result.isConfirmed) {
                    dispatch(putUpdateATopicAction(updateInfo))
                        .then((data) => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Bắt đầu đề tài thành công',
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

    const changeATopicToReady = (e: any) => {
        e.preventDefault();
        if (topic.status === TopicStatusEnum.NEW) {
            const updateInfo = {
                _id: topic._id,
                topic: {
                    status: TopicStatusEnum.READY
                }
            }
            Swal.fire({
                icon: 'question',
                title: 'Bạn có chắc chuyển đề tài sang sẵn sàng xét duyệt?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
            }).then((result) => {

                if (result.isConfirmed) {
                    dispatch(putUpdateATopicAction(updateInfo))
                        .then((data) => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Chuyển trạng thái thành công',
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
        else {
            Toast.fire({
                icon: 'error',
                title: 'Trạng thái đề tài không phù hợp!'
            })
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center z-50" id="wrapper" onClick={handleClose}>
            <div className="md:w-[600px] w-[90%] mx-auto">

                {!showTopicStartPopup && <div className='bg-white rounded px-5 py-7'>
                    <div className='mb-2 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                        Chức năng khác cho đề tài "{topic.name}"
                    </div>
                    <div className="space-y-5 px-5 py-2 flex flex-col items-center justify-center">
                        <Link to={`/myTopic/${topic._id}/topicDetail`}
                            className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#06609E] hover:cursor-pointer'
                        >
                            Chi tiết
                        </Link>
                        {
                            (topic.status === TopicStatusEnum.NEW || topic.status === TopicStatusEnum.CANCELED) ?
                                (<div className="bg-[#A3A3A3] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2">
                                    Sản phẩm
                                </div>) :

                                (<Link to={`/myTopic/${topic._id}/topicProduct`} state={{ startTime: topic.startTime, endTime: topic.endTime }}
                                    className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#06609E] hover:cursor-pointer'
                                >
                                    Sản phẩm
                                </Link>)
                        }
                        {topic.status === TopicStatusEnum.CANCELED ?
                            (<div className="bg-[#A3A3A3] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2">
                                Giấy tờ liên quan
                            </div>) :
                            (<Link to={`/myTopic/${topic._id}/topicPapers`}
                                className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#06609E] hover:cursor-pointer'
                            >
                                <div>
                                    Giấy tờ liên quan
                                </div>
                            </Link>)
                        }
                        <Link to={`/topicManagement/${topic._id}/resultNotification`}
                            state={{ topic: topic }}
                            className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#06609E] hover:cursor-pointer'
                        >
                            <div >
                                Thông báo kết quả
                            </div>
                        </Link>
                        <Link to={`/topicManagement/${topic._id}/feedback`}
                            state={{ topic: topic }}
                            className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#06609E] hover:cursor-pointer'
                        >
                            <div>
                                Góp ý
                            </div>
                        </Link>
                        {/* <div className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-5 hover:bg-[#06609E] hover:cursor-pointer'
                        onClick={(e) => {
                            e.preventDefault();
                            if(topic.status !== TopicStatusEnum.NEW){
                                Toast.fire({
                                    icon: 'warning',
                                    title: 'Đề tài này đã bắt đầu rồi'
                                  })
                            }
                            else{
                                setShowTopicStartPopup(true);
                            }
                        }}
                        >
                            Bắt đầu đề tài
                        </div> */}
                        <div className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#06609E] hover:cursor-pointer'
                            onClick={changeATopicToReady}
                        >
                            Chuyển sang sẵn sàng xét duyệt
                        </div>
                        <div className='bg-[#E1000E] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#980B14] hover:cursor-pointer'
                            onClick={onClose}
                        >
                            Hủy
                        </div>
                    </div>
                </div>}

                {
                    showTopicStartPopup && <div className='bg-white rounded px-5 py-7'>
                        <div className='mb-2 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                            Bắt đầu đề tài "{topic.name}"
                        </div>
                        <div className="space-y-5 py-2">
                            <div className='flex items-center w-full'>
                                <div className='text-sm font-semibold'>
                                    Nhập mã đề tài:
                                </div>
                                <div className='ml-3'>

                                    <input
                                        type="text"
                                        name="title"
                                        className="border text-sm border-black border-1 rounded-md h-7 p-2"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setTopicGivenId(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='flex'>

                                <div className='w-1/3'>
                                    <div className='text-sm font-semibold'>
                                        Bắt đầu:
                                    </div>
                                    <div className='grid justify-items-end items-center'>
                                        <DatePicker
                                            selected={startTime}
                                            onChange={date => {
                                                if (date) {
                                                    if (date >= endTime) {
                                                        Toast.fire({
                                                            icon: 'warning',
                                                            title: 'Thời gian bắt đầu phải bé hơn thời gian kết thúc'
                                                        })
                                                    }
                                                    else {
                                                        setStartTime(date);
                                                    }
                                                }
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            locale={vi}
                                            className="h-[40px] text-sm w-full border border-black border-1 rounded-md px-2"
                                        />
                                        <div className='absolute mr-2'>
                                            <img src={Calendar} alt="calendarIcon" className='h-5 w-5' />
                                        </div>
                                    </div>
                                </div>

                                <div className='w-1/3 ml-20'>
                                    <div className='text-sm font-semibold'>
                                        Kết thúc:
                                    </div>
                                    <div className='grid justify-items-end items-center'>
                                        <DatePicker
                                            selected={endTime}
                                            onChange={date => {
                                                if (date) {
                                                    if (date <= startTime) {
                                                        Toast.fire({
                                                            icon: 'warning',
                                                            title: 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu'
                                                        })
                                                    }
                                                    else {
                                                        setEndTime(date);
                                                    }
                                                }
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            locale={vi}
                                            className="h-[40px] text-sm w-full border border-black border-1 rounded-md px-2"
                                        />
                                        <div className='absolute mr-2'>
                                            <img src={Calendar} alt="calendarIcon" className='h-5 w-5' />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='flex justify-end space-x-2'>
                                <button className="w-[100px] bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-3 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                                    onClick={startATopic}
                                >
                                    <div>
                                        Bắt đầu
                                    </div>

                                </button>
                                <button className="w-[100px] bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-3 border border-white-500 rounded-[15px] hover:bg-[#980B14] hover:cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowTopicStartPopup(false)
                                    }}
                                >
                                    <div>
                                        Hủy
                                    </div>

                                </button>
                            </div>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Modal