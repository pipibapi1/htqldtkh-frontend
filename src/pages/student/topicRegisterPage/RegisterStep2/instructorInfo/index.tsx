import React from 'react';
import { topicInput } from '../../../../../shared/interfaces/topicInterface';
import { RootState } from '../../../../../store';
import { useSelector } from 'react-redux';
import ManualInstructorInput from './manualInput';
import SearchInstructorOnSystem from './searchOnSystem';

interface Props {
    index: number,
    setTopic: any,
    topic: topicInput
}

enum InputMethodEnum {
    Manual = 'Nhập thủ công',
    Search = 'Tìm trên hệ thống'
}

const InstructorInput: React.FC<Props> = (props: Props) => {
    const {index, topic, setTopic} = props;
    const [inputMethod, setInputMethod] = React.useState<string>(InputMethodEnum.Search)

    //check whether current member is duplicated or not
    const currMember = topic.otherMembers[index];
    const {user} = useSelector((state: RootState) => state.auth);
    const otherMembers = topic.otherMembers;
    const listMemberSameId = otherMembers.filter((member) => member.studentId === currMember.studentId)
    const isDuplicated = currMember.studentId && 
                        ((listMemberSameId.length > 1) || (currMember.studentId === user.studentId));
    
    const onChangeInputMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setInputMethod(event.target.value);
    }

    return (
        <div className='flex flex-col w-full mb-6'>
            <div className='border-b-2 border-t-2 border-black text-lg font-semibold'>
                Giảng viên {index + 1}:
            </div>
            <div className="text-[#e1000e]">
                {isDuplicated? (
                    <i>
                        Giảng viên bị trùng lặp
                    </i>
                ): null}
            </div>
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
                <ManualInstructorInput
                    index={index}
                    topic={topic}
                    setTopic={setTopic}
                />
            ) : (
                <SearchInstructorOnSystem
                    index={index}
                    topic={topic}
                    setTopic={setTopic}
                />
            )}
        </div>
    )
}

export default InstructorInput;