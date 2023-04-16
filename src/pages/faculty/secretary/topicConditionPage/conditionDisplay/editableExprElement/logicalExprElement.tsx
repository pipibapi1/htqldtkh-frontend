import React, { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../../../store";
import { OperationTypeEnum } from "../../../../../../shared/types/operationType";
import { TopicMemberTypeEnum } from "../../../../../../shared/types/topicMemberType";
import { updateExprTopicCondition, deleteExprTopicCondition } from "../../../../../../actions/topicConditionAction";
import { exprComponent } from "../interface";
import { TopicMemberSelect } from "./topicMemberSelect";
import { VariableElement } from "./variableElement";
import { variableInfo, expression, logicExprIntf } from "../../../../../../shared/interfaces/topicConditionInterface";
import { VariableTypeEnum } from "../../../../../../shared/types/variableType";
import { EducationType } from "../../../../../../shared/types/educationType";

type variableArrAction = (arr: variableInfo[]) => variableInfo[]

export const LogicalExprElement : React.FC<exprComponent> = ({exprId}) => {
    const {expression} = useSelector((state: RootState) => state.topicCondition);
    const subExpr = (expression as expression)[exprId] as logicExprIntf;
    const variableArr = subExpr.leftExpr;

    const isValidRightValue = subExpr.rightValue? true : false;
    const isValidExpr = () => {
        if (!isValidRightValue) {
            return false;
        }
        else if (variableArr.length === 0) {
            return false;
        }
        else {
            const indexOfErrVariable = variableArr.findIndex((variable) => {
                if (variable.variable === VariableTypeEnum.SUBJECT_MARK) {
                    return !(variable.variable && variable.subjectId && variable.subjectName)
                }
                else {
                    return !(variable.variable)
                }
            })
            if (indexOfErrVariable !== -1) {
                return false;
            }
        }
        return true;
    }

    //for topic condition action in redux
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const valueForCompareInput = () => {
        if (variableArr[0].variable === VariableTypeEnum.EDUCATION_TYPE) {
            return (
                <select
                    className={`bg-white h-[40px] border ${subExpr.rightValue? 'border-[#1488d8]':'border-[#e1000e]'} border-1 rounded-lg px-1 mx-1`}
                    defaultValue={subExpr.rightValue}
                    onChange={onChangeRightValueInput}
                >
                    {Object.values(EducationType).map((type) => {
                        return (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        )
                    })}
                    <option value="" hidden>Chọn</option>
                </select>
            )
        }
        else {
            return (
                <input
                    className={`bg-white h-[40px] w-[160px] border ${isValidRightValue? "border-[#1488d8]" : "border-red-500"} border-1 rounded-lg focus:ring-blue-500 px-1`}
                    defaultValue={subExpr.rightValue}
                    placeholder="Giá trị so sánh"
                    onChange={onChangeRightValueInput}
                ></input>
            )
        }
    }

    const onChangeOperatorType = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSubExpr: logicExprIntf = {
            ...subExpr,
            operator: event.target.value
        };
        dispatch(updateExprTopicCondition(newSubExpr, exprId));
    }

    const onChangeRightValueInput = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const newSubExpr: logicExprIntf = {
            ...subExpr,
            rightValue: event.target.value
        };
        dispatch(updateExprTopicCondition(newSubExpr, exprId));
    }

    const onUpdateVariableArr = (action: variableArrAction) => {
        const newVariableArr = action(variableArr);
        const newExpr: logicExprIntf = {
            ...subExpr,
            leftExpr: newVariableArr
        }
        dispatch(updateExprTopicCondition(newExpr, exprId))
    }

    const onClickAddVariable = (event: React.MouseEvent<HTMLButtonElement>) => {
        const randomNum = (Math.floor(Math.random() * 999)).toString();
        const timeStamp = (new Date()).getTime().toString();
        const newVariable: variableInfo = {
            variable: "",
            weight: 1,
            key: timeStamp.concat(randomNum)
        }
        const newVariableArr: variableInfo[] = variableArr.concat([newVariable]);
        const newSubExpr: logicExprIntf = {
            ...subExpr,
            leftExpr: newVariableArr
        }
        dispatch(updateExprTopicCondition(newSubExpr, exprId));
    }

    const onDeleteSubExpr = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteExprTopicCondition(exprId))
    }

    return (
        <div className={`flex flex-row items-center ${isValidExpr()? "border-[#d9d9d9]" : "border-red-500"} w-fit border-2 rounded p-2 mx-1 my-2`}>
            <button
                className="ml-1 mr-3 pi pi-trash border border-1 border-[#1488d8] rounded p-2"
                onClick={onDeleteSubExpr}
            ></button>
            <div className="mx-1 flex flex-row">
                <TopicMemberSelect
                    exprId={exprId}
                    subExpr={subExpr}
                ></TopicMemberSelect>
            </div>
            <div className="mx-1">
                có
            </div>
            <div className="mx-1 flex flex-col items-center">
                <div className={`mb-1 ${variableArr.length>1? '': 'hidden'}`}>
                    Tổng:
                </div>
                {variableArr.map((variable) => {
                    return (
                        <VariableElement
                            key={variable.key}
                            keyId={variable.key}
                            variable={variable}
                            onUpdate={onUpdateVariableArr}
                        />
                    )
                })}
                <div className="mt-1">
                    { (variableArr.length===0 || variableArr[0].variable !== VariableTypeEnum.EDUCATION_TYPE)
                     && (
                        <button
                            className="bg-white h-[40px] w-[80px] border border-[#1488d8] border-1 rounded-lg focus:ring-blue-500 px-1"
                            onClick={onClickAddVariable}
                        >
                            Thêm
                        </button>
                    )}
                </div>
            </div>
            <div className="mx-1">
                <select
                    className="bg-white h-[40px] w-[180px] border border-[#1488d8] border-1 rounded-lg focus:ring-blue-500 px-1"
                    value={subExpr.operator}
                    onChange={onChangeOperatorType}
                >
                    <option value={OperationTypeEnum.DIFFERENT}>{OperationTypeEnum.DIFFERENT}</option>
                    <option value={OperationTypeEnum.EQUAL}>{OperationTypeEnum.EQUAL}</option>
                    <option value={OperationTypeEnum.LESS}>{OperationTypeEnum.LESS}</option>
                    <option value={OperationTypeEnum.GREATER}>{OperationTypeEnum.GREATER}</option>
                    <option value={OperationTypeEnum.LE}>{OperationTypeEnum.LE}</option>
                    <option value={OperationTypeEnum.GE}>{OperationTypeEnum.GE}</option>
                </select>
            </div>
            <div className="mx-1">
                {valueForCompareInput()}
            </div>
        </div>
    )
}