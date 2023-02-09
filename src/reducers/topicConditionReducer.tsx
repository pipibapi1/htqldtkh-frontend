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
    leftExpr: {variable: string, weight?: string, key: string}[],
    rightValue: string
}

interface condition {
    expression: expression
}

const initialState: condition = {
    expression: {}
};


export default function (state = initialState, action: any) {
  const { type, payload } = action;
  const newExpr = {
    ...(state.expression)
  }

  switch (type) {
    case SET_TOPIC_CONDITION:
        return {
            expression: payload.expression
        }
    
    case ADD_EXPR_TOPIC_CONDITION:
        newExpr[payload.exprId] = payload.subExpr
        return {
            expression: newExpr
        };
    
    case DELETE_EXPR_TOPIC_CONDITION:
        Object.keys(newExpr).forEach((key) => {
            if (key.indexOf(payload.exprId) === 0 ) {
                delete newExpr[key]
            }
        })
        return {
            expression: newExpr
        };
    
    case UPDATE_EXPR_TOPIC_CONDITION:
        newExpr[payload.exprId] = payload.subExpr
        return {
            expression: newExpr
        };
    
    default:
      return state;
  }
}