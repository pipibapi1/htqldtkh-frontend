export interface TopicQuery{
    period?: string,
    page?: number,
    limit?: number,
    type?: string,
    status?: string,
    student?: string,
    isExtended?: boolean,
    reviewCouncil?: string,
    acceptanceCouncil?: string
}