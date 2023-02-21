import React, { useState, useEffect } from 'react';
import BackIcon from '../../../../assets/images/🦆 icon _arrow circle left_.png';
import {Link, useLocation, useParams} from "react-router-dom";

const Feedback:React.FC = () => {

    const { state } = useLocation();
    const topic = state?.topic;

    const [type, setType] = useState("xét duyệt");
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File>();

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

    const displayDate = (dateStr: string) => {
        if(dateStr === "") return ""
        const date = new Date(dateStr);
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      }
      const displayPeriod = (dateStr: string) => {
        if(dateStr === "") return ""
        const date = new Date(dateStr);
        return (date.getMonth() + 1) + "/" + date.getFullYear();
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
                        <button className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                        >
                            <div>
                                Gửi
                            </div>
                            
                        </button>

                    </div>

                </div>
        </div>
        
    )
}

export default Feedback