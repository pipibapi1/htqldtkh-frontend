import { SET_TOPIC_CONDITION, 
    ADD_EXPR_TOPIC_CONDITION,
    UPDATE_EXPR_TOPIC_CONDITION,
    DELETE_EXPR_TOPIC_CONDITION,
    UPDATE_LEADER_CONDITION,
    UPDATE_INSTRUCTOR_CONDITION,
    UPDATE_CONDITION_REQUIRE_LEVEL
} from "../shared/authStateType";
import { expression, instructorConditionIntf, logicExprIntf, relationExprIntf } from "../shared/interfaces/topicConditionInterface";

const setTopicConditionAction = (expression?: expression, instructorCondition?: instructorConditionIntf, leaderCondition?: string[], requireLevel?: string) => (dispatch: any) => {
    return dispatch({
        type: SET_TOPIC_CONDITION,
        payload: {
            expression: expression? expression : {},
            leaderCondition: leaderCondition,
            instructorCondition: instructorCondition,
            requireLevel: requireLevel
        }
    })
}

const updateExprTopicCondition = (expr: relationExprIntf | logicExprIntf, exprId: string) => (dispatch: any) => {
    return dispatch({
        type: UPDATE_EXPR_TOPIC_CONDITION,
        payload: {
            subExpr: expr,
            exprId: exprId
        }
    })
}

const deleteExprTopicCondition = (exprId: string) => (dispatch: any) => {
    return dispatch({
        type: DELETE_EXPR_TOPIC_CONDITION,
        payload: {
            exprId: exprId
        }
    })
}

const addExprTopicCondition = (expr: relationExprIntf | logicExprIntf, exprId: string) => (dispatch: any) => {
    return dispatch({
        type: ADD_EXPR_TOPIC_CONDITION,
        payload: {
            subExpr: expr,
            exprId: exprId
        }
    })
}

const updateLeaderCondition = (eduTypes: string[]) => (dispatch: any) => {
    return dispatch({
        type: UPDATE_LEADER_CONDITION,
        payload: {
            leaderCondition: eduTypes
        }
    })
}


const updateInstructorCondition = (instructorCondition: instructorConditionIntf) => (dispatch: any) => {
    return dispatch({
        type: UPDATE_INSTRUCTOR_CONDITION,
        payload: {
            instructorCondition: instructorCondition
        }
    })
}

const updateConditionRequireLevel = (newRequireLevel: string) => (dispatch: any) => {
    return dispatch({
        type: UPDATE_CONDITION_REQUIRE_LEVEL,
        payload: {
            requireLevel: newRequireLevel
        }
    })
}

export {
    setTopicConditionAction,
    updateExprTopicCondition,
    deleteExprTopicCondition,
    addExprTopicCondition,
    updateLeaderCondition,
    updateInstructorCondition,
    updateConditionRequireLevel
}