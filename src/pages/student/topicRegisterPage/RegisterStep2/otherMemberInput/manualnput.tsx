import React from 'react';

import { topicInput } from '../../../../../shared/interfaces/topicInterface';
import { VariableTypeEnum } from '../../../../../shared/types/variableType';

import { EducationType } from '../../../../../shared/types/educationType';
import { GenderType } from '../../../../../shared/types/gender';
import { capitalizeFirstLetter } from '../../../../../shared/functions';

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

const ManualOtherMembersInput: React.FC<Props> = (props: Props) => {
    const {index, topic, setTopic, conditionField, dataForCondition, setDataForCondition} = props;
    const currMember = topic.otherMembers[index];

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
                            className="w-[350px] border border-black border-1 rounded-md p-1"
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
                            className="w-[350px] border border-black border-1 rounded-md p-1"
                            defaultValue={currMemberVar[field.variable]}
                            onChange={onChangeConditionVar}
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

    const onChangeCurrMemberGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
        currMember.gender = event.target.value;
        setTopic({...topic})
    }
    
    const onChangeCurMemberEducationType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = capitalizeFirstLetter(event.target.value)
        currMember.educationType = value;
        setTopic({...topic});
        if (conditionField[VariableTypeEnum.EDUCATION_TYPE]) {
            dataForCondition.otherMembers[index][VariableTypeEnum.EDUCATION_TYPE] = value;
            setDataForCondition({...dataForCondition});
        }
    }

    const onChangeCurMemberBirthdate  = (event: React.ChangeEvent<HTMLInputElement>) => {
        currMember.birthDate = event.target.value;
        setTopic({...topic})
    }

    return (
        <div className='flex flex-col ml-4 mt-3 w-full'>
            <div className='flex w-3/4 flex-wrap'>
                <div className='flex w-[350px] flex-col justify-between my-1 mr-4'>
                    <div className=''>
                        Họ và tên:
                    </div>
                    <input
                        data-testid='name-input'
                        type="text"
                        name="name"
                        className="h-[40px] w-[350px] border border-black border-1 rounded-md p-1"
                        defaultValue={currMember.name}
                        onChange={onChangeCurMemberName}
                    ></input>
                </div>
                <div className='flex w-[350px] flex-col justify-between my-1'>
                    <div>
                        Giới tính:
                    </div>
                    <select
                        data-testid='gender-select'
                        className="bg-white h-[40px] w-[400px] border border-black border-1 rounded-lg focus:ring-blue-500 p-1"
                        defaultValue={currMember.gender}
                        onChange={onChangeCurrMemberGender}
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
                <div className='flex w-[350px] flex-col justify-between my-1 mr-4'>
                    <div>
                        Mã số sinh viên:
                    </div>
                    <input
                        type="text"
                        name="studentId"
                        className="h-[40px] w-[350px] border border-black border-1 rounded-md p-1"
                        defaultValue={currMember.studentId}
                        onChange={onChangeCurMemberStudentId}
                    ></input>
                </div>
                <div className='flex w-[350px] flex-col justify-between my-1'>
                    <div className=''>
                        Số điện thoại:
                    </div>
                    <input
                        type="text"
                        name="phoneNumber"
                        className="h-[40px] w-[350px] border border-black border-1 rounded-md p-1"
                        defaultValue={currMember.phoneNumber}
                        onChange={onChangeCurMemberPhoneNumber}
                    ></input>
                </div>
            </div>
            <div className='flex w-3/4 flex-wrap'>
                <div className='flex w-[350px] flex-col justify-between my-1 mr-4'>
                    <div>
                        Email:
                    </div>
                    <input
                        type="text"
                        name="email"
                        className="h-[40px] w-[350px] border border-black border-1 rounded-md p-1"
                        defaultValue={currMember.email}
                        onChange={onChangeCurMemberEmail}
                    ></input>
                </div>
                <div className='flex w-[350px] flex-col justify-between my-1'>
                    <div className=''>
                        Chương trình đào tạo:
                    </div>
                    <select
                        className="bg-white h-[40px] w-[350px] border border-black border-1 rounded-lg focus:ring-blue-500 p-1"
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
            </div>
            <div className='flex w-2/3 flex-col justify-between my-1'>
                <div>
                    Ngày sinh:
                </div>
                <input
                    type="date"
                    name="birthDate"
                    className="h-[40px] w-[350px] border border-black border-1 rounded-md p-1"
                    defaultValue={currMember.birthDate}
                    onChange={onChangeCurMemberBirthdate}
                ></input>
            </div>
            {displayConditionVariable()}
        </div>
    )
}

export default ManualOtherMembersInput;