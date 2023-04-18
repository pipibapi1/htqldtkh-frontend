import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../../store";
import { updateInstructorCondition } from "../../../../../actions/topicConditionAction";
import { InstructorConditionApproveWayEnum } from "../../../../../shared/types/instructorConditionApproveWay";
import { instructorConditionIntf } from "../../../../../shared/interfaces/topicConditionInterface";
import { DegreeType } from "../../../../../shared/types/degreeType";
import { AcademyRank } from "../../../../../shared/types/academyRank";

interface props {
    isEditing: boolean
}

const InstructorCondition: React.FC<props> = (props) => {
    const {instructorCondition} = useSelector((state: RootState) => state.topicCondition);
    const condition = instructorCondition as instructorConditionIntf;

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const onChangeApproveWay = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCondition: instructorConditionIntf = {
            ...condition,
            approveWay: event.target.value
        }
        dispatch(updateInstructorCondition(newCondition))
    }

    const displayApproveWaySelect = () => {
        return (
            <select 
                className="bg-white h-[40px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2 outline-none"
                defaultValue={condition?.approveWay? condition.approveWay : ""}
                onChange={onChangeApproveWay}
            >
                {Object.values(InstructorConditionApproveWayEnum).map((type) => {
                    return (
                        <option
                            key={type}
                            value={type}
                        >{type}</option>
                    )
                })}
                <option key="" value="" hidden>Chọn đối tượng</option>
            </select>
        )
    }

    const isAcademyRankChecked = (value: string) => {
        if (condition?.academyRank) {
            const index = condition.academyRank.findIndex(ele => ele === value);
            return index !== -1
        }
        else{
            return false;
        }
    }

    const onChangeAcademyRankCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (condition?.academyRank) {
            const index = condition.academyRank.findIndex(ele => ele === value);
            if (index === -1) {
                const newAcademyRank = condition.academyRank.concat([value]);
                const newCondition: instructorConditionIntf = {
                    ...condition,
                    academyRank: newAcademyRank
                }
                dispatch(updateInstructorCondition(newCondition))
            }
            else {
                const newAcademyRank = condition.academyRank.filter(ele => ele !== value);
                const newCondition: instructorConditionIntf = {
                    ...condition,
                    academyRank: newAcademyRank
                }
                dispatch(updateInstructorCondition(newCondition))
            }
        }
        else {
            const newCondition: instructorConditionIntf = {
                ...condition,
                academyRank: [value]
            }
            dispatch(updateInstructorCondition(newCondition))
        }
    }

    const displayAcademyRankCheckBox = () => {
        return Object.values(AcademyRank)
                .map((type) => {
                    return (
                        <div className="flex flex-row" key={type}>
                            <input
                                type='checkbox'
                                id={`${type}_checkbox`}
                                value={type}
                                checked={isAcademyRankChecked(type)}
                                onChange={onChangeAcademyRankCheckbox}
                            ></input>
                            <label
                                className="mx-1"
                                htmlFor={`${type}_checkbox`}
                            >{type}</label>
                        </div>
                    )
                })
    }
    
    const onChangeDegreeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (condition?.degree) {
            const index = condition.degree.findIndex(ele => ele === value);
            if (index === -1) {
                const newDegree = condition.degree.concat([value]);
                const newCondition: instructorConditionIntf = {
                    ...condition,
                    degree: newDegree
                }
                dispatch(updateInstructorCondition(newCondition))
            }
            else {
                const newDegree = condition.degree.filter(ele => ele !== value);
                const newCondition: instructorConditionIntf = {
                    ...condition,
                    degree: newDegree
                }
                dispatch(updateInstructorCondition(newCondition))
            }
        }
        else {
            const newCondition: instructorConditionIntf = {
                ...condition,
                degree: [value]
            }
            dispatch(updateInstructorCondition(newCondition))
        }
    }
    
    const isDegreeChecked = (value: string) => {
        if (condition?.degree) {
            const index = condition.degree.findIndex(ele => ele === value);
            return index !== -1
        }
        else{
            return false;
        }
    }

    const displayDegreeCheckbox = () => {
        return Object.values(DegreeType).map((type) => {
            return (
                <div className="flex flex-row" key={type}>
                    <input
                        type='checkbox'
                        id={`${type}_checkbox`}
                        value={type}
                        checked={isDegreeChecked(type)}
                        onChange={onChangeDegreeCheckbox}
                    ></input>
                    <label
                        className="mx-1"
                        htmlFor={`${type}_checkbox`}
                    >{type}</label>
                </div>
            )
        })
    }

    const displayAcademyRank = () => {
        if (condition?.academyRank?.length) {
            const lastEle = condition.academyRank[condition.academyRank.length - 1];
            return `Học hàm: ${condition.academyRank.slice(0, condition.academyRank.length - 1).join(', ')}`
                + ` hoặc ${lastEle}`
        }
        else {
            return `Không có học hàm nào thỏa mãn`
        }
    }

    
    const displayDegree = () => {
        if (condition?.degree?.length) {
            const lastEle = condition.degree[condition.degree.length - 1];
            return `Học hàm: ${condition.degree.slice(0, condition.degree.length - 1).join(', ')}`
                + ` hoặc ${lastEle}`
        }
        else {
            return `Không có học vị nào thỏa mãn`
        }
    }

    if (props.isEditing) {
        return (
            <>
                <div className='flex font-bold'>
                    Điều kiện về học hàm, học vị của giáo viên hướng dẫn:
                </div>
                <div className="flex flex-row mx-4 items-center mb-2">
                    <div className="mx-4">
                        Số lượng giáo viên hướng dẫn phải đáp ứng điều kiện:
                    </div>
                    <div>
                        {displayApproveWaySelect()}
                    </div>
                </div>
                <div className="flex flex-row items-start">
                    <div className="flex flex-row mx-4 items-start">
                        <div className="mx-4">
                            Học hàm:
                        </div>
                        <div className="flex flex-col items-start">
                            {displayAcademyRankCheckBox()}
                        </div>
                    </div>
                    <div className="flex flex-row ml-12 items-start">
                        <div className="mx-4">
                            Học vị:
                        </div>
                        <div className="flex flex-col items-start">
                            {displayDegreeCheckbox()}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className='flex font-bold'>
                    Điều kiện về học hàm, học vị của giáo viên hướng dẫn:
                </div>
                <div className="flex flex-col mx-4 items-start">
                    <div className="mx-4 my-1">
                        Số lượng giáo viên hướng dẫn phải đáp ứng điều kiện: {condition?.approveWay}
                    </div>
                    <div className="mx-4 my-1">
                        {displayAcademyRank()}
                    </div>
                    <div className="mx-4 my-1">
                        {displayDegree()}
                    </div>
                </div>
            </>
        )
    }
}

export default InstructorCondition