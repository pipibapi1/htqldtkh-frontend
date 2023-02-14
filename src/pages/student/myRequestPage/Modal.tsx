import {useState} from 'react';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../store';
import Swal from 'sweetalert2';
import { RequestType } from '../../../shared/types/requestType';
import { Topic } from '../../../shared/interfaces/topicInterface';
import { postAddARequestAction } from '../../../actions/requestAction';
import { TopicTypeEnum } from '../../../shared/types/topicType';
import { TopicStatusEnum } from '../../../shared/types/topicStatus';

const Modal = ({isVisible, onClose, myTopics}: {isVisible: boolean, onClose: any, myTopics: Topic[]}) => {
    const [requestType, setRequestType] = useState<string>(RequestType.GET_CERTIFICATE)
    const [chosenTopicId, setChosenTopicId] = useState<string>("")
    const [extensionTime, setExtensionTime] = useState<number>(0)
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
    const addNewRequest = (e: any) => {
        e.preventDefault();
        if(chosenTopicId === ""){
            Toast.fire({
                icon: 'warning',
                title: 'Vui lòng chọn đề tài'
              })
        }
        else{
            let newRequest: any = {
                request:{
                    topicId: chosenTopicId,
                    type: requestType,
                    extensionTime: extensionTime
                }
            }
            if(requestType === RequestType.EXTEND_PROJECT && extensionTime <= 0){
              
                Toast.fire({
                    icon: 'warning',
                    title: 'Thời gian gia hạn cần lớn hơn 0'
                })
                return;
                
            }
            Swal.fire({
                icon: 'question',
                title: 'Bạn có chắc muốn tạo yêu cầu mới?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
            }).then((result) => {
          
                if(result.isConfirmed){
                  dispatch(postAddARequestAction(newRequest))
                  .then((data) => {
                    Swal.fire({
                      icon: 'success',
                      title: 'Tạo yêu cầu thành công',
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
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        if(error.response.status === 400){
                            if(error.response.data.msg === "Existed same request for same topic"){
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Bạn đã tạo loại yêu cầu tương tự trên đề tài này rồi!'
                                  })
                            }
                            else{
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Bad request'
                                  })
                            }
                            
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
                  })
                }
          
                if(result.isDenied){
                }
            })
        }
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
                            <div className = 'w-[200px] mr-20'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Loại yêu cầu
                                </label>
                                <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setRequestType(e.target.value)
                                    setChosenTopicId("")
                                }}
                                >
                                    <option value={RequestType.GET_CERTIFICATE}>Xin giấy chứng nhận</option>
                                    <option value={RequestType.CANCEL_PROJECT}>Hủy đề tài</option>
                                    <option value={RequestType.EXTEND_PROJECT}>Gia hạn đề tài</option>
                                </select>
                            </div>

                            <div className = 'w-[300px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Chọn đề tài
                                </label>
                                <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {
                                    e.preventDefault();
                                    if(e.target.value != ""){
                                        const chosenTopic = myTopics.find((topic) => topic._id === e.target.value)
                                        if(chosenTopic && (chosenTopic.status === TopicStatusEnum.DUE_TO_ACCEPT ||
                                            chosenTopic.status === TopicStatusEnum.CARRY_OUT ||
                                            chosenTopic.status === TopicStatusEnum.OUT_OF_DATE) && requestType !== RequestType.GET_CERTIFICATE
                                            ){
                                                setChosenTopicId(e.target.value)
                                        }
                                        else{
                                            if(chosenTopic && requestType === RequestType.GET_CERTIFICATE && chosenTopic.status === TopicStatusEnum.FINISHED){
                                                setChosenTopicId(e.target.value)
                                            }
                                            else{
                                                Toast.fire({
                                                    icon: 'error',
                                                    title: 'Đề tài được chọn đang ở trạng thái ' + chosenTopic?.status + " nên không thể tạo yêu cầu " + requestType + " được!"
                                                  })
                                            }
                                        }
                                    }
                                    else{
                                        setChosenTopicId(e.target.value)
                                    }
                                }}
                                value={chosenTopicId}
                                defaultValue={""}
                                >
                                    <option value={""}>Chọn đề tài</option>
                                    {myTopics.map((topic, index) => {
                                        return(
                                            <option value={topic._id}>{topic.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                        </div>
                            {requestType === RequestType.EXTEND_PROJECT && (<div className = ''>
                                <div className = 'w-2/3 mr-20 flex items-center'>
                                    <label htmlFor='email' className = "block mb-2 mr-5 text-sm font-medium text-gray-900">
                                        Thời gian gia hạn: 
                                    </label>
                                    <input type = 'number'
                                    className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
                                    required
                                    defaultValue={0}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setExtensionTime(parseInt(e.target.value))
                                    }}
                                    />
                                    <label htmlFor='email' className = "block mb-2 ml-2 text-sm font-medium text-gray-900">
                                        tháng.
                                    </label>
                                </div>
                            </div>)}

                        <div className = 'flex flex-row justify-end'>
                            <button
                                className = 'w-1/4 mr-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
                                onClick={addNewRequest}
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