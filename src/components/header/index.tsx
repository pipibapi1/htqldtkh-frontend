import React, {useState} from 'react';
import BKlogo from "../../assets/images/hcmut.png";
import {Link, useNavigate} from "react-router-dom";
import { appRouters } from '../../shared/urlResources';

interface Props {
    isLogin: boolean;
    isAccountServicePage: boolean;
}

const Header: React.FC<Props> = (props: any) => {
    const navigation = useNavigate();

    const handleLogout = () => {
        navigation(`/${appRouters.LINK_TO_LOGIN_PAGE}`);
    }

    const [isDroppedDown, setIsDroppedDown] = useState<boolean>(false);
    const {isLogin, isAccountServicePage} = props;

    return (
        <div className='bg-white grid grid-cols-12 gap-4 p-3 mb-1 max-h-17 border-2 sticky top-0'>
            {/* The BK icon and the HCMUT name */}
            <Link
                className='col-start-1 col-span-5 flex items-center hover:cursor-pointer'
                to={`/${appRouters.LINK_TO_HOME_PAGE}`}
            >
                <img
                    className='p-1 w-20 h-20' 
                    src={BKlogo} 
                    alt="BKLogo">
                </img>
                <div className='font-sans px-5'>
                    <div className='flex justify-center items-center text-[#1488D8] text-base font-[550]'>
                    ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH
                    </div>
                    <div className='flex justify-center items-center text-[#030391] text-lg font-[550]'>
                    TRƯỜNG ĐẠI HỌC BÁCH KHOA
                    </div>
                </div>
            </Link>

            {/*
                * Register link and login button
                * Only appear when user not logged in and the page is not an account service page
            */}
            {!isLogin && !isAccountServicePage && (
            <div className='col-start-11 col-span-5 flex items-center'>
                <Link to={`/${appRouters.LINK_TO_REGISTER_PAGE}`}>
                    <div className="text-[#0079CC] text-xs font-semibold py-2 px-5 no-underline hover:underline hover:cursor-pointer">
                    Đăng ký tài khoản?
                    </div>
                </Link>
                <Link to={`/${appRouters.LINK_TO_LOGIN_PAGE}`}>
                    <div className="bg-[#0079CC] text-xs transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                    ĐĂNG NHẬP
                    </div>
                </Link>
            </div>)}

            {/* Avatar and drop down menu */}
            {isLogin && !isAccountServicePage && (
            <div className='col-start-12 col-span-5'>
                <div 
                className='relative flex items-center hover:cursor-pointer pt-5'
                onClick = {() => setIsDroppedDown(!isDroppedDown)}
                >
                    <img
                    className="p-1 w-9 h-9 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 inline-block mr-5"
                    src="https://media.istockphoto.com/vectors/three-persons-icon-black-vector-vector-id1158561473?k=20&m=1158561473&s=612x612&w=0&h=pSRNS3mkeYMYcleK_Pzf89gnkVQuxtiSGMm4yll-UXg="
                    alt="Bordered avatar"
                    ></img>

                    <div
                    // style={{ fontSize: "16px", fontWeight: "bold", width: "150px" }}
                    className='text-sm font-bold'
                    >
                        Trần Anh Quân
                    </div>
                </div>

                <div className={
                    "dropdown-fullname divide-y " + (!isDroppedDown ? "hidden" : "")
                    }
                    style={{borderRadius: "none"}}
                >
                    <div className="py-1" onClick={() => alert("Thông tin cá nhân")}>
                        <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md">
                        Thông tin cá nhân
                        </div>
                    </div>
                    <div className="py-1" onClick={() => alert("Trang chủ")}>
                        <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md">
                        Trang chủ
                        </div>
                    </div>
                    <div className="py-1" onClick={() => alert("Trang của tôi")}>
                        <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md">
                        Trang của tôi
                        </div>
                    </div>
                    <div className="py-1" onClick={handleLogout}>
                        <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md">
                        Đăng xuất
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
}

export default Header;