import { GenderType } from "../types/gender";

export interface FsNewInfoInput{
    _id: string,
    name: string,
    gender: GenderType,
    birthDate: Date,
    email: string,
    phoneNumber: string,
    image: string,
}