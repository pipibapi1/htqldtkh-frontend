import React, { useState } from "react";
import { useCouncilDetailContext } from "./CouncilDetailContext";
import CouncilService from "../../../../../../services/councilService";
import Swal from "sweetalert2";

import { CouncilMemberIntf } from "../../../../../../shared/interfaces/councilInterface";
import { GenderType } from "../../../../../../shared/types/gender";
import { AcademyRank } from "../../../../../../shared/types/academyRank";
import { DegreeEnum } from "../../../../../../shared/types/degree";
import { CouncilRoleEnum } from "../../../../../../shared/types/councilRole";

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

interface Update {
    members: CouncilMemberIntf[],
    numMembers: number | undefined
}

const AddCouncilMemberModal = ({onClose}: {onClose: any}) => {
    const { council, setCouncil } = useCouncilDetailContext();
    const [update, setUpdate] = useState<Update>({
        members: [],
        numMembers: 0
    })

    const MemberFormList = [];
    for (let idx = 0; idx < (update.numMembers? update.numMembers:0); idx++) {
        MemberFormList.push(
            <MemberForm
                key={idx}
                index={idx}
                update={update}
                setUpdate={setUpdate}
            ></MemberForm>
        )
    }

    const onChangeNumMember = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        if (!isNaN(value) && value >= 0) {
            const newNumMember = value>10? 10 : value;
            if (newNumMember > update.members.length) {
                while (newNumMember > update.members.length) {
                    update.members.push({
                        ...INIT_MEMBER
                    })
                }
                setUpdate({
                    ...update,
                    numMembers: newNumMember
                })
            }
        }
    }

    const onClickConfirmBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newMembers = update.members.slice(0, update.numMembers);
        const updateData = {
            members: council.members.concat(newMembers),
            numMembers: council.numMembers + (update.numMembers? update.numMembers:0)
        } 
        CouncilService.putUpdateCouncil(council._id as string, updateData)
            .then((data) => {
                setCouncil({
                    ...data,
                    numTopics: council.numTopics,
                    topicGeneralInfos: council.topicGeneralInfos
                });
                onClose();
            })
            .catch((data) => {
                Swal.fire({
                    icon: 'error',
                    text: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'OK'
                })
            })
    }

    return (
        <div 
            className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex flex-col justify-center items-center z-40" 
            id= "wrapper" 
        >
            <div className = "md:w-[700px] w-[90%] mx-auto max-h-[90%] bg-white rounded overflow-y-auto mx-auto">
                <div className="w-full px-2 flex flex-col">
                    <div className = 'my-4 pb-2 text-xl font-medium text-gray-900 text-center'>
                        Thêm thành viên hội đồng
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
                                defaultValue={update.numMembers}
                                onChange={onChangeNumMember}
                            />
                        </div>
                        {MemberFormList}
                    </div>

                    <div className = 'my-4 py-2 text-gray-900 text-center w-full flex flex-row justify-evenly'>
                        <button
                            className="w-24 h-12 rounded border-2 border-[#e1000e] text-[#e1000e] text-center bg-white font-medium"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button 
                            className="w-24 h-12 rounded border-2 border-[#1488d8] text-[#1488d8] text-center bg-white font-medium"
                            onClick={onClickConfirmBtn}
                        >
                            Xác nhận
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

interface MemberFormProps {
    index: number,
    update: Update,
    setUpdate: any
}

const MemberForm = (props: MemberFormProps) => {
    const {index, update, setUpdate} = props;
    const currMember = update.members[index];
    
    const onChangeMemberName = (event: React.ChangeEvent<HTMLInputElement>) => {
        update.members[index].name = event.target.value;
        setUpdate({...update});
    }

    const onChangeMemberGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
        update.members[index].gender = event.target.value;
        setUpdate({...update});
    }

    const onChangeMemberRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
        update.members[index].role = event.target.value;
        setUpdate({...update});
    }


    const onChangeMemberAcademyRank = (event: React.ChangeEvent<HTMLSelectElement>) => {
        update.members[index].academyRank = event.target.value;
        setUpdate({...update});
    }

    const onChangeMemberDegree = (event: React.ChangeEvent<HTMLSelectElement>) => {
        update.members[index].degree = event.target.value;
        setUpdate({...update});
    }
        
    const onChangeMemberEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        update.members[index].email = event.target.value;
        setUpdate({...update});
    }
         
    const onChangeMemberPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        update.members[index].phoneNumber = event.target.value;
        setUpdate({...update});
    }

    const onChangeMemberWorkUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        update.members[index].workUnit = event.target.value;
        setUpdate({...update});
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
                    <input  
                        className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder = "Họ và tên"
                        value={currMember.name}
                        onChange={onChangeMemberName}
                        required
                    />
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
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
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
                    <input  
                        className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder = "Email"
                        value={currMember.email}
                        onChange={onChangeMemberEmail}
                        required
                    />
                </div>
            </div>
            <div className = 'flex flex-row'>
                <div className = 'w-2/3'>
                    <div className = "block mb-2 text-base font-medium text-gray-900">
                        Số điện thoại:
                    </div>
                    <input  
                        className = "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder = "Số điện thoại"
                        value={currMember.phoneNumber}
                        onChange={onChangeMemberPhoneNumber}
                        required
                    />
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

export default AddCouncilMemberModal;