import { SET_TOPIC_CONDITION,
    ADD_EXPR_TOPIC_CONDITION,
    UPDATE_EXPR_TOPIC_CONDITION,
    DELETE_EXPR_TOPIC_CONDITION,
    UPDATE_LEADER_CONDITION,
    UPDATE_INSTRUCTOR_CONDITION,
    UPDATE_CONDITION_REQUIRE_LEVEL
} from "../shared/authStateType";
import { instructorConditionIntf } from "../shared/interfaces/topicConditionInterface";
import { ConditionRequireLevelEnum } from "../shared/types/conditionRequireDegree";

interface expression {
    [k: string]: (relationExprIntf | logicExprIntf)
}

interface relationExprIntf {
    operator: string
}

interface logicExprIntf{
    operator: string,
    object: string,
    leftExpr: {variable: string, weight?: string, key: string}[],
    rightValue: string
}

interface condition {
    expression: expression,
    leaderCondition: string[],
    instructorCondition: instructorConditionIntf,
    requireLevel?: string 
}

const initialState: condition = {
    expression: {},
    leaderCondition: [],
    instructorCondition: {
        degree: [],
        academyRank: [],
        approveWay: ""
    },
    requireLevel: ConditionRequireLevelEnum.NONE
};

export default function (state = initialState, action: any) {
    const { type, payload } = action;
    const newExpr = {
        ...(state.expression)
    }

    switch (type) {
        case SET_TOPIC_CONDITION:
            return {
                leaderCondition: payload.leaderCondition? payload.leaderCondition: [],
                expression: payload.expression,
                instructorCondition: payload.instructorCondition,
                requireLevel: payload.requireLevel? payload.requireLevel: ConditionRequireLevelEnum.NONE
            }
        
        case ADD_EXPR_TOPIC_CONDITION:
            newExpr[payload.exprId] = payload.subExpr
            return {
                ...state,
                expression: newExpr
            };
        
        case DELETE_EXPR_TOPIC_CONDITION:
            Object.keys(newExpr).forEach((key) => {
                if (key.indexOf(payload.exprId) === 0 ) {
                    delete newExpr[key]
                }
            })
            return {
                ...state,
                expression: newExpr
            };
        
        case UPDATE_EXPR_TOPIC_CONDITION:
            newExpr[payload.exprId] = payload.subExpr
            return {
                ...state,
                expression: newExpr
            };
        
        case UPDATE_LEADER_CONDITION:
            return {
                ...state,
                leaderCondition: payload.leaderCondition
            }
            
        case UPDATE_INSTRUCTOR_CONDITION:
            return {
                ...state,
                instructorCondition: payload.instructorCondition
            }

        case UPDATE_CONDITION_REQUIRE_LEVEL:
            return {
                ...state,
                requireLevel: payload.requireLevel
            }
        
        default:
            return state;
    }
}