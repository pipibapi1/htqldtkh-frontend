import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
  } from "../shared/authStateType";
  
  const user = localStorage.getItem("user");
  
  const initialState = (user === null)
    ?  { isLoggedIn: false, user: null }
    :  { isLoggedIn: true, user: JSON.parse(user)};

  
  export default function (state = initialState, action: any) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case RESET_PASSWORD_SUCCESS:
        return{
            ...state,
            isLoggedIn: false,
            user: null
        }
      case RESET_PASSWORD_FAIL:
        return{
            ...state,
            isLoggedIn: false,
            user: null
        }
      default:
        return state;
    }
  }