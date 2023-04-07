export interface HCMUTSystemStudentIntf {
    _id?:  string,
    name: string,
    email: string,
    gender: string,
    birthDate: string,
    phoneNumber?: string,
    studentId: string,
    educationType: string,
    accumulatedCredits: number,
    averageMark: number,
    subjects: SubjectResultIntf[]
}

interface SubjectResultIntf {
    _id?:  string,
    nameSubject: string,
    subjectId: string,
    numCredits: number,
    result: number
}