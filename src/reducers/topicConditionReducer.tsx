import { SET_TOPIC_CONDITION,
    ADD_EXPR_TOPIC_CONDITION,
    UPDATE_EXPR_TOPIC_CONDITION,
    DELETE_EXPR_TOPIC_CONDITION
} from "../shared/authStateType";

const initialState = {
    expression: {}
};

export default function (state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case SET_TOPIC_CONDITION:
        return {
            expression: payload.expression
        }
    
    case ADD_EXPR_TOPIC_CONDITION:
        return {};
    
    case DELETE_EXPR_TOPIC_CONDITION:
        return {};
    
    case UPDATE_EXPR_TOPIC_CONDITION:
        return {};
    
    default:
      return state;
  }
}