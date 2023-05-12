import React from 'react';
import { topicInput } from '../../../../../shared/interfaces/topicInterface';
import { VariableTypeEnum } from '../../../../../shared/types/variableType';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { capitalizeFirstLetter } from '../../../../../shared/functions';

interface Props {
    conditionField: {[k: string] : VarName},
    dataForCondition: DataForCondition,
    setDataForCondition: any
}

interface DataForCondition {
    otherMembers : {[k:string] : string | number | undefined}[],
    leader: {[k:string] : string | number | undefined}
}

interface VarName {
    variable: string,
    subjectName?: string,
    subjectId?: string
}

const ManualLeaderInput: React.FC<Props> = (props: Props) => {
    const {conditionField, dataForCondition, setDataForCondition} = props;
    const {user} = useSelector((state: RootState) => state.auth);
    
    const updateDataForCondition = (field: VarName, value: string) => {
        const leaderVar = dataForCondition.leader;
        if (field.variable === VariableTypeEnum.SUBJECT_MARK) {
            leaderVar[field.subjectId as string] = value;
        }
        else {
            leaderVar[field.variable] = value;
        }
        setDataForCondition({...dataForCondition})
    }

    const displayConditionVariable = () => {
        const leaderVar = dataForCondition.leader;
        return Object.values(conditionField).map((field) => {
            const onChangeConditionVar = (event: React.ChangeEvent<HTMLInputElement>) => {
                updateDataForCondition(field, event.target.value)
            }

            if (field.variable === VariableTypeEnum.SUBJECT_MARK) {
                return (
                    <div 
                        className='flex flex-col w-2/3 my-1 mx-2'
                        key={field.subjectId}
                    >
                        <div>
                            {
                                VariableTypeEnum.SUBJECT_MARK
                                + ` ${field.subjectName}(${field.subjectId}): `
                            }
                        </div>
                        <input
                            type="text"
                            name={field.subjectId}
                            className="w-[400px] border border-black border-1 rounded-md p-1"
                            defaultValue={leaderVar[field.subjectId as string]}
                            onChange={onChangeConditionVar}
                        ></input>
                    </div>
                )
            }
            else if (field.variable !== VariableTypeEnum.EDUCATION_TYPE) {
                return (
                    <div 
                        className='flex flex-col w-2/3 my-1 mx-2'
                        key={field.variable}
                    >
                        <div>
                            {field.variable}:
                        </div>
                        <input
                            type="text"
                            name={field.subjectId}
                            className="w-[400px] border border-black border-1 rounded-md p-1"
                            defaultValue={leaderVar[field.variable]}
                            onChange={onChangeConditionVar}
                        ></input>
                    </div>
                )
            }
            else {
                return null;
            }
        })
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-col w-full items-start mt-4'>
                <div className='px-3 py-1'>
                    Họ và tên: {user.name}
                </div>
                <div className='px-3 py-1'>
                    Giới tính: {user.gender}
                </div>
                <div className='px-3 py-1'>
                    Email: {user.email}
                </div>
                <div className='px-3 py-1'>
                    Số điện thoại: {user.phoneNumber? user.phoneNumber: (<i>Không có</i>)}
                </div>
                <div className='px-3 py-1'>
                    Mã số sinh viên: {user.studentId}
                </div>
                <div className='px-3 py-1'>
                    Chương trình đào tạo: {capitalizeFirstLetter(user.educationType)}
                </div>
                {displayConditionVariable()}
            </div>
        </div>
    )
}

export default ManualLeaderInput;