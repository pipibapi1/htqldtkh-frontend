import React, {useState} from 'react';
import BKlogo from "../../assets/images/hcmut.png";
import {Link} from "react-router-dom";
import { appRouters } from '../../shared/urlResources';
import { useDispatch, useSelector} from "react-redux";
import { Navigate ,useNavigate  } from 'react-router-dom';
import { logoutAction } from "../../actions/authAction";
import { RootState,AppDispatch } from '../../store';
import { RoleType } from '../../shared/types/role';
import Swal from 'sweetalert2';

interface Props {
    isLogin: boolean;
    isAccountServicePage: boolean;
}

const Header: React.FC<Props> = (props: any) => {
    let navigate = useNavigate();
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    const handleLogout = (e:any) => {
        e.preventDefault();

        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn đăng xuất ?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'OK',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
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
                navigate("/myTopic");
            }else if(currentUser.role === RoleType.FVD){
                navigate("/fvdExpenseStatistic");
                return <Navigate to="/fvdExpenseStatistic" />;
            }
            else{
                navigate("/fsExpenseStatistic")
            }
        }
    }

    const [isDroppedDown, setIsDroppedDown] = useState<boolean>(false);
    const {isLogin, isAccountServicePage} = props;

    return (
        <div className='bg-white grid grid-cols-12 gap-4 p-3 mb-1 max-h-17 border-2 sticky top-0 z-40'>
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
                    src={currentUser?.image}
                    alt="Bordered avatar"
                    ></img>

                    <div
                    className='text-sm font-bold'
                    >
                        {currentUser?.name}
                        <div className='text-xs italic'>
                            {currentUser.role === RoleType.Student ? "Sinh viên" : 
                            (currentUser.role === RoleType.FVD ? "Phó chủ nhiệm Khoa" : "Thư ký Khoa")}
                        </div>
                    </div>
                </div>

                <div className={
                    "dropdown-fullname divide-y " + (!isDroppedDown ? "hidden" : "")
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
                    <div className="py-1" onClick={handleMyPage}>
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