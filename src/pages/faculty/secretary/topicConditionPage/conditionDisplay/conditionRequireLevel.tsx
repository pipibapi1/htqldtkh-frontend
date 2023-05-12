import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../../store";
import { updateConditionRequireLevel } from "../../../../../actions/topicConditionAction";
import { ConditionRequireLevelEnum } from "../../../../../shared/types/conditionRequireDegree";

interface props {
    isEditing: boolean
}

const ConditionRequireLevelDisplay: React.FC<props> = (props) => {
    const {requireLevel} = useSelector((state: RootState) => state.topicCondition);

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const onChangeConditionRequireLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (requireLevel !== value) {
            dispatch(updateConditionRequireLevel(value));
        }
    }

    if (props.isEditing) {
        return (
            <>
                <div className='px-2 py-2'>
                    Mức độ bắt buộc:
                </div>
                <div className='px-2 py-2 flex flex-col'>
                    {Object.values(ConditionRequireLevelEnum).map((level) => {
                        return (
                            <div className="flex flex-row px-2">
                                <input
                                    type='checkbox'
                                    id={`checkbox_${level}`}
                                    checked={level === requireLevel}
                                    onChange={onChangeConditionRequireLevel}
                                    value={level}
                                ></input>
                                <label
                                    htmlFor={`checkbox_${level}`}
                                    className="ml-2"
                                >
                                    {level}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
    else {
        if (!requireLevel || requireLevel === ConditionRequireLevelEnum.NONE)
        {
            return (
                <div className='mx-2 my-2'>
                    Mức độ bắt buộc: Không cần thỏa mãn điều kiện dưới đây.
                </div>
            )
        }
        else {
            return (
                <div className='mx-2 my-2'>
                    Mức độ bắt buộc: {requireLevel}
                </div>
            )
        }
    }
}

export default ConditionRequireLevelDisplay;