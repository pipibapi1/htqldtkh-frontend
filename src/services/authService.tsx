import axios from "axios";
import { RoleType } from "../shared/types/role";
import { GenderType } from "../shared/types/gender";
import { EducationType } from "../shared/types/educationType";

const AUTH_API_URL = process.env.REACT_APP_API_URL + "/api/auth";


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

const loginService = (signInData: SignInInput) => {
    const {username, password, role} = signInData;
    return axios.
        post(AUTH_API_URL + "/signin", {
            username,
            password,
            role
        })
        .then((response) => {
            if(response.data.user.token){
                localStorage.setItem("user", JSON.stringify(response.data.user))
            }
            return response.data
        })
};

const registerService = (registerData: RegisterInput) => {
    const {email, phoneNumber, name, username, password, studentId, gender, educationType, birthDate, role} = registerData;
    return axios.
        post(AUTH_API_URL + "/signup", {
            email,
            phoneNumber,
            name,
            username, 
            password,
            studentId,
            gender,
            educationType,
            birthDate,
            role
        })
        .then((response) => {
            if(response.data.user.token){
                localStorage.setItem("user", JSON.stringify(response.data.user))
            }
            return response.data
        })
};

const logoutService = () => {
    localStorage.removeItem("user");
};

const resetpwService = (resetPassWordData: ResetPassWordInput) => {
    const {email, role} = resetPassWordData;
    return axios.
        put(AUTH_API_URL + "/resetpw", {
            email,
            role
        })
        .then((response)=>{
            return response.data
        })
};

export default {
    loginService,
    registerService,
    logoutService,
    resetpwService
}