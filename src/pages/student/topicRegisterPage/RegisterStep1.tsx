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

const RegisterStep1:React.FC<Props> = (props: Props) => {
    
    const {onSetNextStep, period, backToChoosePeriod, topic, setTopic} = props;

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
                            onChange={event => {
                                if(event){
                                    const numMember = Number(event.target.value);
                                    let otherMemberList = [];
                                    for (let i = 1; i < numMember; i++) {
                                        otherMemberList.push({
                                            studentId: "",
                                            fmName: "",
                                            name: "",
                                            gender: "Nam",
                                            email: "",
                                            phoneNumber: "",
                                            educationType: "Chính quy",
                                            birthDate: (new Date()).toString()
                                        })
                                    }
                                    setTopic({
                                        ...topic,
                                        numMember: numMember,
                                        otherMembers: otherMemberList
                                    })
                                }
                            }}
                            defaultValue={topic.numMember}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
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
                            onChange={event => {
                                if(event){
                                    const numInstructor = parseInt(event.target.value);
                                    let instructorIdList = [];
                                    for (let i = 0; i < numInstructor; i++) {
                                        instructorIdList.push("")
                                    }
                                    setTopic({
                                        ...topic,
                                        numInstructor: numInstructor,
                                        instructorsId: instructorIdList
                                    })
                                }
                            }}
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