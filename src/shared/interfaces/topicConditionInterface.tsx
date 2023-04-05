export interface topicConditionIntf {
    _id?: string,
    type?: string,
    createAt?: string,
    expression?: {[k: string]: (relationExprIntf | logicExprIntf)},
    isLoading?: boolean,
    leaderCondition?: string[],
    instructorCondition?: instructorConditionIntf
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
    object: string,
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
