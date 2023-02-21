import React from 'react';

interface Props {
    type: string,
    expense: Expense,
    setExpense: any
}

interface Expense{
    _id: string;
    createAt: string;
    lastModified: string;
    note: string;
    generalExpense: number;
    period: string;
    totalExpense: number;
    allocated:{
        type: string;
        totalExpense?: number;
        maxExpensePerTopic: number;
    }[]
}

interface expenseForType {
    type?: string;
    totalExpense?: number;
    maxExpensePerTopic?: number;
}

const ExpenseForType: React.FC<Props> = (props: Props) => {
    let {type, expense, setExpense} = props;
    let expenseForType: expenseForType = {};
    let idx = 0;
    if (expense) {
        idx = expense.allocated.findIndex((ele) => ele.type === type);
        expenseForType = idx > -1 ? expense.allocated[idx] : {};
    }

    const onChangeTotalExpense = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (idx > -1) {
            expense.allocated[idx].totalExpense = isNaN(value)? 0 : value;
        }
        else {
            expense.allocated.push({
                type: type,
                totalExpense: value,
                maxExpensePerTopic: 0
            })
        }
        setExpense({
            ...expense
        })
    }

    const onChangeMaxExpensePerTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (idx > -1) {
            expense.allocated[idx].maxExpensePerTopic = isNaN(value)? 0 : value;
        }
        else {
            expense.allocated.push({
                type: type,
                totalExpense: 0,
                maxExpensePerTopic: value
            })
        }
        setExpense({
            ...expense
        })
    }

    return (
        <div className='flex flex-col items-start my-1 border border-x-0 border-y-2 w-11/12'>
            <div className='flex flex-row mb-1'>
                {type}:
            </div>
            <div className='flex flex-row mb-1 items-center'>
                <div>
                    Tổng chi phí tối đa:
                </div>
                <input
                    className='w-[300px] rounded px-2 py-1 mx-2 my-1 border border-[#1488d8] focus:outline-[#1577d2]'
                    defaultValue={expenseForType?.totalExpense}
                    onChange={onChangeTotalExpense}
                >
                </input>
            </div>
            <div className='flex flex-row items-center'>
                <div>
                    Chi phí tối đa mỗi đề tài:
                </div>
                <input
                    className='w-[300px] rounded px-2 py-1 mx-2 my-1 border border-[#1488d8] focus:outline-[#1577d2]'
                    defaultValue={expenseForType?.maxExpensePerTopic}
                    onChange={onChangeMaxExpensePerTopic}
                >
                </input>
            </div>
        </div>
    )
}

export default ExpenseForType;