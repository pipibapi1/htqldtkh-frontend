import { useState } from 'react';
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';

import { AppDispatch } from '../../../../../../store';

import { TopicStatusEnum } from '../../../../../../shared/types/topicStatus';
import { TopicResultEnum } from '../../../../../../shared/types/topicResult';
import { Toast } from '../../../../../../shared/toastNotify/Toast';

import { putUpdateATopicAction } from '../../../../../../actions/topicAction';

import Calendar from "../../../../../../assets/images/calendar.png";

const StartATopicModal = ({isVisible, onClose, topic, updateTopicResult, topicReviewResult}: 
    {isVisible: boolean, onClose: any, topic: any, updateTopicResult:any, topicReviewResult: any}) => {
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()
    const [topicGivenId, setTopicGivenId] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date(startTime.getFullYear(), startTime.getMonth() + 2, startTime.getDate()));

    if (!isVisible) return null;
    const handleClose = (e: any) => {
        e.preventDefault();
        if (e.target.id === "wrapper") onClose();
    }

    const startATopic = (e: any) => {
        e.preventDefault();

        if(topicGivenId === ""){
            Toast.fire({
                icon: 'warning',
                title: 'Vui lòng nhập mã đề tài'
              })
        }
        else{
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
          
                if(result.isConfirmed){
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
                      updateTopicResult(TopicResultEnum.QUALIFIED, topicReviewResult);
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
    }


    return ( 
        <div className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center z-50" id= "wrapper" onClick={handleClose}>
            <div className = "md:w-[600px] w-[90%] mx-auto">

                <div className = 'bg-white rounded px-5 py-7'>
                    <div className = 'mb-2 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                        Bắt đầu đề tài "{topic.name}"
                    </div>
                    <div className = "space-y-5 py-2">
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
                                                if(date){
                                                    if(date >= endTime){
                                                        Toast.fire({
                                                            icon: 'warning',
                                                            title: 'Thời gian bắt đầu phải bé hơn thời gian kết thúc'
                                                          })
                                                    }
                                                    else{
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
                                            <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
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
                                                if(date){
                                                    if(date <= startTime){
                                                        Toast.fire({
                                                            icon: 'warning',
                                                            title: 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu'
                                                          })
                                                    }
                                                    else{
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
                                            <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
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
                            onClick={(e:any) => {
                                e.preventDefault();
                                onClose();
                            }}
                            >
                                <div>
                                    Hủy
                                </div>
                                
                            </button>
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default StartATopicModal;