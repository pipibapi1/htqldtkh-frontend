import React, { useState } from 'react';
import { topicInput } from '../../../../../shared/interfaces/topicInterface';
import { AcademyRank } from '../../../../../shared/types/academyRank';
import { capitalizeFirstLetter } from '../../../../../shared/functions';
import { DegreeType } from '../../../../../shared/types/degreeType';
import { GenderType } from '../../../../../shared/types/gender';
interface Props {
    index: number,
    setTopic: any,
    topic: topicInput
}

const ManualInstructorInput: React.FC<Props> = (props: Props) => {
    const {index, topic, setTopic} = props;
    const instructor = topic.instructors[index];

    const onChangeCurrInstructorName = (event: React.ChangeEvent<HTMLInputElement>) => {
        instructor.name = event.target.value;
        setTopic({...topic});
    }

    const onChangeCurrInstructorStaffId = (event: React.ChangeEvent<HTMLInputElement>) => {
        instructor.staffId = event.target.value;
        topic.instructorsId[index] = event.target.value;
        setTopic({...topic});
    }

    const onChangeCurrInstructorGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
        instructor.gender = event.target.value;
        setTopic({...topic});
    }
    
    const onChangeCurrInstructorPhoneNum = (event: React.ChangeEvent<HTMLInputElement>) => {
        instructor.phoneNumber = event.target.value;
        setTopic({...topic});
    }

    const onChangeCurrInstructorEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        instructor.email = event.target.value;
        setTopic({...topic});
    }
    
    const onChangeCurrInstructorDegree = (event: React.ChangeEvent<HTMLSelectElement>) => {
        instructor.degree = event.target.value;
        setTopic({...topic});
    }

    const onChangeCurrInstructorAcademyRank = (event: React.ChangeEvent<HTMLSelectElement>) => {
        instructor.academyRank = event.target.value;
        setTopic({...topic});
    }

    return (
        <div className='flex flex-col ml-4 mt-3 w-full'>
            <div className='flex w-3/4 flex-wrap'>
                <div className='flex flex-col justify-between my-1 mr-4'>
                    <div className=''>
                        Họ và tên:
                    </div>
                    <input
                        type="text"
                        name="name"
                        className="h-[40px] w-[350px] border border-black border-1 rounded-md p-1"
                        defaultValue={instructor.name}
                        onChange={onChangeCurrInstructorName}
                    ></input>
                </div>
                <div className='flex flex-col justify-between my-1'>
                    <div>
                        Giới tính:
                    </div>
                    <select
                        className="bg-white h-[40px] w-[350px] border border-black border-1 rounded-lg focus:ring-blue-500 p-1"
                        defaultValue={instructor.gender}
                        onChange={onChangeCurrInstructorGender}
                    >
                        <option value="" disabled hidden>Chọn giới tính</option>
                        {Object.values(GenderType).map((type) => {
                            return (
                                <option 
                                    value={type}
                                    key={type}
                                >{capitalizeFirstLetter(type)}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className='flex w-3/4 flex-wrap'>
                <div className='flex flex-col justify-between my-1 mr-4'>
                    <div>
                        Mã số cán bộ:
                    </div>
                    <input
                        type="text"
                        name="studentId"
                        className="h-[40px] w-[350px] border border-black border-1 rounded-md p-1"
                        defaultValue={instructor.staffId}
                        onChange={onChangeCurrInstructorStaffId}
                    ></input>
                </div>
                <div className='flex flex-col justify-between my-1'>
                    <div className=''>
                        Số điện thoại:
                    </div>
                    <input
                        type="text"
                        name="phoneNumber"
                        className="h-[40px] w-[350px] border border-black border-1 rounded-md p-1"
                        defaultValue={instructor.phoneNumber}
                        onChange={onChangeCurrInstructorPhoneNum}
                    ></input>
                </div>
            </div>
            <div className='flex w-3/4 flex-wrap'>
                <div className='flex flex-col justify-between my-1 mr-4'>
                    <div>
                        Email:
                    </div>
                    <input
                        type="text"
                        name="email"
                        className="h-[40px] w-[350px] border border-black border-1 rounded-md p-1"
                        defaultValue={instructor.email}
                        onChange={onChangeCurrInstructorEmail}
                    ></input>
                </div>
                <div className='flex flex-col justify-between my-1'>
                    <div className=''>
                        Học hàm:
                    </div>
                    <select
                        className="bg-white h-[40px] w-[350px] border border-black border-1 rounded-lg focus:ring-blue-500 p-1"
                        defaultValue={instructor.academyRank}
                        onChange={onChangeCurrInstructorAcademyRank}
                    >
                        <option value="" hidden>Chọn học hàm</option>
                        {Object.values(AcademyRank).map((type) => {
                            return (
                                <option 
                                    value={type}
                                    key={type}
                                >{capitalizeFirstLetter(type)}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className='flex w-full flex-col justify-between items-start my-1'>
                <div>
                    Học vị:
                </div>
                <select
                    className="bg-white h-[40px] w-[350px] border border-black border-1 rounded-lg focus:ring-blue-500 p-1"
                    defaultValue={instructor.degree}
                    onChange={onChangeCurrInstructorDegree}
                >
                    <option value="" hidden>Chọn học vị</option>
                    {Object.values(DegreeType).map((type) => {
                        return (
                            <option 
                                value={type}
                                key={type}
                            >{capitalizeFirstLetter(type)}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default ManualInstructorInput;