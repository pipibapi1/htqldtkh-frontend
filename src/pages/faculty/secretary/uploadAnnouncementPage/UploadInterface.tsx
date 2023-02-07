import React, {useState} from 'react';
import { AppDispatch } from '../../../../store';
import { useDispatch} from "react-redux";
import Swal from 'sweetalert2';

import { postAddAnAnnouncementAction } from '../../../../actions/announcementAction';

const UploadInterface: React.FC = (props: any) => {

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File>();

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

    const onAddAnAnnouncement = (e: any) => {
        setLoading(true);
        e.preventDefault();

        if(title === ""){
            setLoading(false);
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để trống phần tiêu đề'
            })
        }
        else if(file === undefined){
            setLoading(false);
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để trống phần file'
            })
        }
        else{
            const info = {
                    title: title,
                    content: content
            }

            let formData = new FormData();
            formData.append('info', JSON.stringify(info))
            formData.append('file', file as File)

            Swal.fire({
                icon: 'question',
                title: 'Bạn có chắc muốn upload thông báo mới?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Yes',
            }).then((result) => {

                if(result.isConfirmed){
                    dispatch(postAddAnAnnouncementAction(formData))
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Upload thông báo mới thành công',
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: 'OK',
                          }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                setLoading(false);
                            } 
                          })
        
                    })
                    .catch((error) => {
                        setLoading(false);
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
                    setLoading(false);
                }
            })

        }
    }
    
    return (
        <div className=''>
            <div className='p-5 min-h-[625px] overflow-hidden'>
            <div className='flex justify-between mb-2'>
                <div className='flex flex-col'>
                    <div className='mb-5'>
                        <div className='font-bold'>
                            Tiêu đề: 
                        </div>
                        <input
                        type="text"
                        name="title"
                        className="border border-black border-1 rounded-md w-[800px] h-10 p-2"
                        onChange={
                            (e) => {
                                e.preventDefault();
                                setTitle(e.target.value)
                            }
                        }
                        />
                    </div> 

                    <div className='mb-5'>
                    <div className='font-bold'>
                        Mô tả: 
                    </div>
                        <textarea
                        name="content"
                        className="border border-black border-1 rounded-md w-[800px] h-[200px] p-2"
                        onChange={
                            (e) => {
                                e.preventDefault();
                                setContent(e.target.value);
                            }
                        }
                        />
                    </div> 
                </div>
                <div className=''>
                    <div>
                        <button className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                            onClick={onAddAnAnnouncement}
                            disabled={loading? true: false}
                        >
                            {loading?
                            (<div>
                                Processing...
                                
                            </div>):
                            (<div>
                                Upload
                            </div>)
                            }
                        </button>

                    </div>

                </div>
            </div>
            <div className='mb-5'>
                <div className='font-bold mb-2'>
                        File đính kèm:
                </div>
                <input
                        type="file"
                        name="name"
                        className="border border-black border-1 rounded-md w-[800px] h-10 p-1"
                        onChange={onChangeFile}
                />
            </div>
            </div>
        </div>
    )
}

export default UploadInterface;