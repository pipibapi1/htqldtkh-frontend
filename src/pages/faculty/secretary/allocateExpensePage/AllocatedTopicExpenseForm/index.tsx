import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { TopicTypeEnum } from '../../../../../shared/types/topicType';
import { TopicStatusEnum } from '../../../../../shared/types/topicStatus';

import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../../store';

import { putUpdateATopicAction } from '../../../../../actions/topicAction';

const RECORD_PER_PAGE = 10;

interface Props {
    data: TopicExpenseFormData,
    year: number,
    period?: string,
    expenseRule?: Expense,
    onCancel: any,
    onConfirm: any
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
        totalExpense: number;
        maxExpensePerTopic: number;
    }[],
    usedExpense: number,
    used: {[k: string]: number};
}

interface TopicExpenseFormData {
    topic: Topic,
    isOpen: boolean
}

interface Topic{
    _id: string;
    name: string;
    type: TopicTypeEnum;
    startTime: string;
    endTime: string;
    isExtended: boolean;
    extensionTime: number;
    status: TopicStatusEnum; 
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

const AllocateTopicExpenseForm: React.FC<Props> = (props: Props) => {
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const {data, onCancel, year, period, onConfirm, expenseRule} = props;
    const {topic, isOpen} = data;
    const [expense, setExpense] = useState<string>(topic.expense.toString());

    const onClickCancelBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        onCancel();
    }

    const periodDisplay = (period: string) => {
        const x = new Date(period);
        return (x.getMonth() + 1) + "/" + x.getFullYear();
    }

    const displayDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();  
    }

    const onClickConfirmBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        const expenseValue = parseInt(expense);
        if (isNaN(expenseValue) || expenseValue < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Kinh phí phải là số nguyên và không được bé hơn 0.',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'OK',
            })
        }
        else {
            const successUpdateNotification = (data: any) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        onConfirm(expense);
                    } 
                })
            }
            let errorMessage: string[] = [];
            const allocatedForType = expenseRule?.allocated.find((ele) => ele.type === topic.type);
            if (allocatedForType) {
                if (allocatedForType.maxExpensePerTopic && allocatedForType.maxExpensePerTopic < parseInt(expense)) {
                    errorMessage.push(`Kinh phí vượt quá mức tối đa mỗi đề tài loại ${topic.type}.`);
                }
                if (allocatedForType.totalExpense && expenseRule?.used[topic.type]) {
                    const oldUsedExpense = expenseRule?.used[topic.type];
                    const oldExpense = topic.expense? topic.expense : 0;
                    const check = ( oldUsedExpense + expenseValue - oldExpense ) <= allocatedForType.totalExpense;
                    if (!check) {
                        errorMessage.push(`Vượt quá tổng kinh phí đề tài loại ${topic.type}.`);
                    }
                }
            }
            const oldUsedAllType = expenseRule?.usedExpense? expenseRule.usedExpense : 0;
            const oldTopicExpense = topic.expense? topic.expense : 0;
            const generalExpense = expenseRule?.generalExpense? expenseRule.generalExpense : 0;
            const totalExpense = expenseRule?.totalExpense? expenseRule?.totalExpense : 0;
            const check = (oldUsedAllType + expenseValue - oldTopicExpense + generalExpense) <= totalExpense;
            if (totalExpense && !check) {
                errorMessage.push(`Vượt quá tổng kinh phí cho tất cả đề tài.`);
            }
            if (errorMessage.length == 0) {
                dispatch(putUpdateATopicAction({
                    _id: topic._id,
                    topic: {
                        expense: expense
                    }
                })).then(successUpdateNotification);
            }
            else {
                const title = '<p>' + errorMessage.join('<br/>') + "<br/>Vẫn tiếp tục ?</p>"
                Swal.fire({
                    icon: 'warning',
                    html: title,
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(putUpdateATopicAction({
                            _id: topic._id,
                            topic: {
                                expense: expense
                            }
                        })).then(successUpdateNotification);
                    } 
                })
            }
        }
    }
    
    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm`}>
            <div className='flex flex-col items-center w-[800px] h-[400px] snap-y overflow-auto overscroll-contain bg-white rounded'>
                <div className='font-bold text-lg mt-2'>
                    Phân bổ kinh phí cho đề tài
                </div>
                <div className='flex flex-col items-start w-5/6'>
                    <div className='my-1'>
                        Mã số: {topic.topicGivenId? "Chưa được cấp": topic.topicGivenId}
                    </div>
                    <div className='my-1'>
                        Đề tài: {topic.name}
                    </div>
                    <div className='my-1'>
                        Loại đề tài: {topic.type}
                    </div>
                    <div className='my-1'>
                        Chủ nhiệm đề tài: {topic.student.name}
                    </div>
                    <div className='my-1'>
                        Năm: {year}
                    </div>
                    <div className='my-1'>
                        Đợt: {period? periodDisplay(period) : ""}
                    </div>
                    <div className='my-1'>
                        Ngày tạo: {displayDate(topic.creationDate)}
                    </div>
                    <div className='my-1'>
                        Kinh phí:
                    </div>
                    <input
                        className='mx-2 mb-1 rounded border border-[#1488d8] focus:outline-[#1488d8] px-2 py-1 w-[300px]'
                        value={expense}
                        onChange={(e) => {
                            setExpense(e.target.value);
                        }}
                    ></input>
                </div>
                <div className='flex flex-row justify-evenly w-11/12 my-4'>
                    <button
                        className='py-2 px-6 border border-1 bg-[#1488d8] text-white rounded'
                        onClick={onClickCancelBtn}
                    >
                        Hủy bỏ
                    </button>
                    <button
                        className='py-2 px-6 border border-1 bg-[#1488d8] text-white rounded'
                        onClick={onClickConfirmBtn}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllocateTopicExpenseForm;