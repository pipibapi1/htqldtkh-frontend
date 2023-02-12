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
    }
}