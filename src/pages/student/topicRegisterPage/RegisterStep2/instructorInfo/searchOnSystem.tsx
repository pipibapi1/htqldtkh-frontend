import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { topicInput } from '../../../../../shared/interfaces/topicInterface';
import { HCMUTSystemInstructorIntf } from '../../../../../shared/interfaces/HCMUTSystemInstructorIntf';
import { HCMUTInstructorService } from '../../../../../externalService/HCMUTService/instructorService';
export interface Props {
    index: number,
    setTopic: any,
    topic: topicInput
}

export interface InstructorData {
    staffId: string,
    isLoadding: boolean,
    isNotFound: boolean
}

const SearchInstructorOnSystem: React.FC<Props> = (props: Props) => {
    const {index, topic, setTopic} = props;
    const instructor = topic.instructors[index];
    const [instructorInput, setInstructorInput] = useState<InstructorData>({
        staffId: "",
        isLoadding: false,
        isNotFound: false
    })
    const [isDuplicated, setIsDuplicated] = useState<boolean>(false);

    const displayInstructorInfo = () => {
        //display when getting student info
        if (instructorInput.isLoadding) {
            return (
                <div className='px-4'>
                    <svg 
                        viewBox="0 0 32 32" 
                        xmlns="http://www.w3.org/2000/svg"
                        fill='black'
                        height="40"
                        width="40"
                        className="animate-spin"
                    >
                        <path 
                            d="M 16 3 C 14.34375 3 13 4.34375 13 6 C 13 7.65625 14.34375 9 16 9 C 17.65625 9 19 7.65625 19 6 C 19 4.34375 17.65625 3 16 3 Z M 8.9375 6.4375 C 7.558594 6.4375 6.4375 7.558594 6.4375 8.9375 C 6.4375 10.316406 7.558594 11.4375 8.9375 11.4375 C 10.316406 11.4375 11.4375 10.316406 11.4375 8.9375 C 11.4375 7.558594 10.316406 6.4375 8.9375 6.4375 Z M 23.0625 7.9375 C 22.511719 7.9375 22.0625 8.386719 22.0625 8.9375 C 22.0625 9.488281 22.511719 9.9375 23.0625 9.9375 C 23.613281 9.9375 24.0625 9.488281 24.0625 8.9375 C 24.0625 8.386719 23.613281 7.9375 23.0625 7.9375 Z M 6 13.75 C 4.757813 13.75 3.75 14.757813 3.75 16 C 3.75 17.242188 4.757813 18.25 6 18.25 C 7.242188 18.25 8.25 17.242188 8.25 16 C 8.25 14.757813 7.242188 13.75 6 13.75 Z M 26 14.75 C 25.308594 14.75 24.75 15.308594 24.75 16 C 24.75 16.691406 25.308594 17.25 26 17.25 C 26.691406 17.25 27.25 16.691406 27.25 16 C 27.25 15.308594 26.691406 14.75 26 14.75 Z M 8.9375 21.0625 C 7.832031 21.0625 6.9375 21.957031 6.9375 23.0625 C 6.9375 24.167969 7.832031 25.0625 8.9375 25.0625 C 10.042969 25.0625 10.9375 24.167969 10.9375 23.0625 C 10.9375 21.957031 10.042969 21.0625 8.9375 21.0625 Z M 23.0625 21.5625 C 22.234375 21.5625 21.5625 22.234375 21.5625 23.0625 C 21.5625 23.890625 22.234375 24.5625 23.0625 24.5625 C 23.890625 24.5625 24.5625 23.890625 24.5625 23.0625 C 24.5625 22.234375 23.890625 21.5625 23.0625 21.5625 Z M 16 24.25 C 15.035156 24.25 14.25 25.035156 14.25 26 C 14.25 26.964844 15.035156 27.75 16 27.75 C 16.964844 27.75 17.75 26.964844 17.75 26 C 17.75 25.035156 16.964844 24.25 16 24.25 Z"
                        />
                    </svg>
                </div>
            )
        }   
        //display when cannot found 
        else if (instructorInput.isNotFound) {
            return (
                <div className='text-[#e1000e]'>
                    <i> Mã số không đúng. </i>
                </div>
            )
        }
        //display when student info empty
        else if (!instructor.name) {
            return null
        }
        //display student info
        else {
            return (
                <div className='flex flex-col w-full items-start mt-4'>
                    <div className='px-3 py-1'>
                        Họ và tên: {instructor.name}
                    </div>
                    <div className='px-3 py-1'>
                        Giới tính: {instructor.gender}
                    </div>
                    <div className='px-3 py-1'>
                        Email: {instructor.email}
                    </div>
                    <div className='px-3 py-1'>
                        Số điện thoại: {instructor.phoneNumber? instructor.phoneNumber: (<i>Không có</i>)}
                    </div>
                    <div className='px-3 py-1'>
                        Học hàm : {instructor.academyRank}
                    </div>
                    <div className='px-3 py-1'>
                        Học vị : {instructor.degree}
                    </div>
                </div>
            )
        }
    }

    const onChangeStaffId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInstructorInput({
            ...instructorInput,
            staffId: event.target.value
        })
    }

    const removeInstructorInfo = () => {
        topic.instructorsId[index] = "";
        instructor.name = "";
        instructor.gender = "";
        instructor.phoneNumber = "";
        instructor.email = "";
        instructor.staffId = "";
        instructor.academyRank = "";
        instructor.degree = "";
        setTopic({...topic});
    }

    const setInstructorInfo = (data: HCMUTSystemInstructorIntf) => {
        topic.instructorsId[index] = data._id;
        instructor.name = data.name;
        instructor.gender = data.gender;
        instructor.phoneNumber = data.phoneNumber as string;
        instructor.email = data.email;
        instructor.staffId = data.staffId;
        instructor.academyRank = data.academyRank;
        instructor.degree = data.degree;
        setTopic({...topic});
    }

    const onClickFindInfoBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        setInstructorInput({
            ...instructorInput,
            isLoadding: true,
            isNotFound: false
        })
        HCMUTInstructorService.getHCMUTInstructorById(instructorInput.staffId)
            .then((instructor: HCMUTSystemInstructorIntf) => {
                setInstructorInfo(instructor);
                setInstructorInput({
                    ...instructorInput,
                    isLoadding: false,
                    isNotFound: false
                })
            })
            .catch((data: any) => {
                if (data.request?.status === 404) {
                    setInstructorInput({
                        ...instructorInput,
                        isLoadding: false,
                        isNotFound: true
                    })
                    removeInstructorInfo();
                }
                else {
                    setInstructorInput({
                        ...instructorInput,
                        isLoadding: false,
                        isNotFound: true
                    })
                    removeInstructorInfo();
                    Swal.fire({
                        text: "Đã có lỗi xảy ra. Vui lòng thử lại sau",
                        icon: "error"
                    })
                }
            })
    }

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

    return (
        <div data-testid="search-instructor" className='flex flex-col ml-2 mt-3 w-full'>
            <div className='flex w-full items-center justify-start'>
                <div className='flex w-1/2 flex-row justify-between my-1 mr-4'>
                    <div className=''>
                        Mã số cán bộ:
                    </div>
                    <input
                        data-testid="instructor-input"
                        type="text"
                        name="fmName"
                        className="w-2/3 border border-black border-1 rounded-md p-1"
                        onChange={onChangeStaffId}
                        value={instructorInput.staffId}
                    ></input>
                </div>
                <div className='flex w-1/4 flex-col items-start justify-between my-1'>
                    <button
                        data-testid="find-button"
                        className='px-2 py-1 rounded border border-2 border-[#1488d8] text-[#1488d8]'
                        onClick={onClickFindInfoBtn}
                    >
                        Tìm thông tin
                    </button>
                </div>
            </div>
            {displayInstructorInfo()}
        </div>
    )
}

export default SearchInstructorOnSystem;