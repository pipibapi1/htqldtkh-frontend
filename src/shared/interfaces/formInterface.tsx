import { DataTypeEnum } from "../types/dataType"

export interface Form{
    _id?: string,
    templateId: string,
    fields: {
        initialName: string,
        name: string,
        note: string,
        dataType: DataTypeEnum
    }[],
    markedTemplateFileName?: string
}