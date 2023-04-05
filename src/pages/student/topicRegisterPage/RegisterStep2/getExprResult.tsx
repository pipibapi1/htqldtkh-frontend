import { OperationTypeEnum } from "../../../../shared/types/operationType"
import { TopicMemberTypeEnum } from "../../../../shared/types/topicMemberType"

import { logicExprIntf } from "../../../../shared/interfaces/topicConditionInterface"
import { VariableTypeEnum } from "../../../../shared/types/variableType"

interface DataForCondition {
    otherMembers : {[k:string] : string}[],
    leader: {[k:string] : string}
}

type exprFunction = (dataForCondition: DataForCondition, expression: any, exprId: string, numMember: number) => boolean

export const getExprResult: exprFunction = (dataForCondition: DataForCondition, expression: any, exprId: string, numMember: number) => {
    const subExpr = expression[exprId];
    if (!subExpr) {
        return true;
    }
    if (subExpr.operator === OperationTypeEnum.AND) {
        const leftId = exprId + ",l";
        const rightId = exprId + ",r";
        const rightExprResult = getExprResult(dataForCondition, expression, rightId, numMember);
        const leftExprResult = getExprResult(dataForCondition, expression, leftId, numMember);
        return leftExprResult && rightExprResult;
    }
    else if (subExpr.operator === OperationTypeEnum.OR) {
        const leftId = exprId + ",l";
        const rightId = exprId + ",r";
        const rightExprResult = getExprResult(dataForCondition, expression, rightId, numMember);
        const leftExprResult = getExprResult(dataForCondition, expression, leftId, numMember);
        return leftExprResult || rightExprResult;
    }
    else {
        const logicExpr: logicExprIntf = subExpr;
        const isStringExpr = isNaN(parseFloat(logicExpr.rightValue));
        if (isStringExpr) {
            const rightValue: string = logicExpr.rightValue;
            const operator = logicExpr.operator;
            if (logicExpr.leftExpr.length > 1 || logicExpr.leftExpr[0].weight) {
                return false;
            }
            if (operator !== OperationTypeEnum.EQUAL && operator !== OperationTypeEnum.DIFFERENT) {
                return false;
            }
            if (logicExpr.object === TopicMemberTypeEnum.Leader) {
                if (logicExpr.operator === OperationTypeEnum.EQUAL) {
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
            if (logicExpr.object === TopicMemberTypeEnum.Leader) {
                return calcLeaderNumericLogicalExpr(logicExpr, dataForCondition, rightValue);
            }
            else if (logicExpr.object === TopicMemberTypeEnum.OthersMember) {
                return calcOtherMembersNumericLogicalExpr(logicExpr, dataForCondition, rightValue, numMember);
            }
            else if (logicExpr.object === TopicMemberTypeEnum.AllMember) {
                return calcLeaderNumericLogicalExpr(logicExpr, dataForCondition, rightValue)
                && calcOtherMembersNumericLogicalExpr(logicExpr, dataForCondition, rightValue, numMember);
            }
        }
        return true
    }
}


const checkInequality = (leftValue: number, rightValue: number, operator: string) => {
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
    return true;
}

const calcLeaderNumericLogicalExpr = (logicExpr: logicExprIntf, dataForCondition: DataForCondition, rightValue: number) => {
    let leftValue = 0;
    const leftExpr = logicExpr.leftExpr;
    for (let i = 0; i < leftExpr.length; i++) {
        const weight = leftExpr[i].weight? leftExpr[i].weight : 1;
        const leader = dataForCondition.leader;
        const variable = (leftExpr[i].variable === VariableTypeEnum.SUBJECT_MARK)? 
                            (leftExpr[i].subjectId as string) : (leftExpr[i].variable);
        leftValue += parseFloat(leader[variable]) * (weight as number);
    }
    return checkInequality(leftValue, rightValue, logicExpr.operator)
}


const calcOtherMembersNumericLogicalExpr = (logicExpr: logicExprIntf, dataForCondition: DataForCondition, rightValue: number, numMember: number) => {
    for (let i=0; i < (numMember - 1); i++) {
        let leftValue = 0;
        const currMember = dataForCondition.otherMembers[i];
        const leftExpr = logicExpr.leftExpr
        for (let varIdx = 0; varIdx < leftExpr.length; varIdx++) {
            const weight = leftExpr[varIdx].weight? leftExpr[varIdx].weight : 1;
            const variable = (leftExpr[varIdx].variable === VariableTypeEnum.SUBJECT_MARK)? 
                    (leftExpr[varIdx].subjectId as string) : (leftExpr[varIdx].variable);
            leftValue += parseFloat(currMember[variable]) * (weight as number);
        }
        if (checkInequality(leftValue, rightValue, logicExpr.operator) === false) {
            return false;
        }
    }
    return true;
}
