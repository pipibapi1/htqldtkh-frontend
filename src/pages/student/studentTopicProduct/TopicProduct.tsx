import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import BackIcon from '../../../assets/images/🦆 icon _arrow circle left_.png';
import FileIcon from "../../../assets/images/files.png"


const TopicProduct:React.FC = () => {
    const { state } = useLocation();
    const [addMode, setAddMode] = useState(false);
    const [file, setFile] = useState<File>();
    const handleChange = (file: any) => {
        setFile(file);
    };

    const displayForDate = (date: string) => {
        if(date === "") return "";
        const d = new Date(date);
        return "Ngày " + d.getDate() + " Tháng " + (d.getMonth() + 1) + " Năm " + d.getFullYear();
    }

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

            {!addMode && !file && (
            <div className="w-40 mt-5 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                onClick = {(e) => {
                    e.preventDefault();
                    setAddMode(!addMode)
                }}
            >
                Thêm sản phẩm
            </div>)}

            {!addMode && file && (
            <div className='flex'>
                <div className="w-40 mt-5 mr-2 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                    
                >
                    Chỉnh sửa
                </div>

                <div className="w-40 mt-5 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#970D15] hover:cursor-pointer"
                    
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
                        {!file && (<div className='w-2/3 border-t-2 py-3 border-l-2 border-r-2 text-lg flex items-center justify-center'>
                            Chưa có sản phẩm nào được nộp
                        </div>)}
                        {file && (<div className='w-2/3 bg-[#7CEEA3] border-t-2 py-3 border-l-2 border-r-2 text-lg flex items-center justify-center'>
                            Đã nộp
                        </div>)}
                    </div>

                    <div className='flex'>
                        <div className='w-1/3 border-t-2 py-20 border-l-2 border-b-2 text-lg flex items-center justify-center'>
                            Tập tin sản phẩm
                        </div>
                        {!file && (<div className='w-2/3 border-t-2 py-20 border-l-2 border-r-2 border-b-2 text-lg flex items-center justify-center'>
                            Chưa có tập tin nào được thêm
                        </div>)}

                        {file && (<div className='w-2/3 border-t-2 py-20 border-l-2 border-r-2 border-b-2 text-lg flex items-center justify-center'>
                            <img src={FileIcon} className='h-7' alt="" />
                            <div className='text-lg ml-3'>
                                {file.name}
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
            {addMode && (<div className='w-full mt-5 flex items-center justify-center'>
                <div className="w-4/5">
                    <label
                        className="flex justify-center w-full h-64 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        {!file ?  (<span className="flex items-center space-x-2">
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
                            <div className='text-lg ml-3'>
                                {file.name}
                            </div>
                        </div>
                        )}
                        <input type="file" name="file_upload" className="w-full h-full hidden"
                            onChange={(e) => {
                                e.preventDefault();
                                setFile(e.target.files === null ? undefined : e.target.files[0])
                        }}

                        />
                    </label>
                </div>
            </div>)}
            {addMode && (
            <div className='flex items-center justify-center w-full'>
                <div className="w-40 mt-5 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        setAddMode(!addMode)
                    }}
                >
                Lưu thay đổi
                </div>
                <div className="w-40 mt-5 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#7E080F] hover:cursor-pointer"
                onClick = {(e) => {
                    e.preventDefault();
                    setAddMode(!addMode)
                    setFile(undefined)
                }}
                >
                Hủy
                </div>
            </div>)}
        </div>
    )
}

export default TopicProduct;