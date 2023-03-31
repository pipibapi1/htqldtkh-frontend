import React from 'react';
import DatePicker from "react-datepicker";

import { topicInput } from '../../../../shared/interfaces/topicInterface';

import Calendar from "../../../../assets/images/calendar.png";

interface Props {
    index: number,
    setTopic: any,
    topic: topicInput,
    conditionField: string[],
    dataForCondition: DataForCondition,
    setDataForCondition: any
}

interface DataForCondition {
    otherMembers : {[k:string] : string}[],
    leader: {[k:string] : string}
}

const OtherMembersInput: React.FC<Props> = (props: Props) => {
    const {index, topic, setTopic, conditionField, dataForCondition, setDataForCondition} = props;
    const currMember = topic.otherMembers[index - 1];

    const fieldsForCheckCondition = conditionField.map((field) => {
        const onChangeOtherMemberDataForCondition = (event: React.ChangeEvent<HTMLInputElement>) => {
            dataForCondition.otherMembers[index - 1][field] = event.target.value;
            setDataForCondition({
                ...dataForCondition
            })
        }

        return (
            <div 
                className='flex flex-col justify-between my-1'
                key={field}
            >
                <div>
                    {field}:
                </div>
                <input
                    type="text"
                    name={field}
                    className="w-1/3 border border-black border-1 rounded-md p-1"
                    onChange={onChangeOtherMemberDataForCondition}
                ></input>
            </div>
        )
    })

    const onChangeFmName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        currMember.fmName = value
        setTopic({
            ...topic
        })
    }

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        currMember.name = value
        setTopic({
            ...topic
        })
    }

    const onChangeGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        currMember.gender = value
        setTopic({
            ...topic
        })
    }

    const onChangeStudentId = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        currMember.studentId = value;
        setTopic({
            ...topic
        })
    }

    const onChangeEduType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        currMember.educationType = value;
        setTopic({
            ...topic
        })
    }

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        currMember.email = value;
        setTopic({
            ...topic
        })
    }

    const onChangePhoneNum = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        currMember.phoneNumber = value;
        setTopic({
            ...topic
        })
    }

    return (
        <div className='flex flex-col w-full mb-6'>
            <div className='border-b-2 border-t-2 border-black text-lg font-semibold'>
                Thành viên {index}:
            </div>
            <div className='flex flex-col ml-2 mt-3 w-3/4'>
                <div className='flex w-full'>
                    <div className='flex w-1/2 flex-col justify-between my-1'>
                        <div className=''>
                            Họ và tên lót:
                        </div>
                        <input
                            type="text"
                            name="fmName"
                            className="w-2/3 border border-black border-1 rounded-md p-1"
                            onChange={onChangeFmName}
                            defaultValue={currMember.fmName}
                        ></input>
                    </div>
                    <div className='flex w-1/2 flex-col justify-between my-1'>
                        <div>
                            Tên:
                        </div>
                        <input
                            type="text"
                            name="name"
                            className="w-2/3 border border-black border-1 rounded-md p-1"
                            onChange={onChangeName}
                            defaultValue={currMember.name}
                        ></input>
                    </div>
                </div>

                <div className='flex w-full'>
                    <div className='flex w-1/2 flex-col justify-between my-1'>
                        <div>
                            Giới tính:
                        </div>
                        <select
                            className="bg-white w-2/3 h-10 border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                            name="gender"
                            defaultValue={currMember.gender}
                            onChange={onChangeGender}
                        >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                    <div className='flex w-1/2 flex-col justify-between my-1'>
                        <div>
                            Mã số sinh viên:
                        </div>
                        <input
                            type="text"
                            name="studentId"
                            className="w-2/3 border border-black border-1 rounded-md p-1"
                            defaultValue={currMember.studentId}
                            onChange={onChangeStudentId}
                        ></input>
                    </div>
                </div>

                <div className='flex w-full'>
                    <div className='flex w-1/2 flex-col justify-between my-1'>
                        <div>
                            Ngày sinh:
                        </div>
                        <div className='relative w-2/3'>
                            <DatePicker
                                onChange={date => {
                                    currMember.birthDate = date? date.toString() : (new Date()).toString();
                                    setTopic({
                                        ...topic
                                    })
                                }}
                                selected={new Date(currMember.birthDate)}
                                dateFormat="dd/MM/yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                className="w-full h-10 border border-black border-1 rounded-lg px-2"
                            />
                            <div className='absolute right-3 top-3'>
                                <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-1/2 flex-col justify-between my-1'>
                        <div>
                            Loại chương trình đào tạo:
                        </div>
                        <select
                            className="bg-white w-2/3 h-10 border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                            defaultValue={currMember.educationType}
                            name="educationType"
                            onChange={onChangeEduType}
                        >
                            <option value="Chính quy">Chính quy</option>
                            <option value="Chất lượng cao">Chất lượng cao</option>
                            <option value="Kỹ sư tài năng">Kỹ sư tài năng</option>
                        </select>
                    </div>
                </div>

                <div className='flex w-full'>
                    <div className='flex flex-col w-1/2 justify-between my-1'>
                        <div>
                            Email:
                        </div>
                        <input
                            type="text"
                            name="email"
                            className="w-2/3 border border-black border-1 rounded-md p-1"
                            defaultValue={currMember.email}
                            onChange={onChangeEmail}
                        ></input>
                    </div>
                    <div className='flex flex-col w-1/2 justify-between my-1'>
                        <div>
                            Số điện thoại:
                        </div>
                        <input
                            type="text"
                            name="phoneNumber"
                            className="w-2/3 border border-black border-1 rounded-md p-1"
                            defaultValue={currMember.phoneNumber}
                            onChange={onChangePhoneNum}
                        ></input>
                    </div>
                </div>
                {fieldsForCheckCondition}
            </div>
        </div>
    )
}

export default OtherMembersInput