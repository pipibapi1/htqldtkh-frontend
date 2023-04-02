import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { topicInput } from '../../../../shared/interfaces/topicInterface';
import { VariableTypeEnum } from '../../../../shared/types/variableType';

import { HCMUTStudentService } from '../../../../externalService/HCMUTService/studentService';
import { HCMUTSystemStudentIntf } from '../../../../shared/interfaces/HCMUTSystemStudentIntf';

import { useSelector} from 'react-redux';
import { RootState} from '../../../../store';

interface Props {
    index: number,
    setTopic: any,
    topic: topicInput,
    conditionField: {[k: string] : VarName},
    dataForCondition: DataForCondition,
    setDataForCondition: any
}

interface DataForCondition {
    otherMembers : {[k:string] : string | number | undefined}[],
    leader: {[k:string] : string | number | undefined}
}

interface otherMemberInput {
    email: string,
    studentId: string,
    isLoadding: boolean,
    isConflict: boolean
}

interface VarName {
    variable: string,
    subjectName?: string,
    subjectId?: string
}

const OtherMembersInput: React.FC<Props> = (props: Props) => {
    const {index, topic, setTopic, conditionField, dataForCondition, setDataForCondition} = props;
    const currMember = topic.otherMembers[index];
    const [memberInput, setMemberInput] = useState<otherMemberInput>({
        email: "",
        studentId: "",
        isLoadding: false,
        isConflict: false
    })
    const {user} = useSelector((state: RootState) => state.auth);

    //check whether current member is duplicated or not
    const otherMembers = topic.otherMembers;
    const listMemberSameId = otherMembers.filter((member) => member.studentId === currMember.studentId)
    const isDuplicated = currMember.studentId && 
                        ((listMemberSameId.length > 1) || (currMember.studentId === user.studentId));

    const displayMemberInfo = () => {
        //display when getting student info
        if (memberInput.isLoadding) {
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
        //display when email and id input not match with data of system
        else if (memberInput.isConflict) {
            return (
                <div className='text-[#e1000e]'>
                    <i> Mã số sinh viên hoặc email không đúng. </i>
                </div>
            )
        }
        //display when student info empty
        else if (currMember.name === "") {
            return null
        }
        //display student info
        else {
            return (
                <div className='flex flex-col w-full items-start mt-4'>
                    <div className='px-3 py-1'>
                        Họ và tên: {currMember.name}
                    </div>
                    <div className='px-3 py-1'>
                        Giới tính: {currMember.gender}
                    </div>
                    <div className='px-3 py-1'>
                        Email: {currMember.email}
                    </div>
                    <div className='px-3 py-1'>
                        Số điện thoại: {currMember.phoneNumber? currMember.phoneNumber: (<i>Không có</i>)}
                    </div>
                    <div className='px-3 py-1'>
                        Mã số sinh viên: {currMember.studentId}
                    </div>
                    {displayConditionVariable()}
                </div>
            )
        }
    }

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMemberInput({
            ...memberInput,
            email: event.target.value
        })
    }

    const onChangeStudentId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMemberInput({
            ...memberInput,
            studentId: event.target.value
        })
    }

    const removeCurrMemberInfo = () => {
        currMember.name = "";
        currMember.gender = "";
        currMember.phoneNumber = "";
        currMember.email = "";
        currMember.studentId = "";
        setTopic({...topic});
    }

    const setCurrMemberInfo = (student: HCMUTSystemStudentIntf) => {
        currMember.name = student.name;
        currMember.gender = student.gender;
        currMember.phoneNumber = student.phoneNumber as string;
        currMember.email = student.email;
        currMember.studentId = student.studentId;
        setTopic({...topic});
    }

    const updateConditionVar = (student: HCMUTSystemStudentIntf) => {
        const currMemberConditionVar = dataForCondition.otherMembers[index];
        for (let key in conditionField) {
            const field = conditionField[key];
            if (field.variable === VariableTypeEnum.SUBJECT_MARK) {
                const subjectResult = student.subjects.find((subject) => subject.subjectId === field.subjectId)
                currMemberConditionVar[key] = subjectResult? subjectResult.result : ""; 
            }
            else {
                switch (key) {
                    case VariableTypeEnum.ACCUMULATE_CREDIT:
                        currMemberConditionVar[key] = student.accumulatedCredits;
                        break;
                    
                    case VariableTypeEnum.EDUCATION_TYPE:
                        currMemberConditionVar[key] = student.educationType;
                        break;
                    
                    case VariableTypeEnum.AVERAGE_MARK:
                        currMemberConditionVar[key] = student.averageMark;
                        break;
                    
                    default:
                }
            }
        }
        setDataForCondition({...dataForCondition});
    }

    const onClickFindInfoBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMemberInput({
            ...memberInput,
            isLoadding: true,
            isConflict: false
        })
        HCMUTStudentService.getHCMUTStudentById(memberInput.studentId)
            .then((student: HCMUTSystemStudentIntf) => {
                //check whether student's email is same with email input or not 
                if ((student.email === memberInput.email)
                    || (`${student.email}.vn` === memberInput.email)
                    || (student.email === `${memberInput.email}.vn`)) 
                {
                    setCurrMemberInfo(student);
                    updateConditionVar(student);
                    setMemberInput({
                        ...memberInput,
                        isLoadding: false,
                        isConflict: false
                    })
                }
                else {
                    setMemberInput({
                        ...memberInput,
                        isLoadding: false,
                        isConflict: true
                    })
                    removeCurrMemberInfo();
                }
            })
            .catch((data: any) => {
                if (data.request?.status === 404) {
                    setMemberInput({
                        ...memberInput,
                        isLoadding: false,
                        isConflict: true
                    })
                    removeCurrMemberInfo();
                }
                else {
                    removeCurrMemberInfo();
                    setMemberInput({
                        ...memberInput,
                        isLoadding: false,
                        isConflict: false
                    })
                    Swal.fire({
                        text: "Đã có lỗi xảy ra. Vui lòng thử lại sau",
                        icon: "error"
                    })
                }
            })
    }

    const displayConditionVariable = () => {
        const currMemberVar = dataForCondition.otherMembers[index];
        return Object.values(conditionField).map((field) => {
            if (field.variable === VariableTypeEnum.SUBJECT_MARK) {
                const subjectResult = currMemberVar[field.subjectId as string];
                return (
                    <div 
                        className='px-3 py-1'
                        key={field.variable}
                    >
                        {
                            VariableTypeEnum.SUBJECT_MARK
                            + ` ${field.subjectName}(${field.subjectId}): `
                            + subjectResult
                        }
                    </div>
                )
            }
            else {
                const value = currMemberVar[field.variable]
                return (
                    <div 
                        className='px-3 py-1'
                        key={field.variable}
                    >
                        {
                            field.variable
                            + `: ${value}`
                        }
                    </div>
                )
            }
        })
    }

    return (
        <div className='flex flex-col w-full mb-6'>
            <div className='border-b-2 border-t-2 border-black text-lg font-semibold'>
                Thành viên {index + 1}:
            </div>
            <div className="text-[#e1000e]">
                {isDuplicated? (
                    <i>
                        Thành viên bị trùng lặp
                    </i>
                ): null}
            </div>
            <div className='flex flex-col ml-2 mt-3 w-full'>
                <div className='flex w-full items-center'>
                    <div className='flex w-1/4 flex-col justify-between my-1'>
                        <div className=''>
                            Mã số sinh viên:
                        </div>
                        <input
                            type="text"
                            name="fmName"
                            className="w-2/3 border border-black border-1 rounded-md p-1"
                            onChange={onChangeStudentId}
                            value={memberInput.studentId}
                        ></input>
                    </div>
                    <div className='flex w-1/2 flex-col justify-between my-1'>
                        <div>
                            Email (Cần sử dụng mail trường):
                        </div>
                        <input
                            type="text"
                            name="name"
                            className="w-5/6 border border-black border-1 rounded-md p-1"
                            onChange={onChangeEmail}
                            value={memberInput.email}
                        ></input>
                    </div>
                    <div className='flex w-1/4 flex-col items-start justify-between my-1'>
                        <button
                            className='px-2 py-1 rounded border border-2 border-[#1488d8] text-[#1488d8]'
                            onClick={onClickFindInfoBtn}
                        >
                            Tìm thông tin
                        </button>
                    </div>
                </div>
                {displayMemberInfo()}
            </div>
        </div>
    )
}

export default OtherMembersInput