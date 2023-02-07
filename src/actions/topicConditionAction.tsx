import { SET_TOPIC_CONDITION, 
    ADD_EXPR_TOPIC_CONDITION,
    UPDATE_EXPR_TOPIC_CONDITION,
    DELETE_EXPR_TOPIC_CONDITION
} from "../shared/authStateType";

interface expression {
    [k: string]: (relationExprIntf | logicExprIntf)
}

interface relationExprIntf {
    operator: string
}

interface logicExprIntf{
    operator: string,
    object: string,
    leftExpr: {variable: string, weight?: string}[],
    rightValue: string
}

const setTopicConditionAction = (expression?: expression) => (dispatch: any) => {
    return dispatch({
        type: SET_TOPIC_CONDITION,
        payload: {expression: expression? expression : {}}
    })
}

export {
    setTopicConditionAction
}