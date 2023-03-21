import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../../../../../../store";

import { OperationTypeEnum } from "../../../../../../shared/types/operationType";
import { TopicMemberTypeEnum } from "../../../../../../shared/types/topicMemberType";

import { updateExprTopicCondition, deleteExprTopicCondition, addExprTopicCondition } from "../../../../../../actions/topicConditionAction";

import { exprComponent, expression, logicExprIntf, relationExprIntf } from "../interface";

import { LogicalExprElement } from "./logicalExprElement";

const RelationExprElement : React.FC<exprComponent> = ({exprId}) => {
    const {expression} = useSelector((state: RootState) => state.topicCondition);
    const operator = (expression as expression)[exprId].operator;

    const leftExpr = (expression as expression)[exprId + ',l'];
    const rightExpr = (expression as expression)[exprId + ',r'];
    const isValidExpr = (leftExpr && rightExpr)? true : false;

    //for topic condition action in redux
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const onChangeSelectOperatorType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newExpr = {operator : e.target.value};
        dispatch(updateExprTopicCondition(newExpr, exprId));
    }

    const onDeleteSubExpr = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(deleteExprTopicCondition(exprId))
    }

    return (
        <div className={`flex flex-row items-center ${isValidExpr? "border-[#d9d9d9]" : "border-red-500"} border-2 rounded p-1 mx-1 my-2`}>
            <button
                className="ml-1 mr-3 pi pi-trash border border-1 border-[#1488d8] rounded p-2"
                onClick={onDeleteSubExpr}
            ></button>
            <div className="flex flex-col mx-1 my-1">
                <EditableExprElement exprId={`${exprId},l`}/>
                <div className="mx-2">
                    <select
                        className="bg-white h-[40px] w-[80px] border border-[#1488d8] border-1 rounded-lg focus:ring-blue-500 px-2"
                            defaultValue={operator}
                            onChange={onChangeSelectOperatorType}
                        >
                        <option value={OperationTypeEnum.AND}>{OperationTypeEnum.AND}</option>
                        <option value={OperationTypeEnum.OR}>{OperationTypeEnum.OR}</option>
                    </select>
                </div>
                <EditableExprElement exprId={`${exprId},r`}/>
            </div>
        </div>
    )
}

const NullExprElement : React.FC<exprComponent> = ({exprId}) => {
    //for topic condition action in redux
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const onAddExpr = (event : React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === 'logic') {
            const randomNum = (Math.floor(Math.random() * 999)).toString();
            const timeStamp = (new Date()).getTime().toString();
            const newExpr: logicExprIntf = {
                operator: OperationTypeEnum.EQUAL,
                leftExpr: [{
                    variable: "",
                    key: timeStamp.concat(randomNum),
                }],
                rightValue: "",
                object: TopicMemberTypeEnum.AllMember
            }
            console.log(newExpr)
            dispatch(addExprTopicCondition(newExpr, exprId))
        }
        else if (event.target.value === 'relate') {
            const newExpr: relationExprIntf = {
                operator: OperationTypeEnum.AND
            }
            dispatch(addExprTopicCondition(newExpr, exprId))
        }
    }

    return (
        <div>
            <select className="border border-1 border-[#1488d8] rounded p-2 mx-1 my-2"
                onChange={onAddExpr}
                defaultValue=""
            >
                <option value="" disabled hidden>Thêm biểu thức</option>
                <option value="logic">Biểu thức logic</option>
                <option value="relate">Biểu thức quan hệ</option>
            </select>
        </div>
    )
}

const EditableExprElement : React.FC<exprComponent> = ({exprId}) => {
    const {expression} = useSelector((state: RootState) => state.topicCondition);
    
    if (expression[exprId]) {
        const operator = (expression as expression)[exprId].operator;
        if (operator === OperationTypeEnum.AND || 
            operator === OperationTypeEnum.OR)
        {
            return (<RelationExprElement exprId={exprId}/>)
        }
        else {
            return (<LogicalExprElement exprId={exprId}/>)
        }
    }
    else {
        return (<NullExprElement exprId={exprId}/>)
    }
}

export default EditableExprElement;