import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';

import { AppDispatch } from '../../store';

import { GenderType } from '../../shared/types/gender';
import { EducationType } from '../../shared/types/educationType';
import { RoleType } from '../../shared/types/role';
import { StudentAccountStatusEnum } from '../../shared/types/studentAccountStatus';
import { Toast } from '../../shared/toastNotify/Toast';
import { capitalizeFirstLetter, formatDate } from '../../shared/functions';

import { updateStudentPersonalInfoAction } from '../../actions/studentAction';
import { updateFvdPersonalInfoAction } from '../../actions/fvdAction';
import { updateFsPersonalInfoAction } from '../../actions/fsAction';

import Calendar from "../../assets/images/calendar.png";

const PersonalPanel: React.FC = () => {

    let userInfo: any;
    const currentUser = localStorage.getItem('user');
    if (currentUser !== null) {
        const beforeUserInfo = JSON.parse(currentUser)
        userInfo = { ...beforeUserInfo, birthDate: new Date(Date.parse(beforeUserInfo.birthDate)) }
    }
    else {
        userInfo = {}
    }

    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState(userInfo);
    const [newInfo, setNewInfo] = useState(user);
    const [birthDate, setBirthDate] = useState(userInfo.birthDate);
    const [imageFile, setImageFile] = useState();
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState(user.image);

    const updateInfo = (e: any) => {
        setLoading(true);
        e.preventDefault();

        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn cập nhật thông tin?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                if (userInfo.role === RoleType.Student) {
                    const newInfoData = {
                        _id: newInfo._id,
                        name: newInfo.name,
                        studentId: newInfo.studentId,
                        gender: newInfo.gender,
                        birthDate: newInfo.birthDate,
                        educationType: newInfo.educationType,
                        email: newInfo.email,
                        phoneNumber: newInfo.phoneNumber,
                        image: newInfo.image
                    }
                    dispatch(updateStudentPersonalInfoAction(newInfoData))
                        .then((user) => {
                            setLoading(false);
                            setUser(newInfo);
                            setEditMode(!editMode);
                            localStorage.setItem("user", JSON.stringify(newInfo));

                            Swal.fire({
                                icon: 'success',
                                title: 'Cập nhật thông tin thành công!',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                            }).then((result) => {
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
                                if (error.response.status === 400) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Bad request'
                                    })
                                }

                                if (error.response.status === 404) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Người dùng không tồn tại'
                                    })
                                }

                                if (error.response.status === 403) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Không có quyền'
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
                else if (userInfo.role === RoleType.FVD) {

                    const newInfoData = {
                        _id: newInfo._id,
                        name: newInfo.name,
                        gender: newInfo.gender,
                        birthDate: newInfo.birthDate,
                        email: newInfo.email,
                        phoneNumber: newInfo.phoneNumber,
                        image: newInfo.image
                    }
                    dispatch(updateFvdPersonalInfoAction(newInfoData))
                        .then((user) => {
                            setLoading(false);
                            setUser(newInfo);
                            setEditMode(!editMode);
                            localStorage.setItem("user", JSON.stringify(newInfo));

                            Swal.fire({
                                icon: 'success',
                                title: 'Cập nhật thông tin thành công!',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                            }).then((result) => {
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
                                if (error.response.status === 400) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Bad request'
                                    })
                                }

                                if (error.response.status === 404) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Người dùng không tồn tại'
                                    })
                                }

                                if (error.response.status === 403) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Không có quyền'
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
                else if (userInfo.role === RoleType.FS) {

                    const newInfoData = {
                        _id: newInfo._id,
                        name: newInfo.name,
                        gender: newInfo.gender,
                        birthDate: newInfo.birthDate,
                        email: newInfo.email,
                        phoneNumber: newInfo.phoneNumber,
                        image: newInfo.image
                    }
                    dispatch(updateFsPersonalInfoAction(newInfoData))
                        .then((user) => {
                            setLoading(false);
                            setUser(newInfo);
                            setEditMode(!editMode);
                            localStorage.setItem("user", JSON.stringify(newInfo));

                            Swal.fire({
                                icon: 'success',
                                title: 'Cập nhật thông tin thành công!',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                            }).then((result) => {
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
                                if (error.response.status === 400) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Bad request'
                                    })
                                }

                                if (error.response.status === 404) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Người dùng không tồn tại'
                                    })
                                }

                                if (error.response.status === 403) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Không có quyền'
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
                else {
                    console.log("SOMETHING WRONG WITH THE CURRENT INFORMATION!!!!")
                }
            }
            if (result.isDenied) {
                setLoading(false);
            }
        })
    }

    const cancelUpdate = () => {
        setEditMode(!editMode)
        setImg(user.image);
    }

    const onChangeImage = (e: any) => {
        setImageFile(e.target.files[0]);
        if (e.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);

            fileReader.onload = () => {
                if (typeof (fileReader.result) === "string") {
                    setImg(fileReader.result)
                    setNewInfo({ ...newInfo, image: fileReader.result })
                }
                else {
                    setImg("");
                    setNewInfo({ ...newInfo, image: "" })
                }
            };
            fileReader.onerror = (error) => {
                console.log(error);
            }
        }
    }

    return (
        <div className='p-5 grid grid-cols-5'>

            <div className='col-span-2 flex-row items-center px-5'>
                {!editMode &&
                    <div>
                        <img className="h-[300px] w-[300px] rounded-[150px] border border-black" src={user.image} alt="Ava" />
                    </div>}

                {editMode && (
                    <div>
                        <img className="h-[300px] w-[300px] rounded-[150px] border border-black" src={img} alt="Ava" />
                        <div className='mt-10'>
                            <div className='flex-row items-center justify-center custom-file'>
                                <input type='file' className='custom-file-input' id='customFile' onChange={
                                    (e) => { onChangeImage(e) }} />
                            </div>
                        </div>
                    </div>)}

            </div>

            <div className='col-span-2'>

                <div className='flex items-center mb-5 '>

                    <div className='mr-5 font-bold w-[170px]'>
                        Vai trò:
                    </div>

                    {!editMode &&
                        <div className="ml-6">
                            {user.role === RoleType.Student ? "Sinh viên" :
                                (user.role === RoleType.FVD ? "Cán bộ quản lý" : "Giáo vụ")}
                        </div>}

                    {editMode &&
                        <div className="ml-6">
                            {user.role === RoleType.Student ? "Sinh viên" :
                                (user.role === RoleType.FVD ? "Cán bộ quản lý" : "Giáo vụ")}
                        </div>}

                </div>

                <div className='flex items-center mb-5'>

                    <div className='mr-5 font-bold w-[170px]'>
                        Tên:
                    </div>

                    {!editMode &&
                        <div className="ml-6">
                            {user.name}
                        </div>}

                    {editMode &&
                        <div className="ml-6">
                            <input type="text" defaultValue={user.name}
                                data-testid="input-name"
                                onChange={
                                    (e) => { setNewInfo({ ...newInfo, name: e.target.value }) }
                                }
                                className='bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'
                            />
                        </div>}

                </div>

                {userInfo.role === RoleType.Student ?
                    (userInfo.accountStatus === StudentAccountStatusEnum.waiting ?
                        (<div className='flex items-center mb-5'>

                            <div className='mr-5 font-bold w-[170px]'>
                                MSSV:
                            </div>

                            {!editMode &&
                                <div className="ml-6">
                                    {user.studentId}
                                </div>}

                            {editMode &&
                                <div className="ml-6">
                                    <input type="text" data-testid="input-studentId"
                                        defaultValue={user.studentId} onChange={
                                            (e) => { setNewInfo({ ...newInfo, studentId: e.target.value }) }
                                        }
                                        className='bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'
                                    />
                                </div>}

                        </div>) :
                        (<div className='flex items-center mb-5'>

                            <div className='mr-5 font-bold w-[170px]'>
                                MSSV:
                            </div>

                            <div className="ml-6">
                                {user.studentId}
                            </div>

                        </div>)) :
                    (<div className='flex items-center mb-5'>

                        <div className='mr-5 font-bold w-[170px]'>
                            MSCB:
                        </div>

                        <div className="ml-6">
                            {user.staffId}
                        </div>

                    </div>)}

                <div className='flex items-center mb-5'>

                    <div className='mr-5 font-bold w-[170px]'>
                        Giới tính:
                    </div>

                    {!editMode &&
                        <div className="ml-6">
                            {user.gender}
                        </div>}

                    {editMode &&
                        <div className="ml-6">
                            <select
                                data-testid="select-gender"
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-md focus:ring-blue-500 px-2"
                                onChange={(e) => {
                                    setNewInfo({ ...newInfo, gender: e.target.value })
                                }}
                                defaultValue={user.gender}
                            >
                                {Object.values(GenderType).map((value) => {
                                    return <option value={value} key={value}>{value}</option>
                                })}
                            </select>
                        </div>}

                </div>

                <div className='flex items-center mb-5'>

                    <div className='mr-5 font-bold w-[170px]'>
                        Ngày tháng năm sinh:
                    </div>

                    {!editMode &&
                        <div className="ml-6">
                            {formatDate(user.birthDate)}
                        </div>}

                    {editMode &&
                        <div className="ml-6 grid justify-items-end items-center" data-testid="datepicker-birthDate">
                            <DatePicker
                                onChange={date => {
                                    if (date) {
                                        setBirthDate(date);
                                        setNewInfo({ ...newInfo, birthDate: date });
                                    }
                                }}
                                selected={birthDate}
                                dateFormat="dd/MM/yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                locale={vi}
                                className="h-[40px] w-[270px] border border-black border-1 rounded-md px-2"
                            />
                            <div className='absolute mr-2'>
                                <img src={Calendar} alt="calendarIcon" className='h-5 w-5' />
                            </div>
                        </div>}

                </div>

                {userInfo.role === RoleType.Student &&
                    (userInfo.accountStatus === StudentAccountStatusEnum.waiting ?

                        (<div className='flex items-center mb-5'>

                            <div className='mr-5 font-bold w-[170px]'>
                                Chương trình đào tạo:
                            </div>

                            {!editMode &&
                                <div className="ml-6">
                                    {capitalizeFirstLetter(user.educationType)}
                                </div>}

                            {editMode &&
                                <div className="ml-6">
                                    <select
                                        className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-md focus:ring-blue-500 px-2"
                                        onChange={(e) => {
                                            setNewInfo({ ...newInfo, educationType: e.target.value })
                                        }}
                                        defaultValue={user.educationType}
                                    >
                                        {Object.values(EducationType).map((value) => {
                                            return <option value={value} key={value}>{value}</option>
                                        })}
                                    </select>
                                </div>}

                        </div>) :

                        (<div className='flex items-center mb-5'>

                            <div className='mr-5 font-bold w-[170px]'>
                                Chương trình đào tạo:
                            </div>

                            <div className="ml-6">
                                {capitalizeFirstLetter(user.educationType)}
                            </div>

                        </div>)
                    )}

                <div className='flex items-center mb-5'>

                    <div className='mr-5 font-bold w-[170px]'>
                        Email:
                    </div>

                    {!editMode &&
                        <div className="ml-6">
                            {user.email}
                        </div>}

                    {editMode &&
                        <div className="ml-6">
                            <input type="text" defaultValue={user.email}
                                onChange={(e) => {
                                    setNewInfo({ ...newInfo, email: e.target.value })
                                }
                                }
                                className='bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'
                            />
                        </div>}

                </div>

                <div className='flex items-center mb-5'>

                    <div className='mr-5 font-bold w-[170px]'>
                        Số điện thoại:
                    </div>

                    {!editMode &&
                        <div className="ml-6">
                            {user.phoneNumber}
                        </div>}

                    {editMode &&
                        <div className="ml-6">
                            <input type="text" defaultValue={user.phoneNumber}
                                onChange={(e) => {
                                    setNewInfo({ ...newInfo, phoneNumber: e.target.value })
                                }
                                }
                                className='bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'
                            />
                        </div>}
                </div>

            </div>

            <div className='grid grid-rows-6 justify-items-end px-5 col-span-1'>

                {userInfo.accountStatus === StudentAccountStatusEnum.approved &&
                    <div className="w-40 bg-[#A3A3A3] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px]">
                        Chỉnh sửa
                    </div>}

                {((userInfo.role === RoleType.Student && userInfo.accountStatus === StudentAccountStatusEnum.waiting) ||
                    userInfo.role === RoleType.FS || userInfo.role === RoleType.FVD
                )
                    && !editMode &&
                    <div onClick={() => {
                        setEditMode(!editMode)
                        setNewInfo(user)
                    }
                    }
                        className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                        data-testid='edit-button'
                    >
                        Chỉnh sửa
                    </div>}

                {((userInfo.role === RoleType.Student && userInfo.accountStatus === StudentAccountStatusEnum.waiting) ||
                    userInfo.role === RoleType.FS || userInfo.role === RoleType.FVD
                )
                    && editMode &&
                    <button className="bg-[#0079CC] w-40 h-16 flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                        onClick={updateInfo}
                        disabled={loading ? true : false}
                    >
                        {loading ? (<div> Processing... </div>) : (<div> Lưu </div>)}
                    </button>}

                <div hidden={!editMode}>
                    <div onClick={() => { cancelUpdate() }} className="w-40 h-16 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#B20610] hover:cursor-pointer">
                        Hủy
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PersonalPanel;