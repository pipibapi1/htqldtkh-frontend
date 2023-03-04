import React, {useState, useEffect} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import { useDispatch} from "react-redux";
import {AppDispatch } from '../../../store';
import BackIcon from '../../../assets/images/🦆 icon _arrow circle left_.png';
import FileIcon from "../../../assets/images/files.png"
import { deleteRemoveAProductAction, getAProductAction, getAProductByTopicIdAction, postAddAProductAction, putUpdateAProductAction } from '../../../actions/productAction';

import Swal from 'sweetalert2';


const TopicProduct:React.FC = () => {

    let { _id} = useParams();

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const { state } = useLocation();

    const [addMode, setAddMode] = useState(false);
    const [product, setProduct] = useState<{_id: string, productFileName: string} | undefined>(undefined);
    const [tempProductName, setTempProductName] = useState<string|undefined>(undefined);
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

    const downloadProductFile = (_id: string | undefined, fileName: string | undefined) => {
        if(_id && fileName){
            const url = process.env.REACT_APP_API_URL + "/api/product" + "/" + _id + "/download";
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
    
    const handleUploadFile = (e: any) => {
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
        setFile(undefined);
    }

    const handleSaveFile = (e:any) => {
        e.preventDefault();

        const info = {
            topicId: _id,
        }
        
        //new file
        if(!product){
            if(file){
                let formData = new FormData();
                formData.append('info', JSON.stringify(info))
                formData.append('file', file as File)
                Swal.fire({
                    icon: 'question',
                    title: 'Bạn có chắc muốn lưu sản phẩm?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Yes',
                }).then((result) => {
    
                    if(result.isConfirmed){
                        dispatch(postAddAProductAction(formData))
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Thêm sản phẩm thành công',
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
            if(file){
                let formData = new FormData();
                formData.append('info', JSON.stringify(info))
                formData.append('file', file as File)
                Swal.fire({
                    icon: 'question',
                    title: 'Bạn có chắc muốn cập nhật sản phẩm?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Yes',
                }).then((result) => {
    
                    if(result.isConfirmed){
                        dispatch(putUpdateAProductAction(formData, product._id))
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Cập nhật sản phẩm thành công',
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

    const handleDeleteFile = (e:any) => {
        e.preventDefault();
        
        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn xóa sản phẩm?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {

            if(result.isConfirmed){
                dispatch(deleteRemoveAProductAction(product?._id ? product?._id : ""))
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

    const displayForDate = (date: string) => {
        if(date === "") return "";
        const d = new Date(date);
        return "Ngày " + d.getDate() + " Tháng " + (d.getMonth() + 1) + " Năm " + d.getFullYear();
    }

    useEffect(() => {
            dispatch(getAProductByTopicIdAction(_id?_id:""))
                    .then((data) => {
                        setProduct(data?.product);
                        console.log(data?.product)
                        setTempProductName(data?.product.productFileName);
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

            <div className='bg-gray-100 pb-10 mt-2'>
                <div className='p-2 border-b-2'>
                    <div className='flex'>
                        <div className='text-sm w-[65px] font-bold mr-5'>
                            Bắt đầu: 
                        </div>
                        <div className='text-sm font-medium'>
                            {displayForDate(state?.startTime)}
                        </div>
                    </div>
                    <div className='flex mt-1'>
                        <div className='text-sm w-[65px] font-bold mr-5'>
                            Kết thúc: 
                        </div>
                        <div className='text-sm font-medium'>
                            {displayForDate(state?.endTime)}
                        </div>
                    </div>
                </div>

                <div className='p-2 text-[#A4A4A4] text-sm'>
                    Nén tất cả các file thành một file zip duy nhất rồi nộp vào dưới đây
                </div>
            </div>

            {!addMode && !product && (
            <div className="w-40 mt-5 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                onClick = {handleUploadFile}
            >
                Thêm sản phẩm
            </div>)}

            {!addMode && product && (
            <div className='flex'>
                <div className="w-40 mt-5 mr-2 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                    onClick={handleUpdateFile}
                >
                    Chỉnh sửa
                </div>

                <div className="w-40 mt-5 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#970D15] hover:cursor-pointer"
                    onClick={handleDeleteFile}
                >
                    Xóa
                </div>
            </div>
            )}

            {!addMode && (<div className='mt-5 w-full'>
                <div className='text-xl font-bold'>
                    Tình trạng sản phẩm
                </div>
                <div className='mt-2 px-10 w-4/5'>
                    <div className='flex'>
                        <div className='w-1/3 border-t-2 py-3 border-l-2 text-lg flex items-center justify-center'>
                            Tình trạng nộp
                        </div>
                        {!product && (<div className='w-2/3 border-t-2 py-3 border-l-2 border-r-2 text-lg flex items-center justify-center'>
                            Chưa có sản phẩm nào được nộp
                        </div>)}
                        {product && (<div className='w-2/3 bg-[#7CEEA3] border-t-2 py-3 border-l-2 border-r-2 text-lg flex items-center justify-center'>
                            Đã nộp
                        </div>)}
                    </div>

                    <div className='flex'>
                        <div className='w-1/3 border-t-2 py-20 border-l-2 border-b-2 text-lg flex items-center justify-center'>
                            Tập tin sản phẩm
                        </div>
                        {!product && (<div className='w-2/3 border-t-2 py-20 border-l-2 border-r-2 border-b-2 text-lg flex items-center justify-center'>
                            Chưa có tập tin nào được thêm
                        </div>)}

                        {product && tempProductName && (<div className='w-2/3 border-t-2 py-20 border-l-2 border-r-2 border-b-2 text-lg flex items-center justify-center'>
                            <img src={FileIcon} className='h-7' alt="" />
                            <div className='text-lg ml-3 text-[#1488D8] text-lg no-underline hover:underline hover:cursor-pointer'
                                onClick={(e: any) => {
                                    e.preventDefault();
                                    downloadProductFile(product?._id, product?.productFileName);
                                }}
                            >
                                {product.productFileName}
                            </div>
                        </div>)}
                    </div>

                    <div className='flex'>

                    </div>
                </div>
            </div>)}

            {addMode && (<div className='text-xl font-bold mt-5'>
                Thêm sản phẩm
            </div>)}
            {addMode && (
            <div className='w-full mt-5 flex items-center justify-center'>
                <div className="w-4/5">
                    <label
                        className="flex justify-center w-full h-64 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        {!tempProductName ?  (<span className="flex items-center space-x-2">
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
                            <div className='text-lg ml-3 text-[#1488D8] text-lg no-underline hover:underline hover:cursor-pointer'
                                onClick={(e: any) => {
                                    e.preventDefault();
                                    downloadProductFile(product?._id, product?.productFileName);
                                }}
                            >
                                {tempProductName}
                            </div>
                        </div>
                        )}
                        <input type="file" name="file_upload" className="w-full h-full hidden"
                            onChange={(e) => {
                                e.preventDefault();
                                setFile(e.target.files === null ? undefined : e.target.files[0])
                                setTempProductName(e.target.files === null ? undefined : e.target.files[0].name)
                        }}

                        />
                    </label>
                </div>
            </div>)}
            {addMode && (
            <div className='flex items-center justify-center w-full'>
                <div className="w-40 mt-5 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                    onClick={handleSaveFile}
                >
                Lưu thay đổi
                </div>
                <div className="w-40 mt-5 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#7E080F] hover:cursor-pointer"
                onClick = {handleCancleFile}
                >
                Hủy
                </div>
            </div>)}
        </div>
    )
}

export default TopicProduct;