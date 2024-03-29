import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';

import { AppDispatch } from '../../../../store';

import { Toast } from '../../../../shared/toastNotify/Toast';
import { displayDate, displayPeriod } from '../../../../shared/functions';

import { resultAndFeedbackAction } from '../../../../actions/resultAndFeedbackAction';

import BackIcon from '../../../../assets/images/🦆 icon _arrow circle left_.png';

const Feedback:React.FC = () => {

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const { state } = useLocation();
    const topic = state?.topic;

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File>();

    const [loading, setLoading] = useState<boolean>(false);

    const onChangeFile = (e:any) => {
        e.preventDefault();
        if(e.target.files[0]){
            const fileReader = new FileReader();
                    fileReader.readAsDataURL(e.target.files[0]);
    
                    fileReader.onload = () => {
                        if(typeof(fileReader.result) === "string"){
                            setFile(e.target.files[0])
                        }
                    };
                    fileReader.onerror = (error) => {
                        console.log(error);
                    }   
        }
    }

    const sendFeedback = (e:any) => {
        
        const info = {
            studentId: topic.student._id,
            email: topic.student.email,
            subject: title,
            text: content
        }

        let formData = new FormData();
        formData.append('info', JSON.stringify(info))

        if(file !== undefined){
            formData.append('file', file as File)
        }

        if(title === ""){
            Toast.fire({
                icon: 'warning',
                title: 'Phần tiêu đề không được bỏ trống'
              })
        }
        else if(content === ""){
            Toast.fire({
                icon: 'warning',
                title: 'Phần nội dung không được bỏ trống'
              })
        }
        else{
            setLoading(true)
            Swal.fire({
                icon: 'question',
                title: 'Bạn có chắc muốn gửi góp ý?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
            }).then((result) => {
    
                if(result.isConfirmed){
                    dispatch(resultAndFeedbackAction(formData))
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Gửi góp ý thành công',
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: 'OK',
                          }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                setLoading(false)
                            } 
                          })
        
                    })
                    .catch((error) => {
                        setLoading(false)
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            if(error.response.status === 400){
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Bad request'
                                  })
                            }
                          } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            Toast.fire({
                                icon: 'error',
                                title: error.request
                              })
                          } else {
                            // Something happened in setting up the request that triggered an Error
                            Toast.fire({
                                icon: 'error',
                                title: error.message
                              })
                          }
                    });
                }
    
                if(result.isDenied){
                    setLoading(false)
                }
            })
        }

    }

    return(
        <div className='p-3'>
            <Link to={'/topicManagement'} className='hover:cursor-pointer w-fit'>
                <img src={BackIcon} className='h-5' alt="" />
            </Link>

            <div className = "space-y-1 mt-2 pb-2 border-b-2">
                <div className = 'flex items-center px-5'>
                    <label htmlFor='text' className = "w-[160px] text-sm font-semibold mr-1">
                        Tên đề tài: 
                    </label>
                    <div className = "w-1/2 text-gray-900 text-sm">
                            {topic.name}
                    </div>
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Mã đề tài: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-sm">
                            {topic.topicGivenId === "" ? "Chưa được cấp" : topic.topicGivenId}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Loại đề tài: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-sm">
                            {topic.type}
                        </div>
                    </div>
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Ngày tạo: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-sm">
                            {displayDate(topic.createdDate)}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Thời gian thực hiện: 
                        </label>

                        <div className = "w-1/4 text-gray-900 text-sm">
                            {displayDate(topic.startTime)} - {displayDate(topic.endTime)}
                        </div>
                    </div>
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Đợt: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-sm">
                            {displayPeriod(topic.periodValue)}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Trạng thái: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-sm">
                            {topic.status}
                        </div>
                    </div>
                </div>

                <div className = 'flex items-center px-5'>
                    <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                        Gia hạn: 
                    </label>
                    <div className = "w-1/4 text-gray-900 text-sm">
                        {topic.isExtended? `Thời gian gia hạn: ${topic.extensionTime} tháng` : "Không"}
                    </div>
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Chủ nhiệm: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-sm">
                            {topic.student.name}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Email chủ nhiệm: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-sm">
                            {topic.student.email}
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-2'>
                <div className='text-sm px-5 font-semibold'>
                            Tiêu đề: 
                </div>
                <div className='mt-1 px-5'>

                        <input
                        type="text"
                        name="title"
                        className="border text-sm border-black border-1 rounded-md w-[800px] h-10 p-2"
                        onChange={
                            (e) => {
                                e.preventDefault();
                                setTitle(e.target.value)
                            }
                        }
                        />
                </div>
            </div>

            <div className='mt-2'>
                <div className='text-sm px-5 font-semibold'>
                        Nội dung: 
                </div>
                <div className='mt-1 px-5'>

                    <textarea
                            name="content"
                            className="border text-sm border-black border-1 rounded-md w-[800px] h-[180px] p-2"
                            onChange={
                                (e) => {
                                    e.preventDefault();
                                    setContent(e.target.value);
                                }
                            }
                    />
                </div>
            </div>

            <div className='mt-2'>
                <div className='text-sm px-5 font-semibold'>
                        File đính kèm:
                </div>
                <div className='mt-1 px-5'>
                    <input
                            type="file"
                            name="name"
                            className="text-sm border border-black border-1 rounded-md w-[800px] h-10 p-1"
                            onChange={onChangeFile}
                    />
                </div>
            </div>

            <div className='mt-2 flex items-center justify-end'>
                    <div>
                    {loading ? 
                        <button className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                        disabled
                        >

                            <div>
                                Processing ...
                            </div>
                            
                        </button>
                        :
                        <button className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                        onClick={sendFeedback}
                        >

                            <div>
                                Gửi
                            </div>
                            
                        </button>}

                    </div>

                </div>
        </div>
        
    )
}

export default Feedback