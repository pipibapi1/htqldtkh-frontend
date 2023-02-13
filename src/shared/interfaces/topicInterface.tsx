import { Instructor } from "./instructorInterface";
import { OtherMember } from "./othermemberInterface";

export interface Topic{
    _id: string;
    name: string;
    type: string;
    startTime: string;
    endTime: string;
    isExtended: boolean;
    extensionTime: number;
    status: string 
    period: string;
    productPath: string;
    studentId: string;
    creationDate: string;
    topicGivenId: string;
    expense: number;
    student: {
        _id: string;
        name: string;
    };
    periodValue: string;
}

export interface MyTopic{
    _id: string;
    name: string;
    type: string;
    startTime: string;
    endTime: string;
    isExtended: boolean;
    extensionTime: number;
    status: string 
    period: string;
    productPath: string;
    studentId: string;
    creationDate: string;
    topicGivenId: string;
    expense: number;
    student: {
        _id: string;
        name: string;
    };
    periodValue: string;
    instructors: Instructor[],
    instructorsId: string[],
    otherMembers: OtherMember[]
}