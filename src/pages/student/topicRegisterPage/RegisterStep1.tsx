import React from 'react';

import { topicInput } from '../../../shared/interfaces/topicInterface';
import { displayPeriod } from '../../../shared/functions';

import BackIcon from '../../../assets/images/🦆 icon _arrow circle left_.png';

interface Props {
    onSetNextStep: (e: Boolean) => void;
    period: any,
    backToChoosePeriod:any,
    topic: topicInput,
    setTopic: any
}

//form to choose number member and number instructors
const RegisterStep1:React.FC<Props> = (props: Props) => {
    
    const {onSetNextStep, period, backToChoosePeriod, topic, setTopic} = props;

    const onChangeNumMember = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event){
            const numMember = Number(event.target.value);
            let otherMemberList = [];
            //initial for other member. Quantity of other member = all member - 1
            for (let i = 1; i < numMember; i++) {
                otherMemberList.push({
                    studentId: "",
                    fmName: "",
                    name: "",
                    gender: "",
                    email: "",
                    phoneNumber: "",
                    educationType: "",
                    birthDate: (new Date()).toString()
                })
            }
            setTopic({
                ...topic,
                numMember: numMember,
                otherMembers: otherMemberList
            })
        }
    }

    const onChangeNumInstructor = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(event){
            const numInstructor = parseInt(event.target.value);
            let instructorIdList = [];
            let instructorList = [];
            for (let i = 0; i < numInstructor; i++) {
                instructorIdList.push("");
                instructorList.push({
                    staffId: "",
                    name: "",
                    gender: "",
                    email: "",
                    phoneNumber: "",
                    birthDate: (new Date()).toString(),
                    academyRank: "",
                    degree: "",
                })
            }

            setTopic({
                ...topic,
                numInstructor: numInstructor,
                instructorsId: instructorIdList,
                instructors: instructorList
            })
        }
    }

    return(
        <div className='px-5 py-3'>
            <div 
                className='hover:cursor-pointer w-fit' 
                onClick={backToChoosePeriod}
            >
                <img src={BackIcon} className='h-5' alt="" />
            </div>
            <div>
                <div className='flex mb-5 mt-3'>
                    <div className='font-bold mr-5'>
                        Đợt:
                    </div>
                    <div>
                        {displayPeriod(period.period)}
                    </div>
                </div>

                <div className='mb-3'>
                    <div className='font-bold mb-2'>
                        Số lượng thành viên: 
                    </div>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                            onChange={onChangeNumMember}
                            defaultValue={topic.numMember}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={1}>6</option>
                            <option value={2}>7</option>
                            <option value={3}>8</option>
                            <option value={4}>9</option>
                            <option value={5}>10</option>
                        </select>
                    </div>
                </div>

                <div className='mb-5'>
                    <div className='font-bold mb-2'>
                        Số lượng GVHD: 
                    </div>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                            onChange={onChangeNumInstructor}
                            defaultValue={topic.numInstructor}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='flex ml-40 '>
                <div 
                        onClick={() => onSetNextStep(false)} 
                        className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                    >
                    Tiếp theo
                </div>
            </div>
        </div>
    )
}

export default RegisterStep1;