import {FC, useState, MouseEvent, useEffect, ChangeEvent} from 'react';
import { TopicTypeEnum } from '../../../../shared/types/topicType';
import topicConditionService from '../../../../services/topicConditionService';
import ConditionDisplay from './conditionDisplay';
import { topicConditionIntf } from './conditionDisplay/interface';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';
import { setTopicConditionAction } from '../../../../actions/topicConditionAction';

const FSTopicConditionEditor: FC = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [type, setType] = useState<string>(Object.values(TopicTypeEnum)[0]);
    const [topicCondition, setTopicCondition] = useState<topicConditionIntf>({isLoading: true});

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const onClickBtnEdit = (e : MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!topicCondition.isLoading) {
            setIsEditing(true);
        }
    }

    const onClickBtnCancelEdit = (e : MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!topicCondition.isLoading) {
            setIsEditing(false);
        }
    }

    const onChangeTopicType = (e : ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    }

    useEffect(() => {
        topicConditionService.getTopicConditionByType(type)
            .then((condition) => {
                const newCondition: topicConditionIntf = {
                    ...condition,
                    isLoading: false
                }
                setTopicCondition(newCondition);
                dispatch(setTopicConditionAction(newCondition.expression))
            })
            .catch((err)=> {console.log(err)})
        return () => {
            dispatch(setTopicConditionAction())
        }
    }, [type, dispatch])

    return (
        <div className='px-5 py-5 flex flex-col'>
            <div className='flex flex-row items-start justify-between w-full'>
                <div className='flex flex-col items-start'>
                    <div className='flex flex-row items-center'>
                        <div className='mr-5'>
                            Loại đề tài:
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={onChangeTopicType}
                                    defaultValue={Object.values(TopicTypeEnum)[0]}
                                >
                                {Object.values(TopicTypeEnum).map((type) => {
                                    return (
                                        <option value={type} key={type}>{type}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='mt-2'>
                        Chỉnh sửa lần cuối: {topicCondition.isLoading? ("loading...") 
                        : (
                            topicCondition.createAt? (new Date(topicCondition.createAt as string).toLocaleDateString()) : ""
                        )}
                    </div>
                </div>
                <div className='flex flex-row'>
                    {!isEditing? (
                        <button 
                            className='button bg-[#1488d8] w-32 py-2 rounded-lg text-white'
                            onClick={onClickBtnEdit}
                        >
                            Chỉnh sửa
                        </button>
                    ) : (
                        <>
                            <button 
                                className='button bg-[#1488d8] w-32 py-2 rounded-lg text-white mr-4'
                                onClick={onClickBtnCancelEdit}
                            >
                                Hủy
                            </button>
                            <button className='button bg-[#1488d8] w-32 py-2 rounded-lg text-white'>
                                Xác nhận
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className='mt-4'>
                {topicCondition.isLoading? ("loading...")
                : (<ConditionDisplay isEditing={isEditing}/>)} 
            </div>
        </div>
    )
}

export default FSTopicConditionEditor;