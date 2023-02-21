import React from "react";
import StaticExprElement from "./staticExprElement";
import EditableExprElement from "./editableExprElement";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch} from "../../../../../store";
import { updateLeaderCondition } from "../../../../../actions/topicConditionAction";

import { EducationType } from "../../../../../shared/types/educationType";

interface props {
    isEditing: boolean
}

const ConditionDisplay: React.FC<props> = (props) => {
    const {expression, leaderCondition} = useSelector((state: RootState) => state.topicCondition);

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const isTypeChecked = (type: string) => {
        if ((leaderCondition as string[]).find((ele) => ele === type)){
            return true;
        }
        else {
            return false
        }
    }

    const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if ((leaderCondition as string[]).find(ele => ele === value)) {
            const newLeaderCondition = (leaderCondition as string[]).filter(ele => ele !== value);
            dispatch(updateLeaderCondition(newLeaderCondition));
        }
        else {
            const newLeaderCondition = (leaderCondition as string[]).map(ele => ele);
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
                <div className="flex flex-col mx-4">
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
                <div className='mb-2 font-bold'>
                    Điều kiện khác:
                </div>
                <div>
                    <EditableExprElement exprId="root"/>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className='flex font-bold'>
                    {leaderCondition?.length? (
                        `Chủ nhiệm đề tài cần thuộc chương trình đào tạo: ${leaderCondition.join(' hoặc ')}`
                    ) : (
                        "Chủ nhiệm đề tài thuộc tất cả chương trình đào tạo đều không thể đăng ký."
                    )}
                </div>
                <div className='mb-2 font-bold'>
                    Điều kiện khác:
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