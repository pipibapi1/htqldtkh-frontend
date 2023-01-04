import React from 'react';
import MyTopicIcon from "../../assets/images/myTopicIcon.png";
import TopicRegisterIcon from "../../assets/images/topicRegisterIcon.png";
import RequestIcon from "../../assets/images/requestIcon.png";
import TemplateIcon from "../../assets/images/templateIcon.png";
import Statistics from "../../assets/images/statistics.png";
import RequestManagement from "../../assets/images/requestManagement.png";
import Account from "../../assets/images/account.png";
import Council from "../../assets/images/council.png";
import Folder from "../../assets/images/folder.png";
import Upload from "../../assets/images/upload.png";
import { Link } from "react-router-dom";

interface Props {
    role: string;
}

const SideNav:React.FC<Props> = (props: any) => {

    const {role} = props;

    const studentSideBarOptions = [
        {name: "ĐỀ TÀI CỦA TÔI", icon: MyTopicIcon, link: "/myTopic"},
        {name: "ĐĂNG KÝ ĐỀ TÀI", icon: TopicRegisterIcon, link: "/registerTopic"},
        {name: "YÊU CẦU PHÁT SINH", icon: RequestIcon, link: "/myRequest"},
        {name: "XEM BIỂU MẪU", icon: TemplateIcon, link: "/templates"}
    ]

    const fvdSideBarOptions = [
        {name: "BÁO BIỂU THỐNG KÊ", icon: Statistics, link: "/fvdExpenseStatistic"},
        {name: "QUẢN LÝ YÊU CẦU", icon: RequestManagement, link: "/fvdExpenseStatistic"},
    ]

    const fsSideBarOptions = [
        {name: "BÁO BIỂU THỐNG KÊ", icon: Statistics, link: "/fsExpenseStatistic"},
        {name: "QUẢN LÝ TÀI KHOẢN", icon: Account, link: "/fsExpenseStatistic"},
        {name: "QUẢN LÝ ĐỀ TÀI", icon: Folder, link: "/fsExpenseStatistic"},
        {name: "TẠO BIỂU MẪU", icon: TemplateIcon, link: "/fsExpenseStatistic"},
        {name: "TẠO HỘI ĐỒNG", icon: Council, link: "/fsExpenseStatistic"},
        {name: "UPLOAD THÔNG BÁO", icon: Upload, link: "/fsExpenseStatistic"},
    ]
    return (
        <div>
            {/* student siderbar */}
            {(role === "student") && (<div className='bg-[#1488D8] w-[15vw] min-h-[calc(100vh-280px)] h-[100%] flex flex-col'>
                {studentSideBarOptions?.map((option, i)=> (
                    <Link
                    to={option?.link}
                    key={i}
                    className='bg-transparent border hover:bg-[#1273B6] hover:cursor-pointer active:bg-[#0D619A]'
                    >
                        <div className='flex items-center px-5 py-5'>
                            <img src={option?.icon} alt="requestIcon" className='h-10 w-10'></img>
                            <div className='text-white text-base font-[700] pl-5'>
                                {option?.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>)}
            {/* FVD sidebar */}
            {(role === "fvd") && (<div className='bg-[#1488D8] w-[15vw] h-[calc(100vh-280px)] flex flex-col'>
                {fvdSideBarOptions?.map((option, i)=> (
                    <Link
                    to={option?.link}
                    key={i}
                    className='bg-transparent border hover:bg-[#1273B6] hover:cursor-pointer active:bg-[#0D619A]'
                    >
                        <div className='flex items-center px-5 py-5'>
                            <img src={option?.icon} alt="requestIcon" className='h-10 w-10'></img>
                            <div className='text-white text-base font-[700] pl-5'>
                                {option?.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>)}
            {/* FS sidebar */}
            {(role === "fs") && (<div className='bg-[#1488D8] w-[15vw] h-[calc(100vh-280px)] flex flex-col'>
                {fsSideBarOptions?.map((option, i)=> (
                    <Link
                    to={option?.link}
                    key={i}
                    className='bg-transparent border hover:bg-[#1273B6] hover:cursor-pointer active:bg-[#0D619A]'
                    >
                        <div className='flex items-center px-5 py-5'>
                            <img src={option?.icon} alt="requestIcon" className='h-10 w-10'></img>
                            <div className='text-white text-base font-[700] pl-5'>
                                {option?.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>)}
        </div>
    )
}

export default SideNav;