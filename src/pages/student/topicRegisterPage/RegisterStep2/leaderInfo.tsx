import React, { useCallback, useState } from 'react';
import Swal from 'sweetalert2';

import { topicInput } from '../../../../shared/interfaces/topicInterface';
import { VariableTypeEnum } from '../../../../shared/types/variableType';

import { HCMUTStudentService } from '../../../../externalService/HCMUTService/studentService';
import { HCMUTSystemStudentIntf } from '../../../../shared/interfaces/HCMUTSystemStudentIntf';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

interface Props {
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

interface VarName {
    variable: string,
    subjectName?: string,
    subjectId?: string
}

interface LeaderDataForcondition {
    isLoadding: boolean,
    leader: {
        name: string,
        studentId: string,
        gender: string,
        phoneNumber: string,
        email: string
    }
}

interface LeaderConditionVar{
    [k:string] : string | number | undefined
}

const LeaderInfo: React.FC<Props> = (props: Props) => {
    const {topic, conditionField, dataForCondition, setDataForCondition} = props;
    const {user} = useSelector((state: RootState) => state.auth);
    const [leaderInfo, setLeaderInfo] = useState<LeaderDataForcondition>({
        isLoadding: false,
        leader: {
            name: "",
            studentId: "",
            gender: "",
            phoneNumber: "",
            email: ""
        }
    })

    const displayConditionVariable = () => {
        const currMemberVar = dataForCondition.leader;
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

    const displayMemberInfo = () => {
        //display when getting student info
        if (leaderInfo.isLoadding) {
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
        else if (leaderInfo.leader.name === "") {
            return null;
        }
        //display student info
        else {
            const leader = leaderInfo.leader;
            return (
                <div className='flex flex-col w-full items-start mt-4'>
                    <div className='px-3 py-1'>
                        Họ và tên: {leader.name}
                    </div>
                    <div className='px-3 py-1'>
                        Giới tính: {leader.gender}
                    </div>
                    <div className='px-3 py-1'>
                        Email: {leader.email}
                    </div>
                    <div className='px-3 py-1'>
                        Số điện thoại: {leader.phoneNumber? leader.phoneNumber: (<i>Không có</i>)}
                    </div>
                    <div className='px-3 py-1'>
                        Mã số sinh viên: {leader.studentId}
                    </div>
                    {displayConditionVariable()}
                </div>
            )
        }
    }

    const updateConditionVar = useCallback(
        (student: HCMUTSystemStudentIntf) => {
            const currConditionVar: LeaderConditionVar = {};
            for (let key in conditionField) {
                const field = conditionField[key];
                if (field.variable === VariableTypeEnum.SUBJECT_MARK) {
                    const subjectResult = student.subjects.find((subject) => subject.subjectId === field.subjectId)
                    currConditionVar[key] = subjectResult? subjectResult.result : ""; 
                }
                else {
                    switch (key) {
                        case VariableTypeEnum.ACCUMULATE_CREDIT:
                            currConditionVar[key] = student.accumulatedCredits;
                            break;
                        
                        case VariableTypeEnum.EDUCATION_TYPE:
                            currConditionVar[key] = student.educationType;
                            break;
                        
                        case VariableTypeEnum.AVERAGE_MARK:
                            currConditionVar[key] = student.averageMark;
                            break;
                        
                        default:
                    }
                }
            }
            setDataForCondition({
                ...dataForCondition,
                leader: currConditionVar
            });
        }, [conditionField]
    ) 

    React.useEffect(() => {
        setLeaderInfo({
            isLoadding: true,
            leader: {
                name: "",
                gender: "",
                phoneNumber: "",
                email: "",
                studentId: ""
            }
        })
        HCMUTStudentService.getHCMUTStudentById(user.studentId)
            .then((student: HCMUTSystemStudentIntf) => {
                setLeaderInfo({
                    isLoadding: false,
                    leader: {
                        name: student.name,
                        gender: student.gender,
                        phoneNumber: student.phoneNumber as string,
                        email: student.email,
                        studentId: student.studentId
                    }
                })
                updateConditionVar(student);
            })
            .catch((data: any) => {
                setLeaderInfo({
                    isLoadding: false,
                    leader: {
                        name: "",
                        gender: "",
                        phoneNumber: "",
                        email: "",
                        studentId: ""
                    }
                })
                Swal.fire({
                    text: "Đã có lỗi xảy ra. Vui lòng thử lại sau",
                    icon: "error"
                })
            })
    }, [user, updateConditionVar])

    return (
        <div className='flex flex-col w-full'>
            {displayMemberInfo()}
        </div>
    )
}

export default LeaderInfo;