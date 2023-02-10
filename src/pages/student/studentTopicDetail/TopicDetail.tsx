import React, {useState} from 'react';
import BackIcon from '../../../assets/images/🦆 icon _arrow circle left_.png';
import { useDispatch, useSelector} from "react-redux";
import { RootState,AppDispatch } from '../../../store';
import DatePicker from "react-datepicker";
import { TopicTypeEnum } from '../../../shared/types/topicType';
import {Link} from "react-router-dom";
import Calendar from "../../../assets/images/calendar.png";
import { GenderType } from '../../../shared/types/gender';


interface Topic{
    _id: string;
    name: string;
    topicGivenId: string;
    type: string;
    startTime: string;
    endTime: string;
    creationDate: string;
    period: string;
    status: string;
    isExtended: boolean,
    extensionTime: number
}

interface Instructor{
    _id: string,
    name: string,
    staffId: string,
    gender: string,
    email: string,
    phoneNumber: string,
    birthDate: string,
    academyRank: string,
    degree: string,
}

interface OtherMember{
    _id: string,
    topicId: string,
    studentId: string,
    name: string,
    gender: string,
    email: string,
    phoneNumber: string,
    educationType: string,
    birthDate: string
}

const TopicDetail:React.FC = () => {
    const topicData: Topic = {
        _id: "1",
        name: "Hệ thống quản lý đề tài khoa học cấp sinh viên",
        topicGivenId: "",
        type: "Chính quy",
        startTime: "",
        endTime: "",
        creationDate: "",
        period: "1",
        status: "Tạo mới",
        isExtended: false,
        extensionTime: 0
    }
    const instructorData: Instructor[] = [{
        _id: "1",
        name: "Trương Thị Thái Minh",
        staffId: "1111111",
        gender: "Nữ",
        email: "thaiminh@hcmut.edu.vn",
        phoneNumber: "098765432",
        birthDate: "",
        academyRank: "",
        degree: "Thạc sỹ",
        },
        {
            _id: "1",
            name: "Trương Thị Thái Minh",
            staffId: "1111111",
            gender: "Nữ",
            email: "thaiminh@hcmut.edu.vn",
            phoneNumber: "098765432",
            birthDate: "",
            academyRank: "",
            degree: "Thạc sỹ",
        }]
    const otherMembersData: OtherMember[] = [{
        _id: '1',
        topicId: "",
        studentId: "1912276",
        name: "Phạm Minh Duy",
        gender: "Nam",
        email: "mduy@hcmut.edu.vn",
        phoneNumber: "096524231",
        educationType: "chính quy",
        birthDate: ""
    },
    {
        _id: '1',
        topicId: "",
        studentId: "1912276",
        name: "Phạm Minh Duy",
        gender: "Nam",
        email: "mduy@hcmut.edu.vn",
        phoneNumber: "096524231",
        educationType: "chính quy",
        birthDate: ""
    }]
    const [topic, setTopic] = useState<Topic>(topicData);
    const [instructors, setInstructors] = useState<Instructor[]>(instructorData);
    const [otherMembers, setOtherMembers] = useState<OtherMember[]>(otherMembersData);
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    const [birthDate, setBirthDate] = useState(new Date());

    const addNewInstructor = (e:any) => {
        e.preventDefault();

    }

    const removeInstructor = (e:any) => {
        e.preventDefault();
    }

    const addNewOtherMember = (e:any) => {
        e.preventDefault();
    }

    const removeOtherMember = (e:any) => {
        e.preventDefault();
    }

    return (
    <div className='p-3'>
  
            <Link to={'/myTopic'} className='hover:cursor-pointer w-fit'>
                <img src={BackIcon} className='h-5' alt="" />
            </Link>
            <div className='flex justify-end'>
                    <button
                        className = 'w-[10%] h-[50px] mr-2 text-white font-bold text-sm px-5 py-2.5 text-center rounded-lg bg-[#1488D8] focus:ring-4 focus:outline-none focus:ring-blue-300'
                        >
                        CẬP NHẬT
                    </button>
            </div>


        <form className = "space-y-5 mt-1">
            <div className = "space-y-3">
                <div className = 'flex items-center px-5'>
                    <label htmlFor='text' className = "w-[160px] text-md font-semibold mr-1">
                        Tên đề tài: 
                    </label>
                    <input type = 'text' name = 'name' id ='name'
                        className = "w-1/2 border border-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        defaultValue={topic.name}
                    />
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-md font-semibold w-[160px] mr-1">
                            Mã đề tài: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-md">
                            {topic.topicGivenId === "" ? "Chưa được cấp" : topic.topicGivenId}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-md font-semibold w-[160px] mr-1">
                            Loại đề tài: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-md">
                            {topic.type}
                        </div>
                    </div>
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-md font-semibold w-[160px] mr-1">
                            Ngày tạo: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-md">
                            {topic.creationDate}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-md font-semibold w-[160px] mr-1">
                            Thời gian thực hiện: 
                        </label>

                        <div className = "w-1/4 text-gray-900 text-md">
                            {topic.startTime} - {topic.endTime}
                        </div>
                    </div>
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-md font-semibold w-[160px] mr-1">
                            Đợt: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-md">
                            {topic.period}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-md font-semibold w-[160px] mr-1">
                            Trạng thái: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-md">
                            {topic.status}
                        </div>
                    </div>
                </div>

                <div className = 'flex items-center px-5'>
                    <label htmlFor='text' className = "text-md font-semibold w-[160px] mr-1">
                        Gia hạn: 
                    </label>
                    <div className = "w-1/4 text-gray-900 text-md">
                        {topic.isExtended? `Thời gian gia hạn: ${topic.extensionTime} tháng` : "Không"}
                    </div>
                </div>
            </div>

            <div className= "px-5">
                <div className='text-md font-semibold'>
                    Thông tin chủ nhiệm đề tài:
                </div>

                <div className='px-5 mt-3 space-y-2'>
                    <div className = 'flex flex-row'>
                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                Họ và tên: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {currentUser.name}
                            </div>
                        </div>

                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                Loại chương trình đào tạo: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {currentUser.educationType}
                            </div>
                        </div>
                    </div>

                    <div className = 'flex flex-row'>
                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                MSSV: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {currentUser.studentId}
                            </div>
                        </div>

                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                Giới tính: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {currentUser.gender}
                            </div>
                        </div>
                    </div>

                    <div className = 'flex flex-row'>
                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                Email: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {currentUser.email}
                            </div>
                        </div>

                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                Số điện thoại: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {currentUser.phoneNumber}
                            </div>
                        </div>
                    </div>

                    <div className = 'flex items-center'>
                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                            Ngày sinh: 
                        </label>
                        <div className = "w-1/2 text-gray-900 text-md">
                            {currentUser.birthDate}
                        </div>
                    </div>
                </div>
            </div>

            <div className= "px-5">
                <div className='text-md font-semibold'>
                    Thông tin các giáo viên hướng dẫn:
                </div>

                {instructors.map((instructor, index) => {
                    return(
                        <div className='mt-3'>
                            <div className='text-md px-1 flex items-center'>
                                <div className='text-md font-semibold mr-3'>
                                    Giáo viên {index + 1}:
                                </div>
                                
                            </div>
                            <div className='px-5 mt-2 space-y-2'>
                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            Họ và tên: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {instructor.name}
                                        </div>
                                    </div>

                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                            MSCB: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {instructor.staffId}
                                        </div>
                                    </div>
                                </div>

                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            Giới tính: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {instructor.gender}
                                        </div>
                                    </div>

                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                            Ngày sinh: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {instructor.birthDate}
                                        </div>
                                    </div>
                                </div>

                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            Học hàm: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {instructor.academyRank}
                                        </div>
                                    </div>

                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                            Học vị: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {instructor.degree}
                                        </div>
                                    </div>
                                </div>

                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            Email: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {instructor.email}
                                        </div>
                                    </div>

                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                            Số điện thoại: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {instructor.phoneNumber}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>

            <div className= "px-5">
                <div className='text-md font-semibold'>
                    Thông tin các thành viên khác:
                </div>

                {otherMembers.map((otherMember, index) => {
                    return(
                        <div className='mt-3'>
                            <div className='text-md px-1 flex items-center'>
                                <div className='text-md font-semibold mr-3'>
                                    Thành viên {index+1}:
                                </div>
                            </div>
                            <div className='px-5 mt-2 space-y-2'>
                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            Họ và tên: 
                                        </label>
                                        <input type = 'text' name = 'name' id ='name'
                                            className = "w-1/2 border border-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                            defaultValue={otherMember.name}
                                        />
                                    </div>

                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                            Loại chương trình đào tạo: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {otherMember.educationType}
                                        </div>
                                    </div>
                                </div>

                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            MSSV: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {otherMember.studentId}
                                        </div>
                                    </div>

                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                            Giới tính: 
                                        </label>
                                        <select
                                        className="bg-white h-[45px] w-1/2 border border-black border-1 rounded-md focus:ring-blue-500 px-2"
                                        defaultValue={otherMember.gender}
                                        >
                                            <option value={GenderType.MALE}>{GenderType.MALE}</option>
                                            <option value={GenderType.FEMALE}>{GenderType.FEMALE}</option>
                                    </select>
                                    </div>
                                </div>

                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            Email: 
                                        </label>
                                        <input type = 'text' name = 'name' id ='name'
                                            className = "w-1/2 border border-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                            defaultValue={otherMember.email}
                                        />
                                    </div>

                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                            Số điện thoại: 
                                        </label>
                                        <input type = 'text' name = 'name' id ='name'
                                            className = "w-1/2 border border-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                            defaultValue={otherMember.phoneNumber}
                                        />
                                    </div>
                                </div>


                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            Ngày sinh: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
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
                                                className="h-[45px] w-full border border-black border-1 rounded-md px-2"
                                                />
                                                <div className='absolute mr-2'>
                                                    <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    )
                })}
            </div>
        </form>
    </div>)
}

export default TopicDetail;