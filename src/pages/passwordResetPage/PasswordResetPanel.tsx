import React, { useState } from 'react';
import BKlogo from "../../assets/images/hcmut.png";
import {Link, useLocation} from "react-router-dom";
import { RoleType } from '../../shared/types/role';
import { useDispatch, useSelector } from "react-redux";
import { Navigate} from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { resetpwAction } from '../../actions/authAction';
import Swal from 'sweetalert2';

const PasswordResetPanel: React.FC = (props: any) => {
    const location = useLocation();
    const {role} = location.state;

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const { user: currentUser } = useSelector((state: RootState) => state.auth);

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

    let roleDisplay: string = "";
    
    if(role === RoleType.Student){
        roleDisplay = "SINH VIÊN"
    }
    else if (role === RoleType.FVD){
        roleDisplay = "PHÓ CHỦ NHIỆM KHOA"
    }
    else{
        roleDisplay = "THƯ KÝ KHOA"
    }

    const useAppDispatch: () => AppDispatch = useDispatch

    const dispatch = useAppDispatch()

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [validEmail, setValidEmail] = useState(true);

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const onChangeEmail = (e:any) => {
        const email = e.target.value;
        if(e.target?.value && e.target.value.match(isValidEmail)){
            setValidEmail(true);
        }else{
            setValidEmail(false)
        }
        setEmail(email);
    }

    const handleResetPassword = (e:any) => {
        setLoading(true)
        e.preventDefault();
        const resetPassWordData = {
            email: email,
            role: role
        }

        if(email === ""){
            setLoading(false);
            Toast.fire({
                icon: 'warning',
                title: 'Bạn không được để  trống email'
              })
        }
        else if(!validEmail){
            setLoading(false);
            Toast.fire({
                icon: 'warning',
                title: 'Email không đúng định dạng'
              })
        }
        else{
            dispatch(resetpwAction(resetPassWordData))
            .then(() => {
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Đã reset mật khẩu thành công',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
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
                            title: 'Email không tồn tại'
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

        
    }

    if (isLoggedIn) {
        if(currentUser.role === RoleType.Student){
            return <Navigate to="/myTopic" />;
        }else if(currentUser.role === RoleType.FVD){
            return <Navigate to="/fvdExpenseStatistic" />;
        }
        else if(currentUser.role === RoleType.FS){
            return <Navigate to="/fsExpenseStatistic" />;
        }
        else{
        }
      }

    return (
        <div className='w-full min-h-[calc(100vh-248px)] bg-[#E9E9E9] flex justify-center items-center py-3'>
                <div className='w-1/3 bg-white flex flex-col rounded-lg items-center pt-5 pb-10 px-10'>
                    <div className='w-full flex flex-row justify-center items-center'>
                        <img 
                        src={BKlogo} 
                        alt="BKlogo"
                        className='h-35 w-35'
                        />
                        <div className = 'text-xl font-semibold text-blue-800'>
                        QUÊN MẬT KHẨU
                        <div className = 'text-sm font-semibold text-black'>
                            Vai trò: {roleDisplay}
                        </div>
                        </div>
                    </div>

                    <div className='w-full border-t-2 border-black pt-3 pb-5'>
                        <div className='mb-3 mt-1 text-lg font-bold'>
                        Nhập email đã đăng ký để reset mật khẩu
                        </div>

                        <div className='mb-3 mt-3 text-lg font-medium flex items-center'>
                        Email
                            {!validEmail && (<div className='ml-5 text-red-500 text-xs font-medium'>
                                    * Email không đúng định dạng
                                </div>
                                )}
                        </div>

                        <input className={validEmail ? 'w-full h-[40px] border border-black large rounded-lg text-base flex justify-center items-center py-4 mb-3 p-2' : 
                                                       'w-full h-[40px] border border-red-500 focus:outline-0 large rounded-lg text-base flex justify-center items-center py-4 mb-3 p-2'
                                                        } 
                            name="email"
                            type="email"
                            onChange={onChangeEmail}
                        />
                        
                    </div>

                    <div className='w-full content-center grid place-items-center'>
        
                    <button className="w-full bg-[#0079CC] transition text-white text-center font-semibold py-5 px-8  border border-white-500  hover:bg-[#025A97] hover:cursor-pointer"
                        onClick={handleResetPassword}
                        disabled={loading? true: false}
                    >
                    
                        {loading?
                        (<div>
                            Processing...
                            
                        </div>):
                        (<div>
                            RESET MẬT KHẨU
                        </div>)}
                    </button>

                    </div>
                </div>
            </div>
    )
}

export default PasswordResetPanel;