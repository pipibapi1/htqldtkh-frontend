export interface CouncilStatisticIntf {
    topicNeedCouncil?: number,
    topicHadCouncil?: number,
    numCouncil?: number
}

export interface CouncilInfoIntf {
    _id?: string,
    name: string,
    type: string,
    status: string,
    period: string,
    time: string,
    date: string,
    place: string,
    numMembers: number,
    numTopics: number,
    lastModified: string
}

export interface CouncilInputIntf {
    _id?: string,
    name: string,
    type: string,
    status?: string,
    period: string,
    time: string,
    date: string,
    place: string,
    numMembers: number,
    numTopics: number,
    members: CouncilMemberIntf[],
    topics: TopicInCouncilIntf[],
    lastModified?: string
}

export interface CouncilDataIntf {
    _id?: string,
    name: string,
    type: string,
    status?: string,
    period: string,
    time: string,
    date: string,
    place: string,
    numMembers: number,
    numTopics: number,
    members: CouncilMemberIntf[],
    topics: string[],
    lastModified?: string
}

export interface CouncilDetailIntf {
    _id?: string,
    name: string,
    type: string,
    status: string,
    period: string,
    time: string,
    date: string,
    place: string,
    numMembers: number,
    numTopics: number,
    members: CouncilMemberIntf[],
    topicGeneralInfos?: TopicInCouncilIntf[],
    lastModified?: string
}

export interface TopicInCouncilIntf {
    _id: string,
    topicGivenId: string,
    type?: string,
    name: string,
    studentId: string,
    studentName?: string,
    acceptanceResult?: string,
    reviewResult?: string,
    instructorsName?: string[]
}

export interface CouncilMemberIntf {
    name: string,
    academyRank?: string,
    degree?: string,
    workUnit: string,
    role: string,
    gender: string,
    email: string,
    phoneNumber: string
}

export interface UpdateCouncilInfo {
    name?: string,
    status?: string, 
    time?: string, 
    date?: string, 
    place?: string, 
    members?: CouncilMemberIntf[],
    numMembers?: number
}