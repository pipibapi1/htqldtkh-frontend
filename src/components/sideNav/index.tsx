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
import { RoleType } from '../../shared/types/role';


interface ItemProps{
    key: number;
    name: string;
    icon: any;
    link: string;
    active: boolean;
}

const SideNavItem:React.FC<ItemProps> = (props: any) => {
    return(
        <Link
            to={props?.link}
            key={props?.key}
            className={props?.active?
                 'bg-[#0D619A] border hover:cursor-pointer':
                 'bg-transparent border hover:bg-[#1273B6] hover:cursor-pointer active:bg-[#0D619A]'
                }
            >
            <div className='flex items-center pl-5 py-4'>
                <img src={props?.icon} alt="requestIcon" className='h-6 w-6'></img>
                <div className='text-white text-sm font-[700] pl-4'>
                    {props?.name}
                </div>
            </div>
        </Link>
    )
}

interface Props {
    role: RoleType;
    pathName: string;
}

const SideNav:React.FC<Props> = (props: any) => {

    const {role, pathName} = props;

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

    let activeItem:number = 0;

    if(role === RoleType.Student){
        activeItem = studentSideBarOptions.findIndex(
            (item) => item.link === pathName
        );
    }
    else if(role === RoleType.FVD){
        activeItem = fvdSideBarOptions.findIndex(
            (item) => item.link === pathName
        )
    }
    else{
        activeItem = fsSideBarOptions.findIndex(
            (item) => item.link === pathName
        )
    }

    return (
        <div>
            {/* student siderbar */}
            {(role === RoleType.Student) && (<div className='bg-[#1488D8] w-[15vw] min-h-[calc(100vh-112px)] h-[100%] flex flex-col'>
                {studentSideBarOptions?.map((option, i)=> (
                    <SideNavItem
                        key={i}
                        name={option?.name}
                        icon={option?.icon}
                        link={option?.link}
                        active={i === activeItem}
                    />
                ))}
            </div>)}
            {/* FVD sidebar */}
            {(role === RoleType.FVD) && (<div className='bg-[#1488D8] w-[15vw] min-h-[calc(100vh-112px)] h-[100%] flex flex-col'>
                {fvdSideBarOptions?.map((option, i)=> (
                    <SideNavItem
                        key={i}
                        name={option?.name}
                        icon={option?.icon}
                        link={option?.link}
                        active={i === activeItem}
                    />
                ))}
            </div>)}
            {/* FS sidebar */}
            {(role === RoleType.FS) && (<div className='bg-[#1488D8] w-[15vw] min-h-[calc(100vh-112px)] h-[100%] flex flex-col'>
                {fsSideBarOptions?.map((option, i)=> (
                    <SideNavItem
                        key={i}
                        name={option?.name}
                        icon={option?.icon}
                        link={option?.link}
                        active={i === activeItem}
                    />
                ))}
            </div>)}
        </div>
    )
}

export default SideNav;