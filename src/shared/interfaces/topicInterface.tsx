import { Instructor } from "./instructorInterface";

export interface Topic{
    _id: string,
    name: string,
    type: string,
    startTime: string,
    endTime: string,
    isExtended: boolean,
    extensionTime: number,
    status: string 
    period: string,
    productId: string,
    studentId: string,
    creationDate: string,
    topicGivenId: string,
    expense: number,
    student: {
        _id: string, 
        name: string,
        studentId: string,
        educationType: string,
        gender: string,
        email: string,
        phoneNumber: string,
        birthDate: string
    },
    periodValue: string,
}

export interface MyTopic{
    _id: string,
    name: string,
    type: string,
    startTime: string,
    endTime: string,
    isExtended: boolean,
    extensionTime: number,
    status: string 
    period: string,
    productId: string,
    studentId: string,
    creationDate: string,
    topicGivenId: string,
    expense: number,
    student: {
        _id: string, 
        name: string,
        studentId: string,
        educationType: string,
        gender: string,
        email: string,
        phoneNumber: string,
        birthDate: string
    },
    periodValue: string,
    instructors: Instructor[],
    instructorsId: string[],
    otherMembers: OtherMember[]
}

export interface topicInput {
    name: string,
    type: string,
    period: string,
    studentId: string,
    numInstructor: number,
    numMember: number,
    instructors: Instructor[],
    otherMembers: OtherMember[],
    instructorsId: string[],
}

export interface InfoForCheckCondition {
    leader: {[k:string] : string},
    otherMember: {[k:string] : string}[]
}

export interface OtherMember {
    studentId: string,
    fmName?: string,
    name: string,
    gender: string,
    email: string,
    phoneNumber: string,
    educationType: string,
    birthDate: string
}