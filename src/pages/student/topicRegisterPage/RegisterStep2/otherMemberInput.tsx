import React from 'react';

import { topicInput } from '../../../../shared/interfaces/topicInterface';
import { VariableTypeEnum } from '../../../../shared/types/variableType';

import { useSelector} from 'react-redux';
import { RootState} from '../../../../store';
import { EducationType } from '../../../../shared/types/educationType';
import { capitalizeFirstLetter } from '../../../../shared/functions';

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

interface VarName {
    variable: string,
    subjectName?: string,
    subjectId?: string
}

const OtherMembersInput: React.FC<Props> = (props: Props) => {
    const {index, topic, setTopic, conditionField, dataForCondition, setDataForCondition} = props;
    const currMember = topic.otherMembers[index];
    const {user} = useSelector((state: RootState) => state.auth);

    //check whether current member is duplicated or not
    const otherMembers = topic.otherMembers;
    const listMemberSameId = otherMembers.filter((member) => member.studentId === currMember.studentId)
    const isDuplicated = currMember.studentId && 
                        ((listMemberSameId.length > 1) 
                            || (currMember.studentId === user.studentId));

    const updateDataForCondition = (field: VarName, value: string) => {
        const currMemberVar = dataForCondition.otherMembers[index];
        if (field.variable === VariableTypeEnum.SUBJECT_MARK) {
            currMemberVar[field.subjectId as string] = value;
        }
        else {
            currMemberVar[field.variable] = value;
        }
        setDataForCondition({...dataForCondition})
    }
    
    const displayConditionVariable = () => {
        const currMemberVar = dataForCondition.otherMembers[index];
        return Object.values(conditionField).map((field) => {
            const onChangeConditionVar = (event: React.ChangeEvent<HTMLInputElement>) => {
                updateDataForCondition(field, event.target.value)
            }

            if (field.variable === VariableTypeEnum.SUBJECT_MARK) {
                return (
                    <div 
                        className='flex flex-col w-2/3 my-1'
                        key={field.subjectId}
                    >
                        <div>
                            {
                                VariableTypeEnum.SUBJECT_MARK
                                + ` ${field.subjectName}(${field.subjectId}): `
                            }
                        </div>
                        <input
                            type="text"
                            name={field.subjectId}
                            className="w-[400px] border border-black border-1 rounded-md p-1"
                            defaultValue={currMemberVar[field.subjectId as string]}
                            onChange={onChangeConditionVar}
                        ></input>
                    </div>
                )
            }
            else if (field.variable !== VariableTypeEnum.EDUCATION_TYPE) {
                return (
                    <div 
                        className='flex flex-col w-2/3 my-1'
                        key={field.variable}
                    >
                        <div>
                            {field.variable}:
                        </div>
                        <input
                            type="text"
                            name={field.subjectId}
                            className="w-[400px] border border-black border-1 rounded-md p-1"
                            defaultValue={currMemberVar[field.variable]}
                        ></input>
                    </div>
                )
            }
            else {
                return null;
            }
        })
    }

    const onChangeCurMemberEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        currMember.email = event.target.value;
        setTopic({...topic})
    }

    const onChangeCurMemberName = (event: React.ChangeEvent<HTMLInputElement>) => {
        currMember.name = event.target.value;
        setTopic({...topic})
    }
    
    const onChangeCurMemberPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        currMember.phoneNumber = event.target.value;
        setTopic({...topic})
    }

    const onChangeCurMemberStudentId = (event: React.ChangeEvent<HTMLInputElement>) => {
        currMember.studentId = event.target.value;
        setTopic({...topic})
    }
    
    const onChangeCurMemberEducationType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        currMember.educationType = event.target.value;
        setTopic({...topic});
        if (conditionField[VariableTypeEnum.EDUCATION_TYPE]) {
            dataForCondition.otherMembers[index][VariableTypeEnum.EDUCATION_TYPE] = event.target.value;
            setDataForCondition({...dataForCondition});
        }
    }

    const onChangeCurMemberBirthdate  = (event: React.ChangeEvent<HTMLInputElement>) => {
        currMember.birthDate = event.target.value;
        setTopic({...topic})
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
            <div className='flex flex-col ml-4 mt-3 w-full'>
                <div className='flex w-1/2 flex-col justify-between my-1'>
                    <div className=''>
                        Họ và tên:
                    </div>
                    <input
                        type="text"
                        name="name"
                        className="w-[400px] border border-black border-1 rounded-md p-1"
                        defaultValue={currMember.name}
                        onChange={onChangeCurMemberName}
                    ></input>
                </div>
                <div className='flex w-1/2 flex-col justify-between my-1'>
                    <div>
                        Mã số sinh viên:
                    </div>
                    <input
                        type="text"
                        name="studentId"
                        className="w-[400px] border border-black border-1 rounded-md p-1"
                        defaultValue={currMember.studentId}
                        onChange={onChangeCurMemberStudentId}
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
                        defaultValue={currMember.phoneNumber}
                        onChange={onChangeCurMemberPhoneNumber}
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
                        defaultValue={currMember.email}
                        onChange={onChangeCurMemberEmail}
                    ></input>
                </div>
                <div className='flex w-1/2 flex-col justify-between my-1'>
                    <div className=''>
                        Chương trình đào tạo:
                    </div>
                    <select
                        className="w-fit border border-black border-1 rounded-md p-1"
                        defaultValue={currMember.educationType}
                        onChange={onChangeCurMemberEducationType}
                    >
                        <option value="" hidden>Chọn chương trình</option>
                        {Object.values(EducationType).map((type) => {
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
                        Ngày sinh:
                    </div>
                    <input
                        type="date"
                        name="birthDate"
                        className="w-fit border border-black border-1 rounded-md p-1"
                        defaultValue={currMember.birthDate}
                        onChange={onChangeCurMemberBirthdate}
                    ></input>
                </div>
                {displayConditionVariable()}
            </div>
        </div>
    )
}

export default OtherMembersInput