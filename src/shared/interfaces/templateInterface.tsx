export interface Template{
    _id: string,
    name: string
}

export interface TemplateWithPaper{
    _id: string,
    name: string,
    paper:{
        _id: string,
        paperFileName: string
    } | undefined
}