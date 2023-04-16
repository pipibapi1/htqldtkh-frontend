import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../../../../store";

import { OperationTypeEnum } from "../../../../../../shared/types/operationType";

import { exprComponent } from "../interface";
import { expression, logicExprIntf  } from "../../../../../../shared/interfaces/topicConditionInterface";
import { VariableTypeEnum } from "../../../../../../shared/types/variableType";

const RelationExprElement : React.FC<exprComponent> = ({exprId}) => {
    const {expression} = useSelector((state: RootState) => state.topicCondition);
    const operator = (expression as expression)[exprId].operator;
    return (
        <div className="flex flex-col border-[#d9d9d9] border-2 rounded p-2 overflow-y-auto w-full">
            <StaticExprElement exprId={`${exprId},l`}/>
            <div className="mx-2">
                {operator}
            </div>
            <StaticExprElement exprId={`${exprId},r`}/>
        </div>
    )
}

const LogicalExprElement : React.FC<exprComponent> = ({exprId}) => {
    const {expression} = useSelector((state: RootState) => state.topicCondition);
    const subExpr = (expression as expression)[exprId] as logicExprIntf;
    const variableArr = subExpr.leftExpr;
    return (
        <div className="flex flex-row items-center border-[#d9d9d9] border-2 rounded pl-3 pr-2 py-4 w-full overflow-y-auto">
            <div className="bg-[#d9d9d9] rounded mx-1 p-1">
                {subExpr.object.quantity? `${subExpr.object.compare} ${subExpr.object.quantity} ${subExpr.object.name}`
                : subExpr.object.name}
            </div>
            <div className="mx-1 p-1">
                có
            </div>
            <div className="bg-[#d9d9d9] rounded mx-1 p-1">
                <p>
                    {variableArr.map((variable) => {
                        let variableStr;
                        if (variable.variable === VariableTypeEnum.SUBJECT_MARK) {
                            variableStr = `${variable.variable} ${variable.subjectName}(${variable.subjectId})`
                        }
                        else {
                            variableStr = variable.variable;
                        }
                        if (variable.weight) {
                            return `${variableStr}*${variable.weight}`
                        }
                        else return variableStr
                    }).reduce((strVar1, strVar2) => {
                        return strVar1 + ' + ' + strVar2
                    })}
                </p>
            </div>
            <div className="bg-[#d9d9d9] rounded mx-1 p-1">
                {subExpr.operator}
            </div>
            <div className="bg-[#d9d9d9] rounded mx-1 p-1">
                {subExpr.rightValue}
            </div>
        </div>
    )
}

const StaticExprElement : React.FC<exprComponent> = ({exprId}) => {
    const {expression, leaderCondition} = useSelector((state: RootState) => state.topicCondition);
    const operator = (expression as expression)[exprId].operator;
    if (operator === OperationTypeEnum.AND || 
        operator === OperationTypeEnum.OR)
    {
        return (
            <RelationExprElement exprId={exprId}/>
        )
    }
    else {
        return (<LogicalExprElement exprId={exprId}/>)
    }
}

export default StaticExprElement;