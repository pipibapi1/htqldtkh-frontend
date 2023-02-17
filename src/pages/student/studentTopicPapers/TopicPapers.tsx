import React, { useState, useEffect } from 'react';
import BackIcon from '../../../assets/images/🦆 icon _arrow circle left_.png';
import DownIcon from '../../../assets/images/down-arrow.png';
import RightIcon from '../../../assets/images/next.png';
import FileIcon from "../../../assets/images/files.png";
import { useDispatch} from "react-redux";
import {AppDispatch } from '../../../store';
import {Link, useParams} from "react-router-dom";

import { getTemplatesWithPapersAction } from '../../../actions/templateAction';
import { TemplateWithPaper } from '../../../shared/interfaces/templateInterface';

import Swal from 'sweetalert2';
import { deleteRemoveAPaperAction, postAddAPaperAction, putUpdateAPaperAction } from '../../../actions/paperAction';

const TopicPaperCard = (props: any) => {
    const {templateWithPaper, topicId} = props;
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()
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
    const [show, setShow] = useState(true);

    const [paperFile, setPaperFile] = useState<{_id: string, paperFileName: string}|undefined>(templateWithPaper.paper);
    const [tempPaperFileName, setTempPaperFileName] = useState<string|undefined>(templateWithPaper.paper ? templateWithPaper.paper.paperFileName : undefined);
    const [tempFile, setTempFile] = useState<File|undefined>(undefined);
    const [addMode, setAddMode] = useState(false);

    const downloadTemplateFile = (_id: string, fileName: string) => {
        const url = process.env.REACT_APP_API_URL + "/api/template" + "/" + _id + "/download";
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }

    const downloadPaperFile = (_id: string | undefined, fileName: string | undefined) => {
        if(_id && fileName){
            const url = process.env.REACT_APP_API_URL + "/api/paper" + "/" + _id + "/download";
            const aTag = document.createElement('a');
            aTag.href = url;
            aTag.setAttribute("download", fileName);
            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();
        }
        else{
            console.log("SOMETHING WRONG!!!!")
        }
    }

    const handleDeleteFile = (e:any) => {
        e.preventDefault();
        
        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn xóa giấy tờ?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {

            if(result.isConfirmed){
                dispatch(deleteRemoveAPaperAction(paperFile?._id ? paperFile?._id : ""))
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Xóa thành công',
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'OK',
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            window.location.reload()
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
    
    const handleSaveFile = (e:any) => {
        e.preventDefault();

        const info = {
            topicId: topicId,
            templateId: templateWithPaper._id
        }
        
        //new file
        if(!paperFile){
            if(tempFile){
                let formData = new FormData();
                formData.append('info', JSON.stringify(info))
                formData.append('file', tempFile as File)
                Swal.fire({
                    icon: 'question',
                    title: 'Bạn có chắc muốn lưu giấy tờ?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Yes',
                }).then((result) => {
    
                    if(result.isConfirmed){
                        dispatch(postAddAPaperAction(formData))
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Thêm giấy tờ thành công',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    window.location.reload()
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
            else{
                setAddMode(false);
            }

        }
        //update file
        else{
            if(tempFile){
                let formData = new FormData();
                formData.append('info', JSON.stringify(info))
                formData.append('file', tempFile as File)
                Swal.fire({
                    icon: 'question',
                    title: 'Bạn có chắc muốn cập nhật giấy tờ?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Yes',
                }).then((result) => {
    
                    if(result.isConfirmed){
                        dispatch(putUpdateAPaperAction(formData))
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Cập nhật giấy tờ thành công',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    window.location.reload()
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
            else{
                setAddMode(false);
            }
        }
    }
    // just change state, not call api
    const handleUploadFile = (e: any) =>{
        e.preventDefault();
        setAddMode(true);
    }

    const handleUpdateFile = (e:any) => {
        e.preventDefault();
        setAddMode(true);
    }

    const handleCancleFile = (e:any) => {
        e.preventDefault();
        setAddMode(false);
        setTempFile(undefined);
    }

    return (
    <div className='w-4/5 mb-5'>
                <div className='flex items-center'>
                    <div className='mr-2' onClick={(e) => {
                        e.preventDefault();
                        setShow(!show);
                    }}>
                        <img src={show? DownIcon: RightIcon} className='h-7' alt="" />
                    </div>
                    <div className='text-lg font-bold'>
                        {templateWithPaper.name}
                    </div>
                </div>
                {show && (
                <div className='border border-black rounded-lg px-5 pt-5 pb-2 mt-1'>

                    {!addMode && paperFile && <div>
                        <div className='flex bg-[#E0E0E0] rounded-lg pl-5 items-center w-full py-1'>
                            <img src={FileIcon} className='h-7 pr-5' alt="" />
                            <div className='text-[#1488D8] text-lg no-underline hover:underline hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                downloadPaperFile(paperFile?._id, paperFile?.paperFileName);
                            }}
                            >
                                {paperFile.paperFileName}
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <div className="w-40 mt-3 mr-2 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-2 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                            onClick={handleUpdateFile}
                            >
                                Chỉnh sửa
                            </div>
            
                            <div className="w-40 mt-3 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-2 border border-white-500 rounded-[15px] hover:bg-[#970D15] hover:cursor-pointer"
                            onClick={handleDeleteFile}
                            >
                                Xóa
                            </div>
                        </div>
                    </div>}

                    {!addMode && !paperFile && <div>
                        <div className='flex bg-[#E0E0E0] rounded-lg pl-5 items-center w-full py-1'>
                            <img src={FileIcon} className='h-7 pr-5' alt="" />
                            <div className='text-lg'>
                                Chưa có file nào được upload
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <div className="w-40 mt-3 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-2 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                            onClick={handleUploadFile}
                            >
                                Upload
                            </div>
                        </div>
                    </div>}

                    {addMode && <div>
                        <div className=''>
                            <label
                            className="flex justify-center w-full h-16 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                            {!tempPaperFileName && !paperFile ?  (<span className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="font-medium text-gray-600">
                                    Browse to upload file
                                </span>
                            </span>) : (
                            <div className='flex items-center justify-center'>
                                <img src={FileIcon} className='h-7' alt="" />
                                <div className='text-lg ml-3 text-[#1488D8] text-sm hover:underline hover:cursor-pointer'
                                onClick={(e) => {
                                    e.preventDefault();
                                    downloadPaperFile(paperFile?._id, paperFile?.paperFileName);
                                }}
                                >
                                    {tempPaperFileName}
                                </div>
                            </div>
                            )}
                            <input type="file" name="file_upload" className="w-full h-full hidden"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setTempFile(e.target.files === null ? undefined : e.target.files[0])
                                    setTempPaperFileName(e.target.files === null ? undefined : e.target.files[0].name)
                            }}

                            />
                            </label>
                        </div>
                        <div className='flex justify-end'>
                            <div className="w-40 mt-3 mr-3 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-2 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                            onClick={handleSaveFile}
                            >
                                Lưu
                            </div>
                            <div className="w-40 mt-3 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-2 border border-white-500 rounded-[15px] hover:bg-[#970D15] hover:cursor-pointer"
                            onClick={handleCancleFile}
                            >
                                Hủy
                            </div>
                        </div>
                    </div>}

                    <div className='w-fit text-[#1488D8] text-sm hover:underline hover:cursor-pointer'
                        onClick={(e) => {
                            e.preventDefault();
                            downloadTemplateFile(templateWithPaper._id, templateWithPaper.name);
                        }}
                    >
                        File biểu mẫu
                    </div>
                </div>)}
            </div>
    )

}


const TopicPapers:React.FC = () => {
    let { _id} = useParams();
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [templatesWithPapers, setTemplatesWithPapers] = useState<TemplateWithPaper[]>([]);

    useEffect(() => {
        let queryData = {
            topicId: _id,
            forStudent: true
        }
        dispatch(getTemplatesWithPapersAction(queryData))
                .then((data) => {
                    setTemplatesWithPapers(data?.templatesWithPapers)
                }
                )
                .catch((error) => {
                })
        }
    , []);

    return (
        <div className='p-3'>
            <Link to={'/myTopic'} className='hover:cursor-pointer w-fit'>
                <img src={BackIcon} className='h-5' alt="" />
            </Link>
            <div className='flex flex-col items-center w-full'>
                {
                    templatesWithPapers.map((templateWithPaper) => {
                        return(
                            <TopicPaperCard templateWithPaper={templateWithPaper} topicId={_id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TopicPapers;