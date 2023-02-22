import {useState} from 'react';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';
import Swal from 'sweetalert2';
import { postAddATemplateAction } from '../../../../actions/templateAction';

const Modal = ({isVisible, onClose, topic}: {isVisible: boolean, onClose: any, topic: any}) => {
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [templateName, setTemplateName] = useState("");
    const [forStudent, setForStudent] = useState(true);
    const [file, setFile] = useState<File>();

    if (!isVisible) return null;
    console.log(topic)
    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }
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
    const addATemplate = (e:any) => {
        e.preventDefault();
        const info = {
            name: templateName,
            forStudent: forStudent,
        }

        let formData = new FormData();
        formData.append('info', JSON.stringify(info))
        formData.append('file', file as File)

        if(templateName === ""){
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để trống tên biểu mẫu'
            })
        }
        else if(file === undefined){
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để trống phần file'
            })
        }
        else{
            Swal.fire({
                icon: 'question',
                title: 'Bạn có chắc muốn thêm biểu mẫu mới?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
            }).then((result) => {
    
                if(result.isConfirmed){
                    dispatch(postAddATemplateAction(formData))
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thêm biểu mẫu mới thành công',
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: 'OK',
                          }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                window.location.reload();
                            } 
                          })
        
                    })
                    .catch((error) => {
                        
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
                    
                }
            })
        }

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
        <div className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center z-50" id= "wrapper" onClick={handleClose}>
            <div className = "md:w-[600px] w-[90%] mx-auto">

                <div className = 'bg-white rounded px-5 py-7'>
                    <div className = 'mb-2 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                        Thêm biểu mẫu mới
                    </div>
                    <div className = "space-y-5 px-5 py-2">
                        <div className='flex items-center w-full'>
                            <div className='text-sm font-semibold w-1/3'>
                                Nhập tên biểu mẫu: 
                            </div>
                            <div className='w-2/3'>
                                    <input
                                    type="text"
                                    name="title"
                                    className="border w-2/3 text-sm border-black border-1 rounded-md h-7 p-2"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setTemplateName(e.target.value);
                                    }}
                                    />
                            </div>
                        </div>
                        
                        <div className = 'w-full flex items-center'>
                                <div className = "w-1/3 text-sm font-semibold flex items-center">
                                    Loại biểu mẫu: 
                                </div>
                                <div className='w-2/3'>

                                    <select
                                    className="bg-gray-50 text-sm w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        if(e.target.value === "true"){
                                            setForStudent(true);
                                        }
                                        else{
                                            setForStudent(false)
                                        }
                                    }}
                                    >
                                        <option value={"true"}>Dành cho sinh viên</option>
                                        <option value={"false"}>Không dành cho sinh viên</option>
                                    </select>
                                </div>
                        </div>

                        <div className = 'w-full flex items-center'>
                            <div className='text-sm font-semibold w-1/3'>
                                File đính kèm:
                            </div>
                            <div className='w-2/3'>
                                <input
                                        type="file"
                                        name="name"
                                        className=" rounded-md text-sm w-full p-1"
                                        onChange={onChangeFile}
                                />
                            </div>
                        </div>

                        <div className = 'w-full flex items-center justify-end space-x-2'>
                            <button className="w-[100px] bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-3 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                            onClick={addATemplate}
                            >
                                <div>
                                    Lưu
                                </div>
                                
                            </button>
                            <button className="w-[100px] bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-3 border border-white-500 rounded-[15px] hover:bg-[#980B14] hover:cursor-pointer"
                            onClick={onClose}
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

export default Modal