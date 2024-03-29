import { FC, useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';

import { AppDispatch, RootState } from '../../../../store';

import { OperationTypeEnum } from '../../../../shared/types/operationType';
import { TopicTypeEnum } from '../../../../shared/types/topicType';

import topicConditionService from '../../../../services/topicConditionService';

import { setTopicConditionAction } from '../../../../actions/topicConditionAction';

import ConditionDisplay from './conditionDisplay';
import { expression, topicConditionIntf, logicExprIntf, relationExprIntf} from '../../../../shared/interfaces/topicConditionInterface';
import { VariableTypeEnum } from '../../../../shared/types/variableType';

const FSTopicConditionEditor: FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [type, setType] = useState<string>(Object.values(TopicTypeEnum)[0]);
    const [topicCondition, setTopicCondition] = useState<topicConditionIntf>({isLoading: true});

    const {expression, leaderCondition, instructorCondition, requireLevel} = useSelector((state: RootState) => state.topicCondition);
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch();

    const onClickBtnEdit = (e : MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!topicCondition.isLoading) {
            setIsEditing(true);
        }
    }

    const onClickBtnCancelEdit = (e : MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setTopicCondition({
            ...topicCondition,
            isLoading: true
        })
        setIsEditing(false);
    }

    const onChangeTopicType = (e : ChangeEvent<HTMLSelectElement>) => {
        if (isEditing) {
            e.preventDefault();
        }
        else {
            setType(e.target.value);
        }
    }

    useEffect(() => {
        if (!isEditing) {
            topicConditionService.getTopicConditionByType(type)
                .then((condition) => {
                    const newCondition: topicConditionIntf = {
                        ...condition,
                        isLoading: false
                    }
                    setTopicCondition(newCondition);
                    dispatch(setTopicConditionAction(newCondition.expression, newCondition.instructorCondition, newCondition.leaderCondition, newCondition.requireLevel))
                })
                .catch((err)=> {console.log(err)})
        }
    }, [type, dispatch, isEditing])

    const checkValidTopicCondition = () => {
        let isValid = true;
        for (let key in expression as expression) {
            const subExpr = expression[key] as (logicExprIntf | relationExprIntf);
            //relational expression is not valid if missing left or right child expression 
            if (subExpr.operator === OperationTypeEnum.AND || subExpr.operator === OperationTypeEnum.OR) {
                const leftExpr = expression[key + ',l'];
                const rightExpr = expression[key + ',r'];
                if (!leftExpr || !rightExpr) {
                    isValid = false;
                    break;
                }
            }

            //check whether logical expression is valid or not
            else {
                const currExpr = subExpr as  logicExprIntf;
                //missing right value to compare
                if (!currExpr.rightValue) {
                    isValid = false;
                    break;
                }
                //not have any variable
                else if (currExpr.leftExpr.length === 0) {
                    isValid = false;
                    break;
                }
                //has at least 1 variable invalid
                else {
                    const indexOfErrVariable = currExpr.leftExpr.findIndex((variable) => {
                        if (variable.variable === VariableTypeEnum.SUBJECT_MARK) {
                            return !(variable.variable && variable.subjectId && variable.subjectName)
                        }
                        else {
                            return !(variable.variable)
                        }
                    })
                    if (indexOfErrVariable !== -1) {
                        isValid = false;
                    }
                }
            }
        }
        return isValid;
    }

    const onClickConfirmBtn = (event : MouseEvent<HTMLButtonElement>) => {
        if (checkValidTopicCondition()) {
            topicConditionService.postTopicCondition({
                expression: expression as expression,
                type: type,
                leaderCondition: leaderCondition,
                instructorCondition: instructorCondition,
                requireLevel: requireLevel
            }).then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        setIsEditing(false);
                    } 
                })
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Cập nhật không thành công. Một số dữ liệu bị thiếu và được đánh dấu màu đỏ. Vui lòng điền dữ liệu còn thiếu và thử lại sau',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
            })
        }
    }

    return (
        <div className='px-5 py-5 flex flex-col'>
            <div className='flex flex-row items-start justify-start w-full'>
                <div className='flex flex-col items-start mr-5'>
                    <div className='flex flex-row items-center'>
                        <div className='mr-5'>
                            Loại đề tài:
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                onChange={onChangeTopicType}
                                value={type}
                                disabled={isEditing}
                                data-testid="topic-type-select"
                            >
                                {Object.values(TopicTypeEnum).map((type) => {
                                    return (
                                        <option value={type} key={type}>{type}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='mt-2'>
                        Chỉnh sửa lần cuối: {topicCondition.isLoading? ("loading...") 
                        : (
                            topicCondition.createAt? (new Date(topicCondition.createAt as string).toLocaleDateString()) : ""
                        )}
                    </div>
                </div>
                <div className='flex flex-row'>
                    {!isEditing? (
                        <button 
                            className='button bg-[#1488d8] w-32 py-2 rounded-lg text-white'
                            onClick={onClickBtnEdit}
                            data-testid="edit-btn"
                        >
                            Chỉnh sửa
                        </button>
                    ) : (
                        <>
                            <button 
                                className='button bg-[#1488d8] w-32 py-2 rounded-lg text-white mr-4'
                                onClick={onClickBtnCancelEdit}
                            >
                                Hủy
                            </button>
                            <button className='button bg-[#1488d8] w-32 py-2 rounded-lg text-white'
                                onClick={onClickConfirmBtn}
                            >
                                Xác nhận
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className='mt-4'>
                {topicCondition.isLoading? ("loading...")
                : (<ConditionDisplay isEditing={isEditing}/>)} 
            </div>
        </div>
    )
}

export default FSTopicConditionEditor;