import React from "react";
import { exprComponent, expression, logicExprIntf } from "../interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";
import { OperationTypeEnum } from "../../../../../../shared/types/operationType";

const RelationExprElement : React.FC<exprComponent> = ({exprId}) => {
    const {expression} = useSelector((state: RootState) => state.topicCondition);
    const operator = (expression as expression)[exprId].operator;
    return (
        <div className="flex flex-col border-[#d9d9d9] border-2 rounded p-2 mx-1 my-2">
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
        <div className="flex flex-row items-center border-[#d9d9d9] border-2 rounded p-2 mx-1 my-2">
            <div className="bg-[#d9d9d9] rounded mx-1 p-1">
                <p>
                    {variableArr.map((variable) => {
                        if (variable.weight) {
                            return variable.variable + '*' + variable.weight;
                        }
                        else return variable.variable
                    }).reduce((strVar1, strVar2) => {
                        return strVar1 + ' ' + strVar2
                    })}
                </p>
            </div>
            <div className="mx-1 p-1">
                của
            </div>
            <div className="bg-[#d9d9d9] rounded mx-1 p-1">
                {subExpr.object}
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
    const {expression} = useSelector((state: RootState) => state.topicCondition);
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

export default StaticExprElement;