import React, { ChangeEvent } from "react";
import { exprComponent, expression, logicExprIntf} from "../interface";
import { OperationTypeEnum } from "../../../../../../shared/types/operationType";
import { TopicMemberTypeEnum } from "../../../../../../shared/types/topicMemberType";
import { VariableElement } from "./variableElement";

//for topic condition action in redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../../../store";
import { updateExprTopicCondition, 
    deleteExprTopicCondition 
} from "../../../../../../actions/topicConditionAction";

interface variableIntf {
    key: string,
    variable: string,
    weight?: number
}

type variableArrAction = (arr: variableIntf[]) => variableIntf[]

export const LogicalExprElement : React.FC<exprComponent> = ({exprId}) => {
    const {expression} = useSelector((state: RootState) => state.topicCondition);
    const subExpr = (expression as expression)[exprId] as logicExprIntf;
    const variableArr = subExpr.leftExpr;

    let isValidExpr = true;
    const isValidRightValue = subExpr.rightValue? true : false;
    if (!isValidRightValue) {
        isValidExpr = false;
    }
    else if (variableArr.length === 0) {
        isValidExpr = false;
    }
    else {
        const indexOfErrVariable = variableArr.findIndex((variable) => {
            return !(variable.variable)
        })
        if (indexOfErrVariable !== -1) {
            isValidExpr = false;
        }
    }

    //for topic condition action in redux
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const onChangeOperatorType = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSubExpr: logicExprIntf = {
            ...subExpr,
            operator: event.target.value
        };
        dispatch(updateExprTopicCondition(newSubExpr, exprId));
    }

    const onChangeTopicMemberType = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSubExpr: logicExprIntf = {
            ...subExpr,
            object: event.target.value
        };
        dispatch(updateExprTopicCondition(newSubExpr, exprId));
    }

    const onChangeRightValueInput = (event: ChangeEvent<HTMLInputElement>) => {
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
        const newVariable = {
            variable: "",
            weight: 1,
            key: timeStamp.concat(randomNum)
        }
        const newVariableArr: variableIntf[] = variableArr.concat([newVariable]);
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
        <div className={`flex flex-row items-center ${isValidExpr? "border-[#d9d9d9]" : "border-red-500"} border-2 rounded p-2 mx-1 my-2`}>
            <button
                className="ml-1 mr-3 pi pi-trash border border-1 border-[#1488d8] rounded p-2"
                onClick={onDeleteSubExpr}
            ></button>
            <div className="mx-1 flex flex-col items-center">
                <div className="mb-1">
                    Tổng của:
                </div>
                {variableArr.map((variable) => {
                    return (
                        <VariableElement
                            key={variable.key}
                            keyId={variable.key}
                            variable={variable.variable} 
                            weight={variable.weight}
                            onUpdate={onUpdateVariableArr}
                        />
                    )
                })}
                <div className="mt-1">
                    <button
                        className="bg-white h-[40px] w-[80px] border border-[#1488d8] border-1 rounded-lg focus:ring-blue-500 px-1"
                        onClick={onClickAddVariable}
                    >
                        Thêm
                    </button>
                </div>
            </div>
            <div className="mx-1">
                của
            </div>
            <div className="mx-1">
                <select
                    className="bg-white h-[40px] w-[180px] border border-[#1488d8] border-1 rounded-lg focus:ring-blue-500 px-1"
                    value={subExpr.object}
                    onChange={onChangeTopicMemberType}
                >
                    {Object.values(TopicMemberTypeEnum).map((type) => {
                        return (
                            <option 
                                value={type}
                                key={type}
                            >
                                {type}
                            </option>
                        )
                    })}
                </select>
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
                <input
                    className={`bg-white h-[40px] w-[160px] border ${isValidRightValue? "border-[#1488d8]" : "border-red-500"} border-1 rounded-lg focus:ring-blue-500 px-1`}
                    defaultValue={subExpr.rightValue}
                    placeholder="Giá trị dùng để so sánh"
                    onChange={onChangeRightValueInput}
                ></input>
            </div>
        </div>
    )
}