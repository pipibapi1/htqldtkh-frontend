import React, { useState } from 'react';
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';

import { RootState, AppDispatch } from '../../store';

import { RoleType } from '../../shared/types/role';
import { appRouters } from '../../shared/urlResources';
import { Toast } from '../../shared/toastNotify/Toast';

import { loginAction } from "../../actions/authAction";

import BKlogo from "../../assets/images/hcmut.png";
import EyeOpen from "../../assets/images/eyeOpen.png";
import EyeClose from "../../assets/images/eyeClose.png";

const LoginPanel: React.FC = () => {

    const location = useLocation();
    const { role } = location.state;
    const navigate = useNavigate();

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onChangeUsername = (e: any) => {
        const username = e.target.value;
        setUsername(username);
    };
    
    const onChangePassword = (e: any) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e: any) => {
        setLoading(true);
        e.preventDefault();

        if(username === ""){
            setLoading(false);
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để trống tên đăng nhập'
              })
        }
        else if(password === ""){
            setLoading(false);
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để  trống mật khẩu'
              })
        }
        else
        {
            const signInData = {
                username: username,
                password: password,
                role: role
            }
            
            dispatch(loginAction(signInData))
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng nhập thành công',
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'OK',
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            if(role === RoleType.Student){
                                navigate("/" + appRouters.LINK_TO_MY_TOPIC_PAGE);
                            }else if(role === RoleType.FVD){
                                navigate("/" + appRouters.LINK_TO_FVD_TOPIC_STATISTIC);
                            }
                            else{
                                navigate("/" + appRouters.LINK_TO_FS_TOPIC_STATISTIC);
                            }
                            window.location.reload();
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
    
                        if(error.response.status === 404){
                            Toast.fire({
                                icon: 'error',
                                title: 'Tên đăng nhập không tồn tại'
                              })
                        }
    
                        if(error.response.status === 409){
                            Toast.fire({
                                icon: 'error',
                                title: 'Mật khẩu không đúng'
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
        
    };


    if (isLoggedIn) {
        if(currentUser.role === RoleType.Student){
            return <Navigate to={"/" + appRouters.LINK_TO_MY_TOPIC_PAGE} />;
        }else if(currentUser.role === RoleType.FVD){
            return <Navigate to={"/" + appRouters.LINK_TO_FVD_TOPIC_STATISTIC} />;
        }
        else if(currentUser.role === RoleType.FS){
            return <Navigate to={"/" + appRouters.LINK_TO_FS_TOPIC_STATISTIC} />;
        }
        else{
        }
    }
    
    return (
            <div className='w-full min-h-[calc(100vh-248px)] bg-[#E9E9E9] flex justify-center items-center py-3'>
                <div className='w-1/3 bg-white flex flex-col rounded-lg items-center pt-5 pb-7 px-10 content-center'>
                    <div className='w-full flex flex-row justify-center items-center'>
                        <img 
                        src={BKlogo} 
                        alt="BKlogo"
                        className='h-35 w-35'
                        />
                        <div className = 'text-xl font-semibold text-blue-800'>
                        ĐĂNG NHẬP 
                            <div className = 'text-sm font-semibold text-black'>
                            Vai trò: {role}
                            </div>
                        </div>
                    </div>

                    <div className='w-full border-t-2 border-black pt-1 pb-1'>
                        <div className='mb-2 mt-2 text-lg font-bold'>
                        Nhập tài khoản và mật khẩu
                        </div>

                        <div className='mb-1 mt-1 text-lg font-medium'>
                        Tên đăng nhập
                        </div>

                        <input className='w-full h-[40px] border border-black large rounded-lg text-base flex justify-center items-center py-4 mb-3 p-2'
                                name="username"
                                type="text"
                                placeholder='Tên đăng nhập'
                                onChange={onChangeUsername}
                        />
                        
                        <div className='mb-1 mt-1 text-lg font-medium'>
                            Mật khẩu
                        </div>
                        <div className=' grid justify-items-end items-center'>
                            <input
                                type={showPassword? "text":"password"}
                                name="password"
                                onChange={onChangePassword}
                                placeholder='Mật khẩu'
                                className="w-full h-[40px] border border-black large rounded-lg text-base flex justify-center items-center py-4 mb-3 p-2"
                            />
                            <div className=' absolute mr-2'>
                                <button onClick={toggleShowPassword}>
                                    {showPassword ? 
                                        (<img src={EyeOpen} alt="eyeIcon" className='h-5 w-6'/>) : 
                                        (<img src={EyeClose} alt="eyeIcon" className='h-5 w-6'/>)
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full grid grid-cols-2 space-x-3 content-center   '>
  
                        <button 
                            data-testid="login-button"
                            className="bg-[#0079CC] flex items-center justify-center w-full transition text-white text-center font-semibold py-4 px-4  border border-white-500  hover:bg-[#025A97] hover:cursor-pointer"
                            onClick={handleLogin}
                            disabled={loading? true: false}
                        >
                            {loading ? (<div> Processing... </div>) : (<div> ĐĂNG NHẬP </div>)}
                        </button>

                        <Link to={"/" + appRouters.LINK_TO_LOGIN_PASSWORD_RESET_PAGE}
                            state={{role: role}}
                        >
                            <div className="w-full bg-[#ff0000] transition text-white text-center font-semibold py-4 px-4  border border-white-500  hover:bg-[#b00000] hover:cursor-pointer">
                            QUÊN MẬT KHẨU
                            </div>
                        </Link>

                    </div>
                </div>
        </div>
    )
}

export default LoginPanel;