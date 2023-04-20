import React from 'react';
import { topicInput } from '../../../../../shared/interfaces/topicInterface';
import SearchLeaderOnSystem from './searchOnSystem';
import ManualLeaderInput from './manualInput';

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

interface LeaderDataForcondition {
    isLoadding: boolean,
    leader: {
        name: string,
        studentId: string,
        gender: string,
        phoneNumber: string,
        email: string
    }
}

interface LeaderConditionVar{
    [k:string] : string | number | undefined
}

enum InputMethodEnum {
    Manual = 'Nhập thủ công',
    Search = 'Tìm trên hệ thống'
}

const LeaderInput: React.FC<Props> = (props: Props) => {
    const {conditionField, dataForCondition, setDataForCondition} = props;
    const [inputMethod, setInputMethod] = React.useState<string>(InputMethodEnum.Search);
    
    const onChangeInputMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setInputMethod(event.target.value);
    }

    return (
        <div className='flex flex-col w-full mb-6'>
            <div className="px-2 pt-2 flex flex-row justify-start items-center">
                <div className='mr-4'>
                    Phương thức nhập dữ liệu: 
                </div>
                <select
                    className='bg-white h-[40px] w-fit border border-black border-1 rounded-lg focus:ring-blue-500 px-2'
                    value={inputMethod}
                    onChange={onChangeInputMethod}
                >
                    {Object.values(InputMethodEnum).map((method) => {
                        return (
                            <option
                                value={method}
                                key={method}
                            >
                                {method}
                            </option>
                        )
                    })}
                </select>
            </div>
            {(inputMethod===InputMethodEnum.Manual)? (
                <ManualLeaderInput
                    conditionField={conditionField}
                    dataForCondition={dataForCondition}
                    setDataForCondition={setDataForCondition}
                />
            ) : (
                <SearchLeaderOnSystem
                    conditionField={conditionField}
                    dataForCondition={dataForCondition}
                    setDataForCondition={setDataForCondition}
                />
            )}
        </div>
    )
}

export default LeaderInput;