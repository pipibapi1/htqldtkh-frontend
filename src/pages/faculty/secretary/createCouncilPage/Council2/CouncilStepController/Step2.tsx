import React from "react";

import { CouncilMemberIntf } from "../../../../../../shared/interfaces/councilInterface";
import { GenderType } from "../../../../../../shared/types/gender";
import { AcademyRank } from "../../../../../../shared/types/academyRank";
import { DegreeEnum } from "../../../../../../shared/types/degree";
import { CouncilRoleEnum } from "../../../../../../shared/types/councilRole";

import { useStepperContext } from "./StepperContext";

export default function Step2() {
    const { council, setCouncil } = useStepperContext();

    const MemberFormList = [];
    for (let idx = 0; idx < council.numMembers; idx++) {
        MemberFormList.push(
            <MemberForm
                key={idx}
                index={idx}
            ></MemberForm>
        )
    }

    const onChangeCouncilNumMember = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        if (!isNaN(value) && value >= 0) {
            const newNumMember = value>10? 10 : value;
            if (newNumMember > council.members.length) {
                while (newNumMember > council.members.length) {
                    council.members.push({
                        ...INIT_MEMBER
                    })
                }
            }
            setCouncil({
                ...council,
                numMembers: newNumMember
            })
        }
        else {
            setCouncil({
                ...council,
                numMembers: undefined
            })
        }
    }

    return (
        <div className="flex flex-col ">
            <div className="w-full mx-2 flex flex-col">
                <div className = 'mb-4 pb-2 text-xl font-normal text-gray-900 text-center'>
                    Bước 2: Thêm thành viên hội đồng
                </div>

                <div className = "mx-4 space-y-4 flex flex-col">
                    <div className = 'w-full flex flex-row items-center'>
                        <div className = "block mr-2 text-base font-medium text-gray-900">
                            Số lượng thành viên:
                        </div>
                        <input
                            className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            placeholder = "số lượng thành viên"
                            type="text"
                            value={council.numMembers}
                            onChange={onChangeCouncilNumMember}
                        />
                    </div>
                    {MemberFormList}
                </div>
                
            </div>
        </div>
    );
}

const INIT_MEMBER: CouncilMemberIntf = {
    name: "",
    gender: GenderType.MALE,
    academyRank: AcademyRank.None,
    degree: DegreeEnum.None,
    workUnit: "",
    email: "",
    phoneNumber: "",
    role: CouncilRoleEnum.UV
}

const MemberForm = (props: {index: number}) => {
    const index = props.index;
    const { council, setCouncil, error } = useStepperContext();
    const currMember = council.members[index];
    let currErr = {
        emailErr: "",
        nameErr: ""
    };
    if (index < error.memberErr.length) {
        currErr = error.memberErr[index]
    }
    
    const onChangeMemberName = (event: React.ChangeEvent<HTMLInputElement>) => {
        council.members[index].name = event.target.value;
        setCouncil({
            ...council
        })
    }

    const onChangeMemberGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
        council.members[index].gender = event.target.value;
        setCouncil({
            ...council
        })
    }

    const onChangeMemberRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
        council.members[index].role = event.target.value;
        setCouncil({
            ...council
        })
    }


    const onChangeMemberAcademyRank = (event: React.ChangeEvent<HTMLSelectElement>) => {
        council.members[index].academyRank = event.target.value;
        setCouncil({
            ...council
        })
    }

    const onChangeMemberDegree = (event: React.ChangeEvent<HTMLSelectElement>) => {
        council.members[index].degree = event.target.value;
        setCouncil({
            ...council
        })
    }
        
    const onChangeMemberEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        council.members[index].email = event.target.value;
        setCouncil({
            ...council
        })
    }
            
    const onChangeMemberPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        council.members[index].phoneNumber = event.target.value;
        setCouncil({
            ...council
        })
    }
  
    const onChangeMemberWorkUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        council.members[index].workUnit = event.target.value;
        setCouncil({
            ...council
        })
    }

    return (
        <>
            <div className = "w-full block my-2 text-base font-medium text-gray-900 border-y-2 border-black">
                Thành viên {index + 1}
            </div>
            <div className = 'flex flex-row'>
                <div className = 'w-2/3'>
                    <div className = "block mb-2 text-base font-medium text-gray-900">
                        Họ và tên:
                    </div>
                    <div className = 'w-full flex flex-col'>
                        <input  
                            className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder = "Họ và tên"
                            value={currMember.name}
                            onChange={onChangeMemberName}
                            required
                        />
                        <div className="text-sm text-red-600 p-1">
                            {currErr.nameErr}
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'flex flex-row '>
                <div className = 'w-1/2'>
                    <div  className = "block mb-2 text-base font-medium text-gray-900">
                        Giới tính:
                    </div>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={currMember.gender}
                        onChange={onChangeMemberGender}
                    >
                        {Object.values(GenderType).map((value) => {
                                    return <option value={value} key={value}>{value}</option>
                        })}
                    </select>
                </div>
                <div className = 'w-1/2 pl-2'>
                    <div className = "block mb-2 text-base font-medium text-gray-900">
                        Vai trò:
                    </div>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={currMember.role}
                        onChange={onChangeMemberRole}
                    >
                        {Object.values(CouncilRoleEnum).map((role) => (
                            <option
                                key={role}
                                value={role}
                            >{role}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className = 'flex flex-row '>
                <div className = 'w-1/2'>
                    <div className = "block mb-2 text-base font-medium text-gray-900">
                        Học hàm:
                    </div>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={currMember.academyRank}
                        onChange={onChangeMemberAcademyRank}
                    >
                        {Object.values(AcademyRank).map((rank) => (
                            <option
                                key={rank}
                                value={rank}
                            >{rank}</option>
                        ))}
                    </select>
                </div>
                <div className = 'w-1/2 pl-2'>
                    <div className = "block mb-2 text-base font-medium text-gray-900">
                        Học vị:
                    </div>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={currMember.degree}
                        onChange={onChangeMemberDegree}
                    >
                        {Object.values(DegreeEnum).map((degree) => (
                            <option
                                key={degree}
                                value={degree}
                            >{degree}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className = 'flex flex-row'>
                <div className = 'w-2/3'>
                    <div className = "block mb-2 text-base font-medium text-gray-900">
                        Email:
                    </div>
                    <div className = 'w-full flex flex-col'>
                        <input  
                            className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder = "Email"
                            value={currMember.email}
                            onChange={onChangeMemberEmail}
                            required
                        />
                        <div className="text-sm text-red-600 p-1">
                            {currErr.emailErr}
                        </div>
                    </div>
                </div>
            </div>
            <div className = 'flex flex-row'>
                <div className = 'w-2/3'>
                    <div className = "block mb-2 text-base font-medium text-gray-900">
                        Số điện thoại:
                    </div>
                    <div className = 'w-full flex flex-col'>
                        <input  
                            className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder = "Email"
                            value={currMember.phoneNumber}
                            onChange={onChangeMemberPhoneNumber}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className = 'flex flex-row'>
                <div className = 'w-2/3'>
                    <div className = "block mb-2 text-base font-medium text-gray-900">
                        Đơn vị công tác:
                    </div>
                    <input  
                        className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={currMember.workUnit}
                        placeholder = "Đơn vị công tác"
                        onChange={onChangeMemberWorkUnit}
                        required
                    />
                </div>
            </div>
        </>
    )
}