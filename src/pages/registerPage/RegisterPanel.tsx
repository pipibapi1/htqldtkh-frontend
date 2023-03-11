import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { RootState, AppDispatch } from '../../store';

import { RoleType } from '../../shared/types/role';
import { GenderType } from '../../shared/types/gender';
import { EducationType } from '../../shared/types/educationType';
import { Toast } from '../../shared/toastNotify/Toast';
import { capitalizeFirstLetter } from '../../shared/functions';
import { appRouters } from '../../shared/urlResources';

import { registerAction } from '../../actions/authAction';

import BKlogo from "../../assets/images/hcmut.png";
import Calendar from "../../assets/images/calendar.png";
import EyeOpen from "../../assets/images/eyeOpen.png";
import EyeClose from "../../assets/images/eyeClose.png"

const RegisterPanel: React.FC = () => {

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const { user: currentUser } = useSelector((state: RootState) => state.auth);

    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [fmName, setfmName] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState(GenderType.MALE);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [studentId, setStudentId] = useState("");
    const [educationType, setEducationType] = useState(EducationType.CQ);
    const [birthDate, setBirthDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onChangeFmName = (e: any) => {
        const fmName = e.target.value;
        setfmName(fmName);
    }

    const onChangeName = (e:any) => {
        const name = e.target.value;
        setName(name);
    }

    const onChangeGender = (e:any) => {
        const gender = e.target.value;
        setGender(gender);
    }

    const onChangePhoneNumber = (e:any) => {
        const isValidPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        const phoneNumber = e.target.value;
        if(e.target?.value && e.target.value.match(isValidPhoneNumber)){
            setValidPhoneNumber(true);
        }else{
            setValidPhoneNumber(false)
        }
        setPhoneNumber(phoneNumber);
    }

    const onChangeEmail = (e:any) => {
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const email = e.target.value;
        if(e.target?.value && e.target.value.match(isValidEmail)){
            setValidEmail(true);
        }else{
            setValidEmail(false)
        }
        setEmail(email);
    }

    const onChangeUsername = (e: any) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e: any) => {
        const password = e.target.value;
        setPassword(password);
    }

    const onChangeStudentId = (e:any) => {
        const studentId = e.target.value;
        setStudentId(studentId);
    }

    const onChangeEducationType = (e:any) => {
        const educationType = e.target.value;
        setEducationType(educationType);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleRegister = (e:any) => {
        setLoading(true);
        e.preventDefault();

        if(fmName === "" || name === "" || phoneNumber === ""
          || email === "" || username === "" || password === ""
          || studentId === ""){
            setLoading(false);
            Toast.fire({
                icon: 'warning',
                title: 'Hãy điền đầy đủ các thông tin'
              })
        }
        else if(!validEmail){
            setLoading(false);
            Toast.fire({
                icon: 'warning',
                title: 'Email không đúng định dạng'
              })
        }
        else if(!validPhoneNumber){
            setLoading(false);
            Toast.fire({
                icon: 'warning',
                title: 'SĐT không đúng định dạng'
              })
        }
        else{
            const fullName = fmName + " " + name;
            const registerData = {
                email: email,
                phoneNumber: phoneNumber,
                name: fullName,
                username: username,
                password: password,
                studentId: studentId,
                gender: gender,
                educationType: educationType,
                birthDate: birthDate,
                role: RoleType.Student
            }
            console.log(registerData);
            dispatch(registerAction(registerData))
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Đăng ký thành công',
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'OK',
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            navigate("/" + appRouters.LINK_TO_MY_TOPIC_PAGE);
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
                            if(error.response.data.msg === "existed username"){
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Tên đăng nhập đã tồn tại'
                                  })
                            }
                            else if(error.response.data.msg === "existed email"){
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Email đã được sử dụng'
                                  })
                            }
                            else{
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Bad request'
                                  })
                            }
                            
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
                })
        }
    }


    if (isLoggedIn) {
        if(currentUser.role === RoleType.Student){
            return <Navigate to={"/" + appRouters.LINK_TO_MY_TOPIC_PAGE} />;
        }else if(currentUser.role === RoleType.FVD){
            return <Navigate to={"/" + appRouters.LINK_TO_FVD_TOPIC_STATISTIC} />;
        }
        else if(currentUser.role === RoleType.FS){
            return <Navigate to={"/" + appRouters.LINK_TO_FS_TOPIC_STATISTIC}  />;
        }
    }

    return(
        <div className='w-full min-h-[calc(100vh-248px)] bg-[#E9E9E9] flex justify-center items-center py-2'>
            <div className='bg-white flex flex-col rounded-md items-center pt-1 pb-2 px-10'>
                <div className='flex justify-center items-center'>

                    <img 
                        src={BKlogo} 
                        alt="BKlogo"
                        className='h-35 w-35'
                    />

                    <div className='text-[#030391] text-lg font-semibold'>
                        ĐĂNG KÝ TÀI KHOẢN
                        <div className = 'text-sm font-semibold italic text-black'>
                            Chỉ dành cho sinh viên
                        </div>
                    </div>

                </div>

                <div className='border-t-2 border-b-2 border-[#B5B5B5] pt-1 pb-1 mb-3'>

                    <div className='mb-2 text-base font-bold'>
                        Nhập thông tin cần thiết để đăng ký tài khoản
                    </div>

                    <div className='flex mb-2'>

                        <div className='text-sm mr-7'>
                            <div>
                                Họ và tên lót *
                            </div>
                            <input
                                type="text"
                                name="lastAndMiddleName"
                                className="h-[25px] w-[250px] border border-black border-1 rounded-md p-2"
                                onChange={onChangeFmName}
                            />
                        </div>
                            
                        <div className='text-sm ml-7 mr-7'>

                            <div>
                                Tên *
                            </div>

                            <input
                                type="text"
                                name="name"
                                className="h-[25px] w-[250px] border border-black border-1 rounded-md p-2"
                                onChange={onChangeName}
                            />

                        </div>

                        <div className='text-sm ml-7'>
                            <div>
                                Tên đăng nhập *
                            </div>

                            <input
                                type="text"
                                name="lastAndMiddleName"
                                className="h-[25px] w-[250px] border border-black border-1 rounded-md p-2"
                                onChange={onChangeUsername}
                            />

                        </div>

                    </div>

                    <div className='flex mb-2'>

                        <div className='text-sm mr-7'>

                            <div>
                                Mã số sinh viên *
                            </div>

                            <input
                                type="text"
                                name="studentId"
                                className="h-[25px] w-[250px] border border-black border-1 rounded-md p-2"
                                onChange={onChangeStudentId}
                            />
                        </div>
                            
                        <div className='text-sm ml-7 mr-7'>

                            <div>
                                Giới tính *
                            </div>

                            <div className="">
                                <select
                                    className="bg-white h-[25px] w-[250px] border border-black border-1 rounded-md focus:ring-blue-500 px-2"
                                    onChange={onChangeGender}
                                    defaultValue={GenderType.MALE}
                                >
                                    <option value={GenderType.MALE}>{GenderType.MALE}</option>
                                    <option value={GenderType.FEMALE}>{GenderType.FEMALE}</option>
                                </select>
                            </div>

                        </div>

                        <div className='text-sm ml-7'>
                            <div>
                                Mật khẩu *
                            </div>
                            <div className='grid justify-items-end items-center'>

                                <input
                                    type={showPassword? "text":"password"}
                                    name="name"
                                    className="h-[25px] w-[250px] border border-black border-1 rounded-md p-2"
                                    onChange={onChangePassword}
                                />

                                <div className='absolute mr-2'>
                                    <button onClick={toggleShowPassword}>
                                        {showPassword ? 
                                        (<img src={EyeOpen} alt="eyeIcon" className='h-4 w-5'/>) : 
                                        (<img src={EyeClose} alt="eyeIcon" className='h-4 w-5'/>)}
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='flex mb-2'>

                        <div className='text-sm mr-7'>
                            <div className='flex items-center'>
                                Email *
                                {!validEmail && 
                                <div className='ml-2 text-red-500 text-xs font-medium'>
                                    Emai không đúng định dạng
                                </div>}

                            </div>

                            <input
                                type="text"
                                name="lastAndMiddleName"
                                className={!validEmail ? "h-[25px] w-[250px] border border-red-500 focus:outline-0 border-1 rounded-md p-2" :"h-[25px] w-[250px] border border-black border-1 rounded-md p-2"}
                                onChange={onChangeEmail}
                            />

                        </div>
                            
                        <div className='text-sm ml-7'>

                            <div>
                                Ngày sinh *
                            </div>

                            <div className='grid justify-items-end items-center'>
                                <DatePicker
                                    onChange={date => {
                                        if(date){
                                            setBirthDate(date);
                                        }
                                    }}
                                    selected={birthDate}
                                    dateFormat="dd/MM/yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    locale="vi"
                                    className="h-[25px] w-[250px] border border-black border-1 rounded-md px-2"
                                    />
                                    <div className='absolute mr-2'>
                                        <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                                    </div>
                            </div>

                        </div>
                    </div>

                    <div className='flex mb-3'>

                        <div className='text-sm mr-7'>

                            <div className='flex items-center'>
                                SĐT *
                                {!validPhoneNumber && 
                                <div className='ml-2 text-red-500 text-xs font-medium'>
                                    SĐT không đúng định dạng
                                </div>}

                            </div>

                            <input
                                type="text"
                                name="lastAndMiddleName"
                                className={!validPhoneNumber ? "h-[25px] w-[250px] border border-red-500 focus:outline-0 border-1 rounded-md p-2" :"h-[25px] w-[250px] border border-black border-1 rounded-md p-2"}
                                onChange={onChangePhoneNumber}
                            />

                        </div>
                            
                        <div className='text-sm ml-7'>

                            <div>
                                Chương trình đào tạo *
                            </div>

                            <div className="">
                                <select
                                    className="bg-white h-[25px] w-[250px] border border-black border-1 rounded-md focus:ring-blue-500 px-2"
                                    onChange={onChangeEducationType}
                                    defaultValue={EducationType.CQ}
                                >
                                    <option value={EducationType.CQ}>{capitalizeFirstLetter(EducationType.CQ)}</option>
                                    <option value={EducationType.CLC}>{capitalizeFirstLetter(EducationType.CLC)}</option>
                                    <option value={EducationType.KSTN}>{capitalizeFirstLetter(EducationType.KSTN)}</option>
                                </select>
                            </div>

                        </div>

                    </div>
                </div>

                <div className='flex justify-center items-center'>
                    <button className='bg-[#0079CC] px-7 py-3 hover:bg-[#025790]'
                        onClick={handleRegister}
                        disabled={loading? true: false}
                    >
                        {loading?
                        (<div className='text-white font-semibold'>
                            Processing...
                        </div>):
                        (<div className='text-white font-semibold'>
                            ĐĂNG KÝ
                        </div>)}
                        
                    </button>
                </div>

            </div>
        </div>
    )
}

export default RegisterPanel;