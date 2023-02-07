import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./messageReducer";
import topicCondition from "./topicConditionReducer";

export default combineReducers({
  auth,
  message,
  topicCondition
});