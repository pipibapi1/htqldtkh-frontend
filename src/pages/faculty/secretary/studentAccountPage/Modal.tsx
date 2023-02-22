import {useState} from 'react';
import Calendar from "../../../../assets/images/calendar.png";
import DatePicker from "react-datepicker";
import { GenderType } from '../../../../shared/types/gender';
import { EducationType } from '../../../../shared/types/educationType';
import { StudentAccountStatusEnum } from '../../../../shared/types/studentAccountStatus';
import { updateStudentPersonalInfoAction } from '../../../../actions/studentAction';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';
import Swal from 'sweetalert2';


const Modal = ({isVisible, onClose, student}: {isVisible: boolean, onClose: any, student: any}) => {
    const [birthDate, setBirthDate] = useState(new Date(student.birthDate));
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()
    if (!isVisible) return null;


    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }
    const handleApprove = (e:any) => {
        e.preventDefault();
        const info = {
            _id: student._id,
            accountStatus: StudentAccountStatusEnum.approved
        }

        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc muốn duyệt tài khoản sinh viên này?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
      
            if(result.isConfirmed){
              dispatch(updateStudentPersonalInfoAction(info))
              .then((data) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Duyệt thành công',
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    window.location.reload();
                  } 
                })
                }
              )
              .catch((error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Có lỗi gì đó đã xảy ra, thử lại sau!',
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                })
              })
            }
      
            if(result.isDenied){
            }
        })
    }

    return (
        <div className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center z-50" id= "wrapper" onClick={handleClose}>
            <div className = "md:w-[600px] w-[90%] mx-auto">
                <div className = 'bg-white rounded p-2'>
                    <div className = "py-3 px-3 lg:px-8 text-left">
                        <div className = 'mb-2 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                            Thông tin chi tiết tài khoản
                        </div>
                        <form className = "space-y-3" action = "#">
                            <div className = 'flex flex-row'>
                                <div className = 'mr-6 w-[230px]'>
                                    <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                        Họ và tên
                                    </label>
                                    <input type = 'text' name = 'text' id ='email'
                                    className = "bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={student.name}
                                    required
                                    disabled
                                    />
                                </div>

                                <div className = 'ml-6 w-[230px] '>
                                    <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                        MSSV
                                    </label>
                                    <input type = 'email' name = 'email' id ='email'
                                    className = "bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={student.studentId}
                                    required
                                    disabled
                                    />
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                            <div className = 'mr-6 w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Giới tính
                                </label>
                                <select
                                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {}}
                                value={student.gender}
                                disabled
                                >
                                    <option value={GenderType.MALE}>Nam</option>
                                    <option value={GenderType.FEMALE}>Nữ</option>
                                </select>
                                </div>

                                <div className = 'ml-6 w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Ngày sinh
                                </label>
                                <div className = "grid justify-items-end items-center">
                                    <DatePicker
                                    disabled
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
                                    className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                    <div className='absolute mr-2'>
                                        <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                                    </div>
                                </div>
                                </div>

                                
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mr-6 w-[230px]'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={student.email}
                                required
                                disabled
                                />
                                </div>

                                <div className = 'ml-6 w-[230px]'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Số điện thoại
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={student.phoneNumber}
                                required
                                disabled
                                />
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                

                                <div className = 'mr-6 w-[230px] '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Chương trình đào tạo
                                </label>
                                <select
                                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {}}
                                value={student.educationType}
                                disabled
                                >
                                    <option value={EducationType.CQ}>Chính quy</option>
                                    <option value={EducationType.KSTN}>Kỹ sư tài năng</option>
                                    <option value={EducationType.CLC}>Chất lượng cao</option>
                                </select>
                                </div>

                                <div className = 'ml-6 w-[230px]'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Tên tài khoản
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={student.username}
                                required
                                disabled
                                />
                                </div>
                            </div>

                           
                            <div className = 'flex flex-row '>
                            <button
                                className = 'w-full mr-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
                                onClick={handleApprove}
                            >
                                Duyệt
                            </button>

                            <button
                                className = 'w-full ml-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300'
                                onClick={handleClose}
                                id = "wrapper"
                            >
                                Hủy
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal