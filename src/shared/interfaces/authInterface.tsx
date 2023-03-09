import { RoleType } from "../types/role";
import { GenderType } from "../types/gender";
import { EducationType } from "../types/educationType";

export interface SignInInput{
    username: string,
    password: string,
    role: RoleType,
}

export interface ResetPassWordInput{
    email: string,
    role: RoleType,
}

export interface RegisterInput{
    email: string,
    phoneNumber: string,
    name: string,
    username: string,
    password: string,
    studentId: string,
    gender: GenderType,
    educationType: EducationType,
    birthDate: Date,
    role: RoleType,
}