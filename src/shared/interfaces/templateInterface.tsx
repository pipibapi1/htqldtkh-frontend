export interface Template{
    _id: string,
    templateGivenId: string,
    name: string,
    forStudent: boolean,
    createAt: string,
    formId: string,
    inUse: boolean
}

export interface TemplateWithPaper{
    _id: string,
    templateGivenId: string,
    name: string,
    paper:{
        _id: string,
        paperFileName: string
    } | undefined,
    formId: string
}