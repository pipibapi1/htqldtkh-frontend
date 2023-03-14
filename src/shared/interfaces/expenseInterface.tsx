export interface Expense{
    _id?: string,
    createAt: string,
    lastModified: string,
    note: string,
    generalExpense: number,
    period: string,
    totalExpense: number,
    allocated:{
        type: string,
        totalExpense: number,
        maxExpensePerTopic: number,
    }[]
}