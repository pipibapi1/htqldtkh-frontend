import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../../../../../store";

import { EducationType } from "../../../../../shared/types/educationType";

import { updateLeaderCondition } from "../../../../../actions/topicConditionAction";

import StaticExprElement from "./staticExprElement";
import EditableExprElement from "./editableExprElement";
import InstructorCondition from "./instructorCondition";
import ConditionRequireLevelDisplay from "./conditionRequireLevel";

interface props {
    isEditing: boolean
}

const ConditionDisplay: React.FC<props> = (props) => {
    const {expression, leaderCondition} = useSelector((state: RootState) => state.topicCondition);
    const condition = leaderCondition as string[];

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const isTypeChecked = (type: string) => {
        if (condition.find((ele) => ele === type)){
            return true;
        }
        else {
            return false
        }
    }

    const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (condition.find(ele => ele === value)) {
            const newLeaderCondition = condition.filter(ele => ele !== value);
            dispatch(updateLeaderCondition(newLeaderCondition));
        }
        else {
            const newLeaderCondition = condition.map(ele => ele);
            newLeaderCondition.push(value);
            dispatch(updateLeaderCondition(newLeaderCondition));
        }
    }

    if (props.isEditing) {
        return (
            <>
                <div className='flex font-bold'>
                    Chương trình đào tạo của chủ nhiệm đề tài:
                </div>
                <div className="flex flex-col mx-4 mb-2">
                    {Object.values(EducationType).map((type) => {
                        return (
                            <div key={type}>
                                <input
                                    type="checkbox"
                                    id={`${type}_checkbox`}
                                    value={type}
                                    checked={isTypeChecked(type)}
                                    onChange={onChangeCheckbox}
                                ></input>
                                <label
                                    className="mx-1"
                                    htmlFor={`${type}_checkbox`}
                                >{type}</label>
                            </div>
                        )
                    })}
                </div>
                <InstructorCondition
                    isEditing={true}
                ></InstructorCondition>
                <div className='mb-2 font-bold mt-2'>
                    Điều kiện khác:
                </div>
                <ConditionRequireLevelDisplay
                    isEditing={true}
                ></ConditionRequireLevelDisplay>
                <div className='mx-2 my-2'>
                    Chi tiết điều kiện khác:
                </div>
                <div className="w-[80vw] p-2 overflow-y-auto">
                    <EditableExprElement exprId="root"/>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className='flex font-bold mb-2'>
                    {condition?.length? (
                        `Chủ nhiệm đề tài cần thuộc chương trình đào tạo: ${condition.join(' hoặc ')}`
                    ) : (
                        "Chủ nhiệm đề tài thuộc tất cả chương trình đào tạo đều không thể đăng ký."
                    )}
                </div>
                <InstructorCondition
                    isEditing={false}
                ></InstructorCondition>
                <div className='mb-2 font-bold mt-2'>
                    Điều kiện khác:
                </div>
                <ConditionRequireLevelDisplay
                    isEditing={false}
                ></ConditionRequireLevelDisplay>
                <div className='mx-2 my-2'>
                    Chi tiết điều kiện khác:
                </div>
                <div>
                    {Object.values(expression).length > 0? (
                        <StaticExprElement exprId="root"/>
                    ) : "Loại đề tài này không yêu cầu điều kiện nào"}
                </div>
            </>
        )
    }
}

export default ConditionDisplay