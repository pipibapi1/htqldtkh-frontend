import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { RootState, AppDispatch } from '../../../../store';

import { topicInput } from '../../../../shared/interfaces/topicInterface';
import { OperationTypeEnum } from '../../../../shared/types/operationType';
import { TopicMemberTypeEnum } from '../../../../shared/types/topicMemberType';
import { Instructor } from '../../../../shared/interfaces/instructorInterface';
import { AcademyRank } from '../../../../shared/types/academyRank';
import { DegreeType } from '../../../../shared/types/degreeType';

import topicService from '../../../../services/topicService';
import instructorService from '../../../../services/instructorService';
import topicConditionService from '../../../../services/topicConditionService';
import { setTopicConditionAction } from '../../../../actions/topicConditionAction';

import { topicConditionIntf } from '../../../faculty/secretary/topicConditionPage/conditionDisplay/interface';
import { logicExprIntf, relationExprIntf } from '../../../faculty/secretary/topicConditionPage/conditionDisplay/interface';
import StaticExprElement from '../../../faculty/secretary/topicConditionPage/conditionDisplay/staticExprElement';

import { getExprResult } from './getExprResult';
import OtherMembersInput from './otherMemberInput';

import BackIcon from '../../../../assets/images/🦆 icon _arrow circle left_.png';

interface Props {
    backToChoosePeriod: any,
    backToStep1: any,
    topic: topicInput,
    setTopic: any,
    setIsAtStep1: any
}

interface InfoField {
    otherMembers : {[k:string] : number},
    leader: {[k:string] : number}
}

interface DataForCondition {
    otherMembers : {[k:string] : string}[],
    leader: {[k:string] : string}
}

interface IsValid {
    topicName: boolean,
    topicCondition: boolean,
    leader: boolean,
    othersMember: boolean,
}

const RegisterStep2:React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const {backToChoosePeriod, backToStep1, topic, setTopic, setIsAtStep1} = props;

    const {expression} = useSelector((state: RootState) => state.topicCondition);
    const {user} = useSelector((state: RootState) => state.auth);
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    const [availableTypes, setAvailableTypesTopic] = useState<string[]>([]);
    console.log(availableTypes);
    
    let otherMemberDataForCondition: {[k:string] : string}[] = [];
    for (let i = 0 ; i < (topic.numMember - 1); i++) {
        otherMemberDataForCondition.push({});
    }

    const [dataForCondition, setDataForCondition] = useState<DataForCondition>({
        otherMembers: otherMemberDataForCondition,
        leader: {}
    })

    const [instructorsInfo, setInstructorsInfo] = useState<Instructor[]>([])

    const [isValid, setIsValid] = useState<IsValid>({
        topicName: true,
        topicCondition: true,
        leader: true,
        othersMember: true,
    });
    
    const short = (s: string) => {
        if(s === AcademyRank.GS) return "GS.";
        if(s === AcademyRank.PGS) return "PGS.";
        if(s === DegreeType.CN) return "CN.";
        if(s === DegreeType.ThS) return "ThS.";
        if(s === DegreeType.TS) return "TS.";

        return "";
    }

    React.useEffect(() => {
        topicConditionService.getTopicConditionByType(topic.type)
            .then((condition) => {
                const newCondition: topicConditionIntf = {
                    ...condition,
                    isLoading: false
                }
                dispatch(setTopicConditionAction(newCondition.expression))
            })
            .catch((err)=> {console.log(err)})

        instructorService.getAllInstructorsService()
            .then((data) => {
                setInstructorsInfo(data?.instructors)
            })
            .catch((err)=> {console.log(err)})
    }, [topic, dispatch])

    React.useEffect(() => {
        topicConditionService.getAvaiableTopicType(user.educationType)
            .then((types) => {
                setAvailableTypesTopic(types)
            })
    }, [user.educationType])

    let memberInfoField: InfoField = {
        otherMembers: {},
        leader: {}
    };

    Object.values(expression).forEach((ele) => {
        const subExpr = ele as (logicExprIntf | relationExprIntf);
        if ((subExpr.operator !== OperationTypeEnum.AND) && (subExpr.operator !== OperationTypeEnum.OR)) {
            const logicExpr = subExpr as logicExprIntf;
            const variableArr = logicExpr.leftExpr;
            if (logicExpr.object === TopicMemberTypeEnum.Leader) {
                variableArr.forEach((variable) => {
                    memberInfoField.leader[variable.variable] = 1;
                })
            }
            else if (logicExpr.object === TopicMemberTypeEnum.OthersMember) {
                variableArr.forEach((variable) => {
                    memberInfoField.otherMembers[variable.variable] = 1;
                })
            }
            else if (logicExpr.object === TopicMemberTypeEnum.AllMember) {
                variableArr.forEach((variable) => {
                    memberInfoField.otherMembers[variable.variable] = 1;
                    memberInfoField.leader[variable.variable] = 1;
                })
            }
        }
    })

    const leaderFieldForCheckCondition = Object.keys(memberInfoField.leader).map((field) => {
        const onChangeLeaderFieldForCondition = (event : React.ChangeEvent<HTMLInputElement>) => {
            dataForCondition.leader[field] = event.target.value;
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
                    className="w-full border border-black border-1 rounded-md p-1 w-96"
                    onChange={onChangeLeaderFieldForCondition}
                ></input>
            </div>
        )
    })

    let instructors = [];
    for (let index = 1; index <= topic.numInstructor; ++index){
        
        instructors.push(
            <div className='px-2 mb-1'>
                <div>
                    Giáo viên {index}:
                </div>
                <div className="">
                    <select
                        className="bg-white h-[40px] w-96 border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                            onChange={(e) => {
                                topic.instructorsId[index-1] = e.target.value;
                                const instructor = instructorsInfo.find((instructor) => instructor._id === e.target.value);
                                if(instructor !== undefined){
                                    topic.instructors[index-1] = instructor;
                                };
                                setTopic({
                                    ...topic
                                })
                                    
                            }}
                            defaultValue={""}
                        >
                            <option disabled value={""}>Chọn GVHD</option>
                        {
                            instructorsInfo.map((instructor) => {
                                return(
                                    <option value={instructor._id}>
                                        {short(instructor.academyRank)} {short(instructor.degree)} {instructor.name} - MSCB: {instructor.staffId}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }

    let otherMembers = [];
    for (let index = 1; index <= (topic.numMember - 1); ++index){
        otherMembers.push(
            <OtherMembersInput
                key={index}
                index={index}
                topic={topic}
                setTopic={setTopic}
                conditionField={Object.keys(memberInfoField.otherMembers)}
                dataForCondition={dataForCondition}
                setDataForCondition={setDataForCondition}
            ></OtherMembersInput>
        )
    }

    const onClickBackBtn = (event: React.MouseEvent<HTMLDivElement>) => {
        backToStep1();
    }

    const onClickConfirmBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        let checkTopicName = topic.name? true : false;

        let checkTopicCondition = getExprResult(dataForCondition, expression, "root", topic.numMember);

        let checkLeader = true;
        const leaderArrValue = Object.values(dataForCondition.leader);
        if (leaderArrValue.length !== Object.keys(memberInfoField.leader).length) {
            checkLeader = false
        }
        else {
            checkLeader = leaderArrValue.findIndex((value) => value === "") === -1;
        }

        let checkOtherMember = true;
        const otherMembersInfo = dataForCondition.otherMembers
        for (let i = 0; i < otherMembersInfo.length; i++) {
            const arrValue = Object.values(otherMembersInfo[i]);
            if ((arrValue.length !== Object.keys(memberInfoField.otherMembers).length) || 
                (arrValue.findIndex((value) => value === "") !== -1)) {
                checkOtherMember = false;
                break;
            }
            const registerInfo: string[] = Object.values(topic.otherMembers[i]);
            const hasNullValue = registerInfo.findIndex((value) => value === "") !== -1
            if (hasNullValue) {
                checkOtherMember = false;
                break;
            }
        }

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

        if (checkUnchosenInstructor && checkDuplicateInstructor && checkLeader && checkOtherMember && checkTopicCondition && checkTopicName) {
            Swal.fire({
                icon: 'question',
                title: 'Bạn chắc chắn muốn đăng ký đề tài chứ?',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'OK',
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
        setTopic({
            ...topic,
            type: e.target.value
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
                    <div className='font-bold'>
                        Tên đề tài: 
                    </div>
                    <input
                        type="text"
                        name="name"
                        className={`border ${isValid.topicName? "border-black" : "border-red-500"} border-1 rounded-md h-20 p-2 ml-2`}
                        onChange={onChangeTopicName}
                        defaultValue={topic.name}
                    />
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
                <div className='font-bold'>
                    Loại đề tài: 
                </div>
                <div className="ml-2">
                    {availableTypes.length < 0? "Chương trình đào tạo hiện tại của bạn không thể đăng ký loại đề tài nào"
                    : (
                        <select
                            className="bg-white h-[40px] w-[300px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                            onChange={onChangeTopicType}
                            defaultValue=""
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
                <div className='font-bold '>
                    Điều kiện để đăng ký loại đề tài trên: 
                </div>
                {
                    (Object.values(expression).length > 0)? (
                        <div className={`m-2 ${isValid.topicCondition? "" : "border border-1 border-red-500"}`}>
                            <StaticExprElement exprId="root"/>
                        </div>
                    ) : (
                        <div className='m-2'>
                            Loại đề tài này không yêu cầu điều kiện nào
                        </div>
                    )
                }
            </div>
            <div className='mb-5'>
                <div className='font-bold mb-2'>
                    Thông tin GVHD:
                </div>
                {instructors}
            </div>          
            <div className='mb-5'>
                <div className={`font-bold mb-2 ${isValid.leader? "" : "text-red-500"}`}>
                    Thông tin chủ nhiệm đề tài:
                </div>
                <div className='flex flex-col w-full ml-2'>
                    <div className='inline-block w-full pr-5'>
                        {(leaderFieldForCheckCondition.length > 0)? (
                            <>
                                {leaderFieldForCheckCondition}
                            </>
                        ) : (
                            "Loại đề tài này không cần thêm thông tin về chủ nhiệm đề tài"
                        )}
                    </div>
                </div>
            </div>

            <div className=''>
                <div className={`font-bold mb-2 ${isValid.othersMember?  "" : "text-red-500"}`}>
                    Thông tin thành viên khác:
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