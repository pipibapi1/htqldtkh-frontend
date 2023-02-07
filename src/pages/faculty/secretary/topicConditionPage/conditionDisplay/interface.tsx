export interface topicConditionIntf {
    _id?: string,
    type?: string,
    createAt?: string,
    expression?: expression,
    isLoading: boolean
}

export interface expression {
    [k: string]: (relationExprIntf | logicExprIntf)
}

export interface relationExprIntf {
    operator: string
}

export interface logicExprIntf{
    operator: string,
    object: string,
    leftExpr: {variable: string, weight?: string}[],
    rightValue: string
}

export interface exprComponent {
    exprId: string
}