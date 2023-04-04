import { SET_TOPIC_CONDITION,
    ADD_EXPR_TOPIC_CONDITION,
    UPDATE_EXPR_TOPIC_CONDITION,
    DELETE_EXPR_TOPIC_CONDITION,
    UPDATE_LEADER_CONDITION,
    UPDATE_INSTRUCTOR_CONDITION
} from "../shared/authStateType";
import { instructorConditionIntf } from "../shared/interfaces/topicConditionInterface";

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
    instructorCondition: instructorConditionIntf
}

const initialState: condition = {
    expression: {},
    leaderCondition: [],
    instructorCondition: {
        degree: [],
        academyRank: [],
        approveWay: ""
    }
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
            instructorCondition: payload.instructorCondition
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
    
    default:
      return state;
  }
}