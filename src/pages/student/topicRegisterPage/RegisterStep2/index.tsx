import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { RootState, AppDispatch } from '../../../../store';

import { topicInput } from '../../../../shared/interfaces/topicInterface';
import { OperationTypeEnum } from '../../../../shared/types/operationType';
import { TopicMemberTypeEnum } from '../../../../shared/types/topicMemberType';

import topicService from '../../../../services/topicService';
import topicConditionService from '../../../../services/topicConditionService';
import { setTopicConditionAction } from '../../../../actions/topicConditionAction';

import StaticExprElement from '../../../faculty/secretary/topicConditionPage/conditionDisplay/staticExprElement';

import { getExprResult } from './getExprResult';
import OtherMembersInput from './otherMemberInput';

import BackIcon from '../../../../assets/images/🦆 icon _arrow circle left_.png';
import { variableInfo, topicConditionIntf, logicExprIntf, relationExprIntf, instructorConditionIntf } from '../../../../shared/interfaces/topicConditionInterface';
import { VariableTypeEnum } from '../../../../shared/types/variableType';
import LeaderInfo from './leaderInfo';
import InstructorInput from './instructorInfo';
import { InstructorConditionApproveWayEnum } from '../../../../shared/types/instructorConditionApproveWay';
import { Instructor } from '../../../../shared/interfaces/instructorInterface';
import { ConditionRequireLevelEnum } from '../../../../shared/types/conditionRequireDegree';
import { TopicStatusEnum } from '../../../../shared/types/topicStatus';

interface Props {
    backToChoosePeriod: any,
    backToStep1: any,
    topic: topicInput,
    setTopic: any,
    setIsAtStep1: any
}

//variable used in topic condition
interface ConditionVar {
    otherMembers : {[k:string] : VarName},
    leader: {[k:string] : VarName}
}

//value of variable used in topic condition
interface ConditionVarData {
    otherMembers : {[k:string] : string}[],
    leader: {[k:string] : string}
}

interface IsValid {
    topicName: boolean,
    topicCondition: boolean,
    leader: boolean,
    othersMember: boolean,
}

interface VarName {
    variable: string,
    subjectName?: string,
    subjectId?: string
}

const RegisterStep2:React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const {backToChoosePeriod, backToStep1, topic, setTopic, setIsAtStep1} = props;

    const {expression, instructorCondition, requireLevel} = useSelector((state: RootState) => state.topicCondition);
    const condition = instructorCondition as instructorConditionIntf;
    const {user} = useSelector((state: RootState) => state.auth);
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    const [availableTypes, setAvailableTypesTopic] = useState<string[]>([]);
    const [conditionVar, setConditionVar] = useState<ConditionVar>({
        leader: {},
        otherMembers: {}
    })
    
    let otherMemberDataForCondition: {[k:string] : string}[] = [];
    for (let i = 0 ; i < (topic.numMember - 1); i++) {
        otherMemberDataForCondition.push({});
    }
    const [dataForCondition, setDataForCondition] = useState<ConditionVarData>({
        otherMembers: otherMemberDataForCondition,
        leader: {}
    })

    const [isValid, setIsValid] = useState<IsValid>({
        topicName: true,
        topicCondition: true,
        leader: true,
        othersMember: true,
    });

    //update register condition when topic type change
    useEffect(() => {
        if (topic.type !== "") {
            topicConditionService.getTopicConditionByType(topic.type)
                .then((condition) => {
                    const newCondition: topicConditionIntf = {
                        ...condition,
                        isLoading: false
                    }
                    dispatch(setTopicConditionAction(newCondition.expression, newCondition.instructorCondition, newCondition.leaderCondition, newCondition.requireLevel))
                })
                .catch((err)=> {console.log(err)});
            setIsValid({
                topicName: true,
                topicCondition: true,
                leader: true,
                othersMember: true,
            })
        }
        else {
            dispatch(setTopicConditionAction({}, {}, []))
        }
    }, [topic.type, dispatch])

    //update available topic type for user
    useEffect(() => {
        topicConditionService.getAvaiableTopicType(user.educationType)
            .then((types) => {
                setAvailableTypesTopic(types)
            })
    }, [user.educationType])

    //update condition variable
    useEffect(() => {
        let memberInfoField: ConditionVar = {
            otherMembers: {},
            leader: {}
        };
        if (requireLevel !== ConditionRequireLevelEnum.NONE) {
            Object.values(expression).forEach((ele) => {
                const subExpr = ele as (logicExprIntf | relationExprIntf);
                // only find in logical expression
                if ((subExpr.operator !== OperationTypeEnum.AND) && (subExpr.operator !== OperationTypeEnum.OR)) {
                    const logicExpr = subExpr as logicExprIntf;
                    const variableArr: variableInfo[] = logicExpr.leftExpr;
                    if (logicExpr.object.name === TopicMemberTypeEnum.Leader) {
                        variableArr.forEach((variable) => {
                            if (variable.variable === VariableTypeEnum.SUBJECT_MARK) {
                                memberInfoField.leader[variable.subjectId as string] = variable;
                            }
                            else {
                                memberInfoField.leader[variable.variable] = variable;
                            }
                        })
                    }
                    else if (logicExpr.object.name === TopicMemberTypeEnum.OthersMember) {
                        variableArr.forEach((variable) => {
                            if (variable.variable === VariableTypeEnum.SUBJECT_MARK) {
                                memberInfoField.otherMembers[variable.subjectId as string] = variable;
                            }
                            else {
                                memberInfoField.otherMembers[variable.variable] = variable;
                            }
                        })
                    }
                    else if (logicExpr.object.name === TopicMemberTypeEnum.AllMember 
                        || logicExpr.object.name === TopicMemberTypeEnum.NumMember) {
                        variableArr.forEach((variable) => {
                            if (variable.variable === VariableTypeEnum.SUBJECT_MARK) {
                                memberInfoField.leader[variable.subjectId as string] = variable;
                                memberInfoField.otherMembers[variable.subjectId as string] = variable;
                            }
                            else {
                                memberInfoField.otherMembers[variable.variable] = variable;
                                memberInfoField.leader[variable.variable] = variable;
                            }
                        })
                    }
                }
            })
        }
        setConditionVar(memberInfoField);
    }, [expression])

    let instructors = [];
    for (let index = 1; index <= topic.numInstructor; ++index){
        instructors.push(
            <div className='px-2 mb-1'>
                <InstructorInput
                    index={index-1}
                    topic={topic}
                    setTopic={setTopic}
                ></InstructorInput>
            </div>
        )
    }

    let otherMembers = [];
    for (let index = 0; index < (topic.numMember - 1); ++index){
        otherMembers.push(
            <OtherMembersInput
                key={index}
                index={index}
                topic={topic}
                setTopic={setTopic}
                conditionField={conditionVar.otherMembers}
                dataForCondition={dataForCondition}
                setDataForCondition={setDataForCondition}
            ></OtherMembersInput>
        )
    }

    const displayRegisterCondition = () => {
        // when choose topic type
        if (topic.type === "") {
            return null;
        }

        //when require level is none
        if (!requireLevel || requireLevel === ConditionRequireLevelEnum.NONE) {
            return (
                <div className='m-2'>
                    Loại đề tài này không yêu cầu điều kiện nào
                </div>
            )
        }

        //when require level is different from none
        if (Object.values(expression).length > 0) {
            if (requireLevel === ConditionRequireLevelEnum.NEED_APPROVED) {
                return (
                    <>
                        <div className='m-2 italic'>
                            {
                                `Ghi chú: Các trường hợp không thỏa mãn điều kiện dưới đây `
                                + `vẫn có thể đăng ký đề tài. Tuy nhiên các đề tài này cần `
                                + `được thư ký khoa chấp thuận.`
                            }
                        </div>
                        <div className={`m-2 ${isValid.topicCondition? "" : "border border-1 border-red-500 rounded"}`}>
                            <StaticExprElement exprId="root"/>
                        </div>
                    </>
                )
            }
            else {
                return (
                    <>
                        <div className='m-2 italic'>
                            {
                                "Ghi chú: Các đề tài cần thỏa mãn điều kiện dưới đây. Các "
                                + "trường hợp không thỏa mãn sẽ không được chấp nhận."
                            }
                        </div>
                        <div className={`m-2 ${isValid.topicCondition? "" : "border border-1 border-red-500 rounded"}`}>
                            <StaticExprElement exprId="root"/>
                        </div>
                    </>
                )
            }
        }

        //when has no expression
        else {
            return (
                <div className='m-2'>
                    Loại đề tài này không yêu cầu điều kiện nào
                </div>
            )
        }
    }

    const onClickBackBtn = (event: React.MouseEvent<HTMLDivElement>) => {
        backToStep1();
    }

    const checkOtherMembers = () => {        
        let checkOtherMember = true;
        const otherMembersInfo = dataForCondition.otherMembers
        for (let i = 0; i < otherMembersInfo.length; i++) {
            const arrValue = Object.values(otherMembersInfo[i]);
            if ((arrValue.length !== Object.keys(conditionVar.otherMembers).length) || 
                (arrValue.findIndex((value) => value === "") !== -1)) {
                checkOtherMember = false;
                break;
            }
            const hasNullValue = topic.otherMembers[i].studentId === "";
            if (hasNullValue) {
                checkOtherMember = false;
                break;
            }
        }
        return checkOtherMember;
    }

    const checkDuplicatedInstructor = () => {
        let checkDuplicateInstructor = true;
        for(let i = 0; i < topic.instructorsId.length; i++){
            const instructorId = topic.instructorsId[i];
            for (let y = i + 1; y < topic.instructorsId.length; y++){
                if(topic.instructorsId[y] === instructorId){
                    checkDuplicateInstructor = false;
                    break
                }
            }
            if(checkDuplicateInstructor) break
        }
        return checkDuplicateInstructor;
    }

    // check whether instructor satisfied instructor condition (except approve way)
    const isInstructorSatified = (instructor : Instructor) => {
        const validAcademyRank = condition.academyRank;
        const validDegree = condition.degree;
        if (!validAcademyRank || !validDegree) {
            return false
        }
        else {
            const isValidAcademyRank = validAcademyRank.findIndex(ele => ele === instructor.academyRank) > -1;
            const isValidDegree = validDegree.findIndex(ele => ele === instructor.degree) > -1;
            return isValidAcademyRank && isValidDegree;
        }
    }
    // check whether instructors list satisfied instructor condition
    const isSatisfiedInstructorCondition = () => {
        if (instructorCondition.approveWay === InstructorConditionApproveWayEnum.AT_LEAST_1) {
            for (let index in topic.instructors) {
                const currInstructor = topic.instructors[index];
                if (isInstructorSatified(currInstructor)) {
                    return true;
                }
            }
            return false;
        }
        //in case approve way is all instructor
        else if (instructorCondition.approveWay === InstructorConditionApproveWayEnum.ALL) {
            for (let index in topic.instructors) {
                const currInstructor = topic.instructors[index];
                if (!isInstructorSatified(currInstructor)) {
                    return false;
                }
            }
            return true;
        }
        return false
    }

    const onClickConfirmBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        let checkTopicName = topic.name? true : false;

        let checkTopicCondition;
        if (requireLevel && (requireLevel !== ConditionRequireLevelEnum.NONE)) {
            checkTopicCondition = getExprResult(dataForCondition, expression, "root", topic.numMember);
        }
        // when require level is none
        else {
            checkTopicCondition = true
        }                    

        let checkLeader = true;
        const leaderArrValue = Object.values(dataForCondition.leader);
        if (leaderArrValue.length !== Object.keys(conditionVar.leader).length) {
            checkLeader = false
        }
        else {
            checkLeader = leaderArrValue.findIndex((value) => value === "") === -1;
        }
        let checkOtherMember = checkOtherMembers();
        let checkDuplicateInstructor = checkDuplicatedInstructor();
        let checkUnchosenInstructor = true;
        for(let i = 0; i < topic.instructorsId.length; i++){
            if(topic.instructorsId[i] === ""){
                checkUnchosenInstructor = false;
                break
            }
        }
        setIsValid({
            topicName: checkTopicName,
            topicCondition: checkTopicCondition,
            leader: checkLeader,
            othersMember: checkOtherMember
        })
        let checkSastifiedInstructor = isSatisfiedInstructorCondition()
        const valid = checkUnchosenInstructor && checkDuplicateInstructor 
                        && checkLeader && checkOtherMember && checkTopicCondition 
                        && checkTopicName && checkSastifiedInstructor;
        if (requireLevel === ConditionRequireLevelEnum.NEED_APPROVED  && !checkTopicCondition) {
            Swal.fire({
                icon: 'warning',
                title: 'Đề tài của bạn không thỏa mãn các điều kiện khác. '
                    + 'Bạn vẫn có thể đăng ký, tuy nhiên đề tài này cần chờ '
                    + 'sự cho phép của thư ký khoa',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) {
                    topicService.postNewTopic({
                            ...topic,
                            status: TopicStatusEnum.WAIT_APPROVED
                        })
                        .then((data) => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Đăng ký thành công',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                            })
                            .then((result) => {
                                navigate("/myTopic");
                            })
                        })
                }
            })
        }
        else if (valid) {
            Swal.fire({
                icon: 'question',
                title: 'Bạn chắc chắn muốn đăng ký đề tài chứ?',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) {
                    topicService.postNewTopic(topic)
                        .then((data) => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Đăng ký thành công',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                            })
                            .then((result) => {
                                navigate("/myTopic");
                            })
                        })
                }
            })
        }
        else if(!checkUnchosenInstructor){
            Swal.fire({
                icon: 'error',
                title: 'Vui lòng chọn đủ GVHD!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
            })
        }
        else if(!checkDuplicateInstructor){
            Swal.fire({
                icon: 'error',
                title: 'Các GVHD bị trùng lặp, vui lòng chọn lại!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
            })
        }
        else if (!checkSastifiedInstructor) {
            Swal.fire({
                icon: 'error',
                title: 'Danh sách GVHD không đáp ứng yêu cầu về học hàm, học vị!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Dữ liệu không phù hợp hoặc bị thiếu. Vui lòng thử lại sau.',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
            })
        }
    }

    const onClickCancelBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsAtStep1(true);
        Swal.fire({
            icon: 'question',
            title: 'Bạn chắc chắn muốn hủy chứ? Dữ liệu bản đã nhập sẽ không được lưu.',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'OK',
        }).then((result) => {
            if (result.isConfirmed) {
                backToChoosePeriod();
            }
        })
    }

    const onChangeTopicType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newOtherMembers = topic.otherMembers.map((member) => {
            return {
                studentId: "",
                name: "",
                gender: "",
                email: "",
                phoneNumber: "",
                educationType: "",
                birthDate: ""
            }
        })
        setTopic({
            ...topic,
            type: e.target.value,
            otherMembers: newOtherMembers
        });
        setDataForCondition({
            otherMembers: otherMemberDataForCondition,
            leader: {}
        });
    }

    const onChangeTopicName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTopic({
            ...topic,
            name: event.target.value
        })
    }

    return (
        <div className='px-5 py-3 min-h-[630px] overflow-hidden'>
            <div
                className='hover:cursor-pointer w-fit' 
                onClick={onClickBackBtn}
            >
                <img src={BackIcon} className='h-5' alt="" />
            </div>
            <div className='flex justify-between mb-2 mt-3'>
                <div className='flex flex-col w-2/3'>
                    <div className='font-bold text-lg'>
                        Tên đề tài: 
                    </div>
                    <input
                        type="text"
                        name="name"
                        className={`border ${isValid.topicName? "border-black" : "border-red-500"} border-1 rounded-md h-20 p-2 ml-2`}
                        onChange={onChangeTopicName}
                        defaultValue={topic.name}
                    />
                    {!(isValid.topicName) && (
                        <div className='text-[#e1000e] ml-2 mt-1'>
                            <i>Tên đề tài không được bỏ trống </i>
                        </div>
                    )}
                </div>
                <div className=''>
                    <div>
                        <button 
                            className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 mb-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                            onClick={onClickConfirmBtn}
                        >
                            Đăng ký
                        </button>
                    </div>
                    <div>
                        <button 
                            className="w-40 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#B20610] hover:cursor-pointer"
                            onClick={onClickCancelBtn}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
            <div className='mb-3'>
                <div className='font-bold text-lg'>
                    Loại đề tài: 
                </div>
                <div className="ml-2">
                    {availableTypes.length < 0? "Chương trình đào tạo hiện tại của bạn không thể đăng ký loại đề tài nào"
                    : (
                        <select
                            className="bg-white h-[40px] w-[300px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                            onChange={onChangeTopicType}
                            defaultValue={topic.type}
                        >
                            <option value="" disabled hidden>Chọn loại đề tài</option>
                            {availableTypes.map((type) => {
                                return (
                                    <option value={type} key={type}>{type}</option>
                                )
                            })}
                        </select>
                    )}
                </div>
            </div>
            <div className='mb-3'>
                <div className='flex font-bold text-lg'>
                    Điều kiện về học hàm, học vị của giáo viên hướng dẫn:
                </div>
                {condition?.approveWay && (
                    <div className="flex flex-col mx-4 items-start">
                        <div className="mx-4 my-1">
                            Số lượng giáo viên hướng dẫn phải đáp ứng điều kiện: {condition?.approveWay}
                        </div>
                        <div className="mx-4 my-1">
                            {condition?.academyRank?.length? (
                                `Học hàm: ${condition?.academyRank?.join(' hoặc ')}`
                            ) : (
                                `Không có học hàm nào thỏa mãn`
                            )}
                        </div>
                        <div className="mx-4 my-1">
                            {condition?.degree?.length? (
                                `Học vị: ${condition?.degree?.join(' hoặc ')}`
                            ) : (
                                `Không có học vị nào thỏa mãn`
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className='mb-3'>
                <div className='font-bold text-lg'>
                    Điều kiện khác để đăng ký loại đề tài trên: 
                </div>
                {!(isValid.topicCondition) && (
                    <div className="m-2 text-[#e1000e]">
                        <i>
                            Thông tin chủ nhiệm đề tài và thành viên không thỏa mãn điều kiện đăng ký loại đề tài này
                        </i>
                    </div>
                )}
                {displayRegisterCondition()}
            </div>
            <div className='mb-5'>
                <div className='font-bold mb-2 text-lg'>
                    Thông tin GVHD:
                </div>
                {instructors}
            </div>          
            <div className='mb-4'>
                <div className={`font-bold text-lg ${isValid.leader? "" : "text-red-500"}`}>
                    Thông tin chủ nhiệm đề tài:
                </div>
                <div className='flex flex-col w-full ml-2'>
                    <LeaderInfo
                        conditionField={conditionVar.leader}
                        dataForCondition={dataForCondition}
                        setDataForCondition={setDataForCondition}
                    ></LeaderInfo>
                </div>
            </div>

            <div className=''>
                <div className={`font-bold text-lg ${isValid.othersMember?  "" : "text-red-500"}`}>
                    Thông tin thành viên khác:
                </div>
                {!isValid.othersMember && (
                    <div className='px-4 mb-2 text-red-500'>
                        <i>Thông tin của thành viên khác không thỏa mãn điều kiện đăng ký đề tài</i>
                    </div>
                )}
                <div className='px-4 mb-2'>
                    <i>Để nhập thông tin thành viên, chủ nhiệm đề tài cần nhập cả mã số sinh viên 
                        và email trường của thành viên, sau đó nhấn nút "Tìm thông tin" </i>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='inline-block w-full pr-5'>
                        {otherMembers}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterStep2;