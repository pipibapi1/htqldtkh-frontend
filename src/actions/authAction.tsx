import authService from "../services/authService";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    SET_MESSAGE,
  } from "../shared/authStateType";
import { RoleType } from "../shared/types/role";
import { GenderType } from "../shared/types/gender";
import { EducationType } from "../shared/types/educationType";

interface SignInInput{
    username: string;
    password: string;
    role: RoleType;
}

interface ResetPassWordInput{
  email: string;
  role: RoleType;
}

interface RegisterInput{
  email: string;
  phoneNumber: string;
  name: string;
  username: string;
  password: string;
  studentId: string;
  gender: GenderType;
  educationType: EducationType;
  birthDate: Date;
  role: RoleType;
}

const loginAction = (signInData: SignInInput) => (dispatch: any) => {
 return authService.loginService(signInData).then(
    (data) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {user: data}
        });

        return Promise.resolve();
    },
    (error) => {
      
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          dispatch({
            type: LOGIN_FAIL
          })

          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          return Promise.reject(error);
    }
 )
}

const registerAction = (registerData: RegisterInput) => (dispatch: any) => {
  return authService.registerService(registerData).then(
    (data) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {user: data}
      });

      return Promise.resolve();
    },
    (error) => {
      const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

      dispatch({
        type: REGISTER_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject(error);
    }
  )
}

const logoutAction = () => (dispatch: any) => {
  authService.logoutService();
  dispatch({
    type: LOGOUT,
  });
}

const resetpwAction = (resetPassWordData: ResetPassWordInput) => (dispatch: any) => {
  return authService.resetpwService(resetPassWordData).then(
    (data) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS
      });
      return Promise.resolve();
    },
    (error) => {
      const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

      console.log(message)

      dispatch({
        type: RESET_PASSWORD_FAIL
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(error);
    }
  )
}

export{
    loginAction,
    registerAction,
    logoutAction,
    resetpwAction
}