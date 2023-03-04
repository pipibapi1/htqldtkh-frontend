import { OperationTypeEnum } from "../../../../shared/types/operationType"
import { TopicMemberTypeEnum } from "../../../../shared/types/topicMemberType"

import { logicExprIntf } from "../../../faculty/secretary/topicConditionPage/conditionDisplay/interface"

interface DataForCondition {
    otherMembers : {[k:string] : string}[],
    leader: {[k:string] : string}
}

type exprFunction = (dataForCondition: DataForCondition, expression: any, exprId: string, numMember: number) => boolean

export const getExprResult: exprFunction = (dataForCondition: DataForCondition, expression: any, exprId: string, numMember: number) => {
    
    const subExpr = expression[exprId];
    if (subExpr.operator == OperationTypeEnum.AND) {
        const leftId = exprId + ",l";
        const rightId = exprId + ",r";
        return getExprResult(dataForCondition, expression, leftId, numMember) && 
                getExprResult(dataForCondition, expression, rightId, numMember);
    }
    else if (subExpr.operator == OperationTypeEnum.OR) {
        const leftId = exprId + ",l";
        const rightId = exprId + ",r";
        return getExprResult(dataForCondition, expression, leftId, numMember) ||
                getExprResult(dataForCondition, expression, rightId, numMember);
    }
    else {
        const logicExpr: logicExprIntf = subExpr;
        const isStringExpr = isNaN(parseFloat(logicExpr.rightValue))? true : false;
        if (isStringExpr) {
            const rightValue: string = logicExpr.rightValue;
            if (logicExpr.leftExpr.length > 1 || logicExpr.leftExpr[0].weight) {
                return false;
            }
            if (logicExpr.operator !== OperationTypeEnum.EQUAL && logicExpr.operator !== OperationTypeEnum.DIFFERENT) {
                return false;
            }
            if (logicExpr.object === TopicMemberTypeEnum.Leader) {
                if (logicExpr.operator == OperationTypeEnum.EQUAL) {
                    return dataForCondition.leader[logicExpr.leftExpr[0].variable] === rightValue 
                }
                else {
                    return dataForCondition.leader[logicExpr.leftExpr[0].variable] !== rightValue 
                }
            }
            else if (logicExpr.object === TopicMemberTypeEnum.OthersMember) {
                if (logicExpr.operator === OperationTypeEnum.EQUAL) {
                    for (let i=0; i < (numMember - 1); i++) {
                        if (dataForCondition.otherMembers[i][logicExpr.leftExpr[0].variable] !== rightValue) {
                            return false
                        }
                    }
                    return true;
                }
                else {
                    for (let i=0; i < (numMember - 1); i++) {
                        if (dataForCondition.otherMembers[i][logicExpr.leftExpr[0].variable] === rightValue) {
                            return false
                        }
                    }
                    return true;
                }
            }
            else if (logicExpr.object === TopicMemberTypeEnum.AllMember) {
                if (logicExpr.operator === OperationTypeEnum.EQUAL) {
                    if (dataForCondition.leader[logicExpr.leftExpr[0].variable] !== rightValue) {
                        return false;
                    }
                    for (let i=0; i < (numMember - 1); i++) {
                        if (dataForCondition.otherMembers[i][logicExpr.leftExpr[0].variable] !== rightValue) {
                            return false;
                        }
                    }
                    return true;
                }
                else {
                    if (dataForCondition.leader[logicExpr.leftExpr[0].variable] === rightValue) {
                        return false;
                    }
                    for (let i=0; i < (numMember - 1); i++) {
                        if (dataForCondition.otherMembers[i][logicExpr.leftExpr[0].variable] === rightValue) {
                            return false
                        }
                    }
                    return true;
                }
            }
        }
        else {
            const rightValue: number = parseFloat(logicExpr.rightValue);
            if (logicExpr.object == TopicMemberTypeEnum.Leader) {
                let leftValue = 0;
                const leftExpr = logicExpr.leftExpr;
                console.log(leftExpr)
                for (let i = 0; i < leftExpr.length; i++) {
                    const weight = leftExpr[i].weight? leftExpr[i].weight : 1;
                    console.log(weight);
                    const leader = dataForCondition.leader;
                    const variable = leftExpr[i].variable
                    leftValue += parseFloat(leader[variable]) * (weight as number);
                }
                console.log(leftValue)
                if (isNaN(leftValue)) return false;
                if (logicExpr.operator === OperationTypeEnum.EQUAL) {
                    return leftValue === rightValue 
                }
                else if (logicExpr.operator === OperationTypeEnum.DIFFERENT) {
                    return leftValue !== rightValue 
                }
                else if (logicExpr.operator === OperationTypeEnum.GE) {
                    return leftValue >= rightValue 
                }
                else if (logicExpr.operator === OperationTypeEnum.GREATER) {
                    return leftValue > rightValue 
                }
                else if (logicExpr.operator === OperationTypeEnum.LE) {
                    return leftValue <= rightValue 
                }
                else if (logicExpr.operator === OperationTypeEnum.LESS) {
                    return leftValue < rightValue 
                }
            }
            else if (logicExpr.object == TopicMemberTypeEnum.OthersMember) {
                for (let i=0; i < (numMember - 1); i++) {
                    let leftValue = 0;
                    const currMember = dataForCondition.otherMembers[i];
                    const leftExpr = logicExpr.leftExpr
                    for (let varIdx = 0; varIdx < leftExpr.length; varIdx++) {
                        const weight = leftExpr[varIdx].weight? leftExpr[varIdx].weight : 1;
                        const variable = leftExpr[varIdx].variable;
                        leftValue += parseFloat(currMember[variable]) * (weight as number);
                    }
                    if (isNaN(leftValue)) return false;
                    if (logicExpr.operator === OperationTypeEnum.EQUAL) {
                        if (leftValue !== rightValue) return false
                    }
                    else if (logicExpr.operator === OperationTypeEnum.DIFFERENT) {
                        if (leftValue === rightValue) return false
                    }
                    else if (logicExpr.operator === OperationTypeEnum.GE) {
                        if (leftValue <= rightValue) return false
                    }
                    else if (logicExpr.operator === OperationTypeEnum.GREATER) {
                        if (leftValue <= rightValue) return false
                    }
                    else if (logicExpr.operator === OperationTypeEnum.LE) {
                        if (leftValue > rightValue) return false
                    }
                    else if (logicExpr.operator === OperationTypeEnum.LESS) {
                        if (leftValue >= rightValue) return false
                    }
                }
                return true;
            }
            else if (logicExpr.object == TopicMemberTypeEnum.AllMember) {
                let leaderLeftValue = 0;
                const leftExpr = logicExpr.leftExpr;
                const operator = logicExpr.operator;
                for (let i = 0; i <= (leftExpr.length - 1); i++) {
                    const weight = leftExpr[i].weight? leftExpr[i].weight : 1;
                    const leader = dataForCondition.leader;
                    const variable = leftExpr[i].variable;
                    leaderLeftValue += parseFloat(leader[variable]) * (weight as number);
                }
                if (isNaN(leaderLeftValue)) return false;
                if (operator === OperationTypeEnum.EQUAL) {
                    if (leaderLeftValue !== rightValue) return false
                }
                else if (operator === OperationTypeEnum.DIFFERENT) {
                    if (leaderLeftValue === rightValue) return false
                }
                else if (operator === OperationTypeEnum.GE) {
                    if (leaderLeftValue < rightValue) return false
                }
                else if (operator === OperationTypeEnum.GREATER) {
                    if (leaderLeftValue <= rightValue) return false
                }
                else if (operator === OperationTypeEnum.LE) {
                    if (leaderLeftValue > rightValue) return false
                }
                else if (operator === OperationTypeEnum.LESS) {
                    if (leaderLeftValue >= rightValue) return false
                }
                for (let i=0; i < (numMember - 1); i++) {
                    let leftValue = 0;
                    const currMember = dataForCondition.otherMembers[i];
                    for (let varIdx = 0; varIdx < leftExpr.length ; varIdx++) {
                        const weight = leftExpr[varIdx].weight? leftExpr[varIdx].weight : 1;
                        const variable = leftExpr[varIdx].variable;
                        leftValue += parseFloat(currMember[variable]) * (weight as number);
                    }
                    if (isNaN(leftValue)) return false;
                    if (operator === OperationTypeEnum.EQUAL) {
                        if (leftValue !== rightValue) return false
                    }
                    else if (operator === OperationTypeEnum.DIFFERENT) {
                        if (leftValue === rightValue) return false
                    }
                    else if (operator === OperationTypeEnum.GE) {
                        if (leftValue < rightValue) return false
                    }
                    else if (operator === OperationTypeEnum.GREATER) {
                        if (leftValue <= rightValue) return false
                    }
                    else if (operator === OperationTypeEnum.LE) {
                        if (leftValue > rightValue) return false
                    }
                    else if (operator === OperationTypeEnum.LESS) {
                        if (leftValue >= rightValue) return false
                    }
                }
                return true;
            }
        }
        return true
    }
}