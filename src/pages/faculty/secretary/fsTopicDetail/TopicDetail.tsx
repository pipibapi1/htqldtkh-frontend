import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from '../../../../store';

import { MyTopic } from '../../../../shared/interfaces/topicInterface';
import { displayDate, displayPeriod } from '../../../../shared/functions';

import { getTopicDetailAction } from '../../../../actions/topicAction';

import BackIcon from '../../../../assets/images/🦆 icon _arrow circle left_.png';

const TopicDetail:React.FC = () => {
    let { _id} = useParams();
    const topicData: MyTopic = {
        _id: "1",
        name: "1",
        topicGivenId: "",
        type: "1",
        startTime: "",
        endTime: "",
        creationDate: "",
        period: "1",
        status: "1",
        isExtended: false,
        extensionTime: 0,
        periodValue: "",
        studentId: "",
        productId: "",
        expense: 1,
        student:{
            _id: "", 
            name: "",
            studentId: "",
            educationType: "",
            gender: "",
            email: "",
            phoneNumber: "",
            birthDate: ""
        },
        instructors:[{
            _id: "1",
            name: "1",
            staffId: "1",
            gender: "1",
            email: "1",
            phoneNumber: "1",
            birthDate: "",
            academyRank: "",
            degree: "1",
            },
            {
                _id: "1",
                name: "1",
                staffId: "1",
                gender: "1",
                email: "1",
                phoneNumber: "1",
                birthDate: "",
                academyRank: "",
                degree: "1",
            }],

        instructorsId:["1", "2"],
        otherMembers: [{
            studentId: "1",
            name: "1",
            gender: "1",
            email: "1",
            phoneNumber: "1",
            educationType: "1",
            birthDate: "2001-09-06T16:00:00.000Z"
        },
        {
            studentId: "1",
            name: "1",
            gender: "1",
            email: "1",
            phoneNumber: "1",
            educationType: "1",
            birthDate: "2001-09-06T16:00:00.000Z"
        }]
    }

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [topic, setTopic] = useState<MyTopic>(topicData);

      const capitalizeFirstLetter = (str: string) => {
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        return str2;
    }
    useEffect(() => {
        if(_id){
            dispatch(getTopicDetailAction(_id))
                    .then((data) => {
                        setTopic(data?.topic);
                    }
                    )
                    .catch((error) => {
        
                    })
        }
    }, []);


    return (
    <div className='p-3'>
  
            <Link to={'/topicManagement'} className='hover:cursor-pointer w-fit'>
                <img src={BackIcon} className='h-5' alt="" />
            </Link>
            <div className='flex justify-end items-center w-full mt-2'>
                    <div className='w-[100%] text-lg font-bold'>
                        Thông tin chi tiết của đề tài
                    </div>
            </div>


        <form className = "space-y-5 mt-5">
            <div className = "space-y-3">
                <div className = 'flex items-center px-5'>
                    <label htmlFor='text' className = "w-[160px] text-md font-semibold mr-1">
                        Tên đề tài: 
                    </label>
                    <div className = "w-1/2 text-gray-900 text-md">
                            {topic.name}
                    </div>
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
                            {displayDate(topic.creationDate)}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-md font-semibold w-[160px] mr-1">
                            Thời gian thực hiện: 
                        </label>

                        <div className = "w-1/4 text-gray-900 text-md">
                            {displayDate(topic.startTime)} - {displayDate(topic.endTime)}
                        </div>
                    </div>
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-md font-semibold w-[160px] mr-1">
                            Đợt: 
                        </label>
                        <div className = "w-1/4 text-gray-900 text-md">
                            {displayPeriod(topic.periodValue)}
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
                                {topic.student.name}
                            </div>
                        </div>

                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                Loại chương trình đào tạo: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {capitalizeFirstLetter(topic.student.educationType)}
                            </div>
                        </div>
                    </div>

                    <div className = 'flex flex-row'>
                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                MSSV: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {topic.student.studentId}
                            </div>
                        </div>

                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                Giới tính: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {topic.student.gender}
                            </div>
                        </div>
                    </div>

                    <div className = 'flex flex-row'>
                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                Email: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {topic.student.email}
                            </div>
                        </div>

                        <div className = 'flex flex-row items-center w-1/2'>
                            <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                Số điện thoại: 
                            </label>
                            <div className = "w-1/2 text-gray-900 text-md">
                                {topic.student.phoneNumber}
                            </div>
                        </div>
                    </div>

                    <div className = 'flex items-center'>
                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                            Ngày sinh: 
                        </label>
                        <div className = "w-1/2 text-gray-900 text-md">
                            {displayDate(topic.student.birthDate)}
                        </div>
                    </div>
                </div>
            </div>

            <div className= "px-5">
                <div className='text-md font-semibold'>
                    Thông tin các giáo viên hướng dẫn:
                </div>

                {topic.instructors.map((instructor, index) => {
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
                                            {displayDate(instructor.birthDate)}
                                        </div>
                                    </div>
                                </div>

                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            Học hàm: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {instructor.academyRank === "" ? "Không" : instructor.academyRank}
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

                {topic.otherMembers.map((otherMember, index) => {
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
                                        {/* <input type = 'text' name = 'name' id ='name'
                                            className = "w-1/2 border border-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                            defaultValue={otherMember.name}
                                        /> */}
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {otherMember.name}
                                        </div>
                                    </div>

                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                            Loại chương trình đào tạo: 
                                        </label>
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {capitalizeFirstLetter(otherMember.educationType)}
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
                                        {/* <select
                                        className="bg-white h-[45px] w-1/2 border border-black border-1 rounded-md focus:ring-blue-500 px-2"
                                        defaultValue={otherMember.gender}
                                        >
                                            <option value={GenderType.MALE}>{GenderType.MALE}</option>
                                            <option value={GenderType.FEMALE}>{GenderType.FEMALE}</option>
                                        </select> */}
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {otherMember.gender}
                                        </div>
                                    </div>
                                </div>

                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            Email: 
                                        </label>
                                        {/* <input type = 'text' name = 'name' id ='name'
                                            className = "w-1/2 border border-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                            defaultValue={otherMember.email}
                                        /> */}
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {otherMember.email}
                                        </div>
                                    </div>

                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[200px] mr-1">
                                            Số điện thoại: 
                                        </label>
                                        {/* <input type = 'text' name = 'name' id ='name'
                                            className = "w-1/2 border border-gray-500 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                            defaultValue={otherMember.phoneNumber}
                                        /> */}
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {otherMember.phoneNumber}
                                        </div>
                                    </div>
                                </div>


                                <div className = 'flex flex-row'>
                                    <div className = 'flex flex-row items-center w-1/2'>
                                        <label htmlFor='text' className = "text-md w-[120px] mr-1">
                                            Ngày sinh: 
                                        </label>
                                        {/* <div className = "w-1/2 text-gray-900 text-md">
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
                                        </div> */}
                                        <div className = "w-1/2 text-gray-900 text-md">
                                            {displayDate(otherMember.birthDate)}
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