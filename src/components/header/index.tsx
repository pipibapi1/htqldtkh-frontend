import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { Link, useNavigate  } from "react-router-dom";
import Swal from 'sweetalert2';

import { RootState, AppDispatch } from '../../store';

import { appRouters } from '../../shared/urlResources';
import { Toast } from '../../shared/toastNotify/Toast';
import { RoleType } from '../../shared/types/role';
import { NotificationIntf } from '../../shared/interfaces/notificationInterface';

import NotificationService from '../../services/notificationService';
import StudentService from '../../services/studentService';

import { logoutAction } from "../../actions/authAction";

import BKlogo from "../../assets/images/hcmut.png";
import Bell from "../../assets/images/bell.png";

interface Props {
    isLogin: boolean;
    isAccountServicePage: boolean;
}

const Header: React.FC<Props> = (props: any) => {

    const {isLogin, isAccountServicePage} = props;
    
    const navigate = useNavigate();
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();
    
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    
    const [isDroppedDown, setIsDroppedDown] = useState<boolean>(false);

    const handleLogout = (e:any) => {
        e.preventDefault();

        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn đăng xuất ?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logoutAction());
                navigate("/");
                window.location.reload();
            } 
          })
        
    }

    const handleMyPage = (e: any) => {
        e.preventDefault();
        if(isLoggedIn){
            if(currentUser.role === RoleType.Student){
                navigate("/" + appRouters.LINK_TO_MY_TOPIC_PAGE);
            }else if(currentUser.role === RoleType.FVD){
                navigate("/" + appRouters.LINK_TO_FVD_TOPIC_STATISTIC);
            }
            else{
                navigate("/" + appRouters.LINK_TO_FS_TOPIC_STATISTIC)
            }
        }
    }

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    const handleRead = () => {
        if (notifications.length>0) {
            const data = {
                _id: currentUser?._id,
                numNotification: 0
            }
            StudentService.updateStudentPersonalInfoService(data)
                .then((data) => {
                    setNotifications([])
                })
        }
        setOpen(false);
    };

    const timeAgo = (date: string) => {
        const currTime = new Date();
        let diffTime = Math.floor((currTime.getTime() - (new Date(date)).getTime()) / (1000 * 60));

        if (diffTime < 5) {
            return "Vài phút trước"
        }
        
        if (diffTime < 60) {
            return `${diffTime} phút trước`
        }

        diffTime = Math.floor(diffTime / 60)
        if (diffTime < 24) {
            return `${diffTime} giờ trước`
        }

        diffTime = Math.floor(diffTime / 24)
        if (diffTime < 31) {
            return `${diffTime} ngày trước`
        }

        return "Vài tháng trước"

    }
    const displayNotification = (notification : NotificationIntf) => {
        const onClickNotification = (event : React.MouseEvent<HTMLDivElement>) => {
            navigate(notification.redirect as string);
        }

        return (
            <div className='w-full my-2 rounded hover:bg-slate-100 flex flex-col px-2 py-2'
                onClick={notification.redirect? onClickNotification : undefined}
            >
                <div className='text-normal font-medium my-1'>
                    {notification.subject}
                </div>
                <div className='text-sm font-light'>
                    {notification.content}
                </div>
                <div className='text-sm font-medium text-[#1488d8]'>
                    {timeAgo(notification.createAt)}
                </div>
            </div>
        )
    }

    useEffect(() => {
        const fetchUnreadNotifications = async () => {
            if (isLoggedIn) {
                try {
                    const data = await NotificationService.getUnreadNotificationService();
                    setNotifications(data?.notifications ? data?.notifications : [])
                } catch (error){
                    Toast.fire({
                        icon: 'error',
                        title: error ? error : "Something is wrong!"
                    })
                }
            }
        };
        fetchUnreadNotifications();
    }, [currentUser]);

    return (
        <div className='bg-white grid grid-cols-8 gap-4 p-3 mb-1 max-h-17 border-2 sticky top-0 z-40'>
            {/* The BK icon and the HCMUT name */}
            <Link
                data-testid="link-to-home-page"
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
                <Link 
                data-testid="link-to-register-page"
                to={`/${appRouters.LINK_TO_REGISTER_PAGE}`
                }>
                    <div className="text-[#0079CC] text-xs font-semibold py-2 px-5 no-underline hover:underline hover:cursor-pointer">
                    Đăng ký tài khoản?
                    </div>
                </Link>
                <Link
                data-testid="link-to-login-page"
                to={`/${appRouters.LINK_TO_LOGIN_PAGE}`
                }>
                    <div className="bg-[#0079CC] text-xs transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                    ĐĂNG NHẬP
                    </div>
                </Link>
            </div>)}

            {/* Avatar and drop down menu */}
            {isLogin && !isAccountServicePage && (
            <div className='col-start-7 col-span-2 grid-cols-2 grid '>
                <div 
                    className='relative flex flex-row items-center justify-end hover:cursor-pointer pr-5'
                    id="notificationBtn"
                    onClick={() => setOpen(!open)}
                    data-testid="notification-bell"
                >
                    <img
                        className="p-1 w-9 h-9 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 inline-block "
                        src={Bell}
                        alt="Bordered avatar"
                    ></img>
                    {
                        notifications.length > 0 &&
                        <div className="w-5 h-5 bg-red-600 rounded-full text-sm font-bold text-center mb-6 ml-6
                        items-center content-center absolute">{notifications.length}</div>
                    }
                </div>

                {open && (
                    <div className="dropdown-fullname ml-20 mt-20 w-[450px] max-h-[80vh] text-gray-700 block px-2 py-2 border-2 drop-shadow-lg bg-white overflow-y-auto"
                        id="notification-content"
                    >
                        <div>
                            {notifications.length>0? (
                                notifications.map((n) => displayNotification(n))
                                ) : (
                                    <i className='text-base'>Không có thông báo nào</i>
                                )}
                        </div>
                        <button 
                            className="w-full mr-2 my-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-blue-700 hover:bg-blue-700 
                            focus:ring-4 focus:outline-none focus:ring-blue-300" 
                            onClick={handleRead}
                        >
                            Đánh dấu đã đọc
                        </button>
                    </div>
                )}


                <div 
                    className='relative flex items-center hover:cursor-pointer'
                    onClick = {() => setIsDroppedDown(!isDroppedDown)}
                >
                    <img
                        className="p-1 w-9 h-9 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 inline-block mr-5"
                        src={currentUser?.image}
                        alt="Bordered avatar"
                    ></img>

                    <div
                    className='text-sm font-bold'
                    >
                        {currentUser?.name}
                        <div className='text-sx italic'>
                            {currentUser.role === RoleType.Student ? "Sinh viên" : 
                            (currentUser.role === RoleType.FVD ? "Phó chủ nhiệm" : "Thư ký")}
                        </div>
                    </div>
                </div>

                <div className={
                    "dropdown-fullname divide-y mt-20 " + (!isDroppedDown ? "hidden" : "")
                    }
                    style={{borderRadius: "none"}}
                >
                    <Link to={`/${appRouters.LINK_TO_PERSONAL_INFO_PAGE}`}>
                        <div className="py-1">
                            <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md">
                            Thông tin cá nhân
                            </div>
                        </div>
                    </ Link>
                    <div className="py-1" onClick={() => navigate("/")}>
                        <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md">
                        Trang chủ
                        </div>
                    </div>
                    <div data-testid="link-to-my-page" className="py-1" onClick={handleMyPage}>
                        <div className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 rounded-md">
                        Trang của tôi
                        </div>
                    </div>
                    <div data-testid="logout-button" className="py-1" onClick={handleLogout}>
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