import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import Calendar from "../../assets/images/calendar.png";
import { GenderType } from '../../shared/types/gender';
import { EducationType } from '../../shared/types/educationType';
import { RoleType } from '../../shared/types/role';
import { StudentAccountStatusEnum } from '../../shared/types/studentAccountStatus';
import { AppDispatch } from '../../store';
import { useDispatch} from "react-redux";
import Swal from 'sweetalert2';

import {updatePersonalInfoAction} from '../../actions/studentAction';

interface Props {
    onViewMode: (e: Boolean) => void;
    onEditMode: (e: Boolean) => void;
}


const PersonalPanel:React.FC<Props> = (props: Props) => {

    let userInfo:any;

    const currentUser = localStorage.getItem('user');
    if(currentUser !== null){
        const beforeUserInfo = JSON.parse(currentUser)
        userInfo = {...beforeUserInfo, birthDate: new Date(Date.parse(beforeUserInfo.birthDate))}
    }
    else{
        userInfo = {}
    }

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
    
    
    const [editMode, setEditMode] = React.useState(false);
    const [user, setUser] = React.useState(userInfo);
    const [newInfo, setNewInfo] = React.useState(user);
    const [birthDate, setBirthDate] = useState(userInfo.birthDate);
    const [imageFile, setImageFile] = useState();

    const useAppDispatch: () => AppDispatch = useDispatch

    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(false);

    const [img, setImg] = useState(user.image);

    const capitalizeFirstLetter = (str: EducationType | string) => {
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        return str2;
    }

    const updateInfo = (e:any) => {
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
            if(result.isConfirmed){
                
                if(userInfo.role === RoleType.Student){
                    const newInfoData = {
                        fmName: newInfo.fmName,
                        name: newInfo.name,
                        studentId: newInfo.studentId,
                        gender: newInfo.gender,
                        birthDate: newInfo.birthDate,
                        educationType: newInfo.educationType,
                        email: newInfo.email,
                        phoneNumber: newInfo.phoneNumber,
                        image: newInfo.image
                    }
                    dispatch(updatePersonalInfoAction(newInfoData))
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
                              })

                              window.location.reload();
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
                                        title: 'Người dùng không tồn tại'
                                      })
                                }
            
                                if(error.response.status === 403){
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
                else if(userInfo.role === RoleType.FVD){
    
                }
                else if(userInfo.role === RoleType.FS){
    
                }
                else{
                    console.log("SOMETHING WRONG!!!!")
                }
            }

            if(result.isDenied){
                setLoading(false);
            }

          })        
    }

    const cancelUpdate = () => {
        setEditMode(!editMode)
        setImg(user.image);
    }

    const file2Base64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result?.toString() || '');
          reader.onerror = (error) => reject(error);
        });
      };

    const onChangeImage = (e:any) => {
        setImageFile(e.target.files[0]);
        if(e.target.files[0]){
            const fileReader = new FileReader();
                    fileReader.readAsDataURL(e.target.files[0]);
    
                    fileReader.onload = () => {
                        if(typeof(fileReader.result) === "string"){
                            setImg(fileReader.result)
                            setNewInfo({...newInfo, image: fileReader.result})
                        }
                        else{
                            setImg("");
                            setNewInfo({...newInfo, image: ""})
                        }
                    };
                    fileReader.onerror = (error) => {
                        console.log(error);
                    }   
        }
    }

    const formatDate = (inputDate: Date) => {
        const date = inputDate.getDate();
        const month = inputDate.getMonth() + 1; // take care of the month's number here ⚠️
        const year = inputDate.getFullYear();

        return `${date}/${month}/${year}`;
    }

    return(
        <div className='p-5 grid grid-cols-5'>
            <div className = 'col-span-2 flex-row items-center px-5'>
                {!editMode && 
                <div>
                    <img className="h-[300px] w-[300px] rounded-[150px] border border-black" src={user.image} alt="Ava" />
                </div>}
                {editMode && (
                <div>

                    <div>
                        <img className="h-[300px] w-[300px] rounded-[150px] border border-black" src={img} alt="Ava" />
                    </div>
                    <div className='mt-10'>
                        <div className='flex-row items-center justify-center custom-file'>
                            <input type='file' className='custom-file-input' id='customFile' onChange={
                                (e) => {onChangeImage(e)}}/>
                        </div>
                    </div>
                </div>
                )}
            </div>
            <div className= 'col-span-2'>
            <div className='flex items-center mb-5 '>
            
                        <div className='mr-5 font-bold w-[170px]'>
                                Vai trò:
                        </div>
                        {!editMode && 
                        <div className="ml-6">
                            {user.role === RoleType.Student ? "Sinh viên" : 
                            (user.role === RoleType.FVD ? "Phó chủ nhiệm Khoa" : "Thư ký Khoa")}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                {user.role === RoleType.Student ? "Sinh viên" : 
                                (user.role === RoleType.FVD ? "Phó chủ nhiệm Khoa" : "Thư ký Khoa")}
                        </div>
                        }
            </div>
            

            <div className='flex items-center mb-5'>
                    <div className='mr-5 font-bold w-[170px]'>
                        Tên: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {user.name}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={user.name} onChange={
                                    (e) => {setNewInfo({...newInfo, name: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                        }
            </div>

            {userInfo.role === RoleType.Student ?
            (userInfo.accountStatus === StudentAccountStatusEnum.waiting ? (
            <div className='flex items-center mb-5'>
                    <div className='mr-5 font-bold w-[170px]'>
                        MSSV: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {user.studentId}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={user.studentId} onChange={
                                    (e) => {setNewInfo({...newInfo, studentId: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                    }
            </div>) : (<div className='flex items-center mb-5'>
                    <div className='mr-5 font-bold w-[170px]'>
                        MSSV: 
                    </div>
                    <div className="ml-6">
                        {user.studentId}
                    </div>
            </div>)) :
            (
                <div className='flex items-center mb-5'>
                    <div className='mr-5 font-bold w-[170px]'>
                        MSCB: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {user.staffId}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={user.staffId} onChange={
                                    (e) => {setNewInfo({...newInfo, staffId: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                    }
            </div>
            )
            }

            <div className='flex items-center mb-5'>
                    <div className='mr-5 font-bold w-[170px]'>
                        Giới tính: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {user.gender}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <select
                                        className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-md focus:ring-blue-500 px-2"
                                        onChange={(e) => {
                                            setNewInfo({...newInfo, gender: e.target.value})
                                        }}
                                        defaultValue={user.gender}
                                    >
                                        <option value={GenderType.MALE}>{GenderType.MALE}</option>
                                        <option value={GenderType.FEMALE}>{GenderType.FEMALE}</option>
                                    </select>
                        </div>
                        }
            </div>

            <div className='flex items-center mb-5'>
                    <div className='mr-5 font-bold w-[170px]'>
                        Ngày tháng năm sinh: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {formatDate(user.birthDate)}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6 grid justify-items-end items-center">
                                <DatePicker
                                    onChange={date => {
                                        if(date){
                                            setBirthDate(date);
                                            setNewInfo({...newInfo, birthDate: date});
                                        }
                                    }}
                                    selected={birthDate}
                                    dateFormat="dd/MM/yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    locale="vi"
                                    className="h-[40px] w-[270px] border border-black border-1 rounded-md px-2"
                                    />
                                    <div className='absolute mr-2'>
                                        <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                                    </div>
                        </div>
                        }
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
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                  <select
                                        className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-md focus:ring-blue-500 px-2"
                                        onChange={(e) => {
                                            setNewInfo({...newInfo, educationType: e.target.value})
                                        }}
                                        defaultValue={user.educationType}
                                    >
                                        <option value={EducationType.CQ}>{capitalizeFirstLetter(EducationType.CQ)}</option>
                                        <option value={EducationType.CLC}>{capitalizeFirstLetter(EducationType.CLC)}</option>
                                        <option value={EducationType.CLCLV}>{capitalizeFirstLetter(EducationType.CLCLV)}</option>
                                        <option value={EducationType.KSTN}>{capitalizeFirstLetter(EducationType.KSTN)}</option>
                                    </select>
                        </div>
                        }
            </div>) : (<div className='flex items-center mb-5'>
                    <div className='mr-5 font-bold w-[170px]'>
                        Chương trình đào tạo: 
                    </div>
                 
                        <div className="ml-6">
                            {capitalizeFirstLetter(user.educationType)}
                        </div>
                        
            </div>))}

            <div className='flex items-center mb-5'>
                    <div className='mr-5 font-bold w-[170px]'>
                        Email: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {user.email}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={user.email} onChange={
                                    (e) => {setNewInfo({...newInfo, email: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                        }
            </div>

            <div className='flex items-center mb-5'>
                    <div className='mr-5 font-bold w-[170px]'>
                        Số điện thoại: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {user.phoneNumber}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={user.phoneNumber} onChange={
                                    (e) => {setNewInfo({...newInfo, phoneNumber: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                        }
            </div>
        </div>

        <div className='grid grid-rows-6 justify-items-end px-5 col-span-1'>
                {!editMode && 
                    <div onClick={() => {
                            setEditMode(!editMode)
                            setNewInfo(user)}
                        } className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                    Chỉnh sửa
                    </div>
                }
                {editMode &&
                    <button className="bg-[#0079CC] w-40 h-16 flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                    onClick={updateInfo}
                    disabled={loading? true: false}
                >
                    {loading?
                (<div>
                    Processing...
                    
                </div>):
                (<div>
                    Lưu
                </div>)
}
                
                </button>
                }
                <div hidden={!editMode}>
                    <div onClick={() => {cancelUpdate()}} className="w-40 h-16 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#B20610] hover:cursor-pointer">
                    Hủy
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalPanel;