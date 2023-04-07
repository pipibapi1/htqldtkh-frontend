import React, { useState } from 'react';
import { topicInput } from '../../../../shared/interfaces/topicInterface';
import { AcademyRank } from '../../../../shared/types/academyRank';
import { capitalizeFirstLetter } from '../../../../shared/functions';
import { DegreeType } from '../../../../shared/types/degreeType';
interface Props {
    index: number,
    setTopic: any,
    topic: topicInput
}

const InstructorInput: React.FC<Props> = (props: Props) => {
    const {index, topic, setTopic} = props;
    const instructor = topic.instructors[index];
    const [isDuplicated, setIsDuplicated] = useState<boolean>(false);

    React.useEffect(() => {
        if (instructor.staffId !== "") {
            const instructors = topic.instructors;
            const duplicatedInstructors = instructors.filter((ele) => ele.staffId === instructor.staffId);
            if (duplicatedInstructors.length > 1) {
                setIsDuplicated(true);
            }
            else {
                setIsDuplicated(false);
            }
        }
        else {
            setIsDuplicated(false);
        }
    }, [instructor, topic.instructors])

    const onChangeCurrInstructorName = (event: React.ChangeEvent<HTMLInputElement>) => {
        instructor.name = event.target.value;
        setTopic({...topic});
    }

    const onChangeCurrInstructorStaffId = (event: React.ChangeEvent<HTMLInputElement>) => {
        instructor.staffId = event.target.value;
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
        <div className='flex flex-col w-full mb-6'>
            <div className="text-[#e1000e]">
                {isDuplicated? (
                    <i>
                        Thành viên bị trùng lặp
                    </i>
                ): null}
            </div>
            <div className='flex flex-col ml-4 mt-3 w-full'>
                <div className='flex w-1/2 flex-col justify-between my-1'>
                    <div className=''>
                        Họ và tên:
                    </div>
                    <input
                        type="text"
                        name="name"
                        className="w-[400px] border border-black border-1 rounded-md p-1"
                        defaultValue={instructor.name}
                        onChange={onChangeCurrInstructorName}
                    ></input>
                </div>
                <div className='flex w-1/2 flex-col justify-between my-1'>
                    <div>
                        Mã số cán bộ:
                    </div>
                    <input
                        type="text"
                        name="studentId"
                        className="w-[400px] border border-black border-1 rounded-md p-1"
                        defaultValue={instructor.staffId}
                        onChange={onChangeCurrInstructorStaffId}
                    ></input>
                </div>
                <div className='flex w-1/2 flex-col justify-between my-1'>
                    <div className=''>
                        Số điện thoại:
                    </div>
                    <input
                        type="text"
                        name="phoneNumber"
                        className="w-[400px] border border-black border-1 rounded-md p-1"
                        defaultValue={instructor.phoneNumber}
                        onChange={onChangeCurrInstructorPhoneNum}
                    ></input>
                </div>
                <div className='flex w-1/2 flex-col justify-between my-1'>
                    <div>
                        Email:
                    </div>
                    <input
                        type="text"
                        name="email"
                        className="w-[400px] border border-black border-1 rounded-md p-1"
                        defaultValue={instructor.email}
                        onChange={onChangeCurrInstructorEmail}
                    ></input>
                </div>
                <div className='flex w-1/2 flex-col justify-between my-1'>
                    <div className=''>
                        Học hàm:
                    </div>
                    <select
                        className="w-fit border border-black border-1 rounded-md p-1"
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
                <div className='flex w-1/2 flex-col justify-between my-1'>
                    <div>
                        Học vị:
                    </div>
                    <select
                        className="w-fit border border-black border-1 rounded-md p-1"
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
        </div>
    )
}

export default InstructorInput