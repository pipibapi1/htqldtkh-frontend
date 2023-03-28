import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';

import { AppDispatch } from '../../../../store';

import { Period } from '../../../../shared/interfaces/periodInterface';
import { Toast } from '../../../../shared/toastNotify/Toast';
import { displayPeriod } from '../../../../shared/functions';

import { getAllPeriodsAction } from "../../../../actions/periodAction"
import { postAddAnAnnouncementAction } from '../../../../actions/announcementAction';

import Calendar from "../../../../assets/images/calendar.png";

const UploadInterface: React.FC = (props: any) => {

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [year, setYear] = useState(new Date())
    const [periods, setPeriods] = useState<Period[]>([])
    const [currentPeriod, setCurrentPeriod] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File>();

      const onChangeYear = (d: Date) => {
        let query: any = {
            year: d.getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
                if(data?.periods.length > 0){
                    setCurrentPeriod(data?.periods[0]);
                }
            })
            .catch((error) => {
                
            })
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
                    content: content,
                    period: currentPeriod,
                    year: year.getFullYear()
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

    useEffect(() => {
        let query= {
            year: (new Date()).getFullYear()
        }
        dispatch(getAllPeriodsAction(query))
            .then((data) => {
                setPeriods(data?.periods)
                if(data?.periods.length > 0){
                    setCurrentPeriod(data?.periods[0]._id)
                }
                
            })
            .catch((error) => {
                
            })
    }, []);
    
    return (
        <div className=''>
            <div className='flex items-center p-5'>
                    <div className='mr-5'>
                                Năm: 
                    </div>
                    <div className='grid justify-items-end items-center mr-10'>
                        <DatePicker
                            onChange={date => {
                                if(date){
                                    setYear(date);
                                    onChangeYear(date);
                                }
                                }}
                            selected={year}
                            dateFormat="yyyy"
                            showYearPicker
                            className="h-[40px] w-[90px] border border-black border-1 rounded-md px-2"
                                    />
                        <div className='absolute mr-2'>
                            <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                        </div>
                    </div>
                <div className='flex items-center'>
                        <div className='mr-5'>
                                Đợt: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[120px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setCurrentPeriod(e.target.value);
                                    }}
                                    defaultValue={periods.length === 0 ? "" : periods[0]._id}
                                    value={currentPeriod}
                                >
                                {periods.map((period, index) => 
                                <option value={period._id} id={period._id}>{displayPeriod(period.period)}</option>
                                )}
                                <option value="">- -</option>
                            </select>
                        </div>
                </div>
            </div>

            <div className='p-5'>
            <div className='flex justify-between'>
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
                <div className='flex justify-end'>
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
        </div>
    )
}

export default UploadInterface;