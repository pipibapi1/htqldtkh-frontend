export interface topicConditionIntf {
    _id?: string,
    type?: string,
    createAt?: string,
    expression?: {[k: string]: (relationExprIntf | logicExprIntf)},
    isLoading?: boolean,
    leaderCondition?: string[],
    instructorCondition?: instructorConditionIntf,
    requireLevel?: string
}

export interface instructorConditionIntf {
    degree?: string[],
    academyRank?: string[],
    approveWay?: string
}

export interface relationExprIntf {
    operator: string
}

export interface logicExprIntf{
    operator: string,
    object: topicMemberObject,
    leftExpr: variableInfo[],
    rightValue: string
}

export interface variableInfo {
    variable: string,
    weight?: number,
    subjectName?: string, 
    subjectId?: string,
    key: string
}

export interface expression {
    [k: string]: (relationExprIntf | logicExprIntf)
}

interface topicMemberObject {
    name: string,
    quantity?: string,
    compare?: string
}
