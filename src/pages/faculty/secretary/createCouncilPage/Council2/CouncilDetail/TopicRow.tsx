import React from "react";
import Swal from "sweetalert2";

import { TopicInCouncilIntf } from "../../../../../../shared/interfaces/councilInterface";
import { TopicResultEnum } from "../../../../../../shared/types/topicResult";
import { TopicStatusEnum } from "../../../../../../shared/types/topicStatus";

import TopicService from "../../../../../../services/topicService";

import { useCouncilDetailContext } from "./CouncilDetailContext";

interface Props {
    index: number
}

export const TopicRow: React.FC<Props> = (props) => {
    const { index } = props;
    const {council, setCouncil} = useCouncilDetailContext();
    const topic = (council.topicGeneralInfos as TopicInCouncilIntf[])[index];

    const instructorList = topic.instructorsName? topic.instructorsName : [];

    const onClickDeleteBtn = () => {
        Swal.fire({
            icon: 'warning',
            text: 'Bạn có chắc chắn muốn xóa đề tài này khỏi hội đồng hiện tại này không?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: "Hủy"
        }).then((data) => {
            if (data.isConfirmed) {
                TopicService.putUpdateATopicService({
                    _id: topic._id,
                    topic: {
                        acceptanceCouncilId: "",
                        acceptanceResult: TopicResultEnum.WAITING
                    }
                })
                .then((data) => {
                    const newTopics = council.topicGeneralInfos?.filter((info) => info._id !== topic._id )
                    setCouncil({
                        ...council,
                        numTopics: newTopics?.length,
                        topicGeneralInfos: newTopics
                    })
                })
            }
        })
    }

    const onChangeTopicResult = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const beforeValue = topic.acceptanceResult;
        (council.topicGeneralInfos as TopicInCouncilIntf[])[index].acceptanceResult = "loading...";
        setCouncil({...council})
        if (value !== beforeValue) {
            if(value === TopicResultEnum.QUALIFIED){
                TopicService.putUpdateATopicService({
                    _id: topic._id,
                    topic: {
                        acceptanceResult: value,
                        status: TopicStatusEnum.FINISHED
                    }
                }).then((data) => {
                    (council.topicGeneralInfos as TopicInCouncilIntf[])[index].acceptanceResult = value;
                    setCouncil({...council})
                })
                .catch((data) => {
                    (council.topicGeneralInfos as TopicInCouncilIntf[])[index].acceptanceResult = beforeValue;
                    setCouncil({...council})
                })
            }
            else if(value === TopicResultEnum.NON_QUAFILIED){
                TopicService.putUpdateATopicService({
                    _id: topic._id,
                    topic: {
                        acceptanceResult: value,
                        status: TopicStatusEnum.FAIL_ACCEPT
                    }
                }).then((data) => {
                    (council.topicGeneralInfos as TopicInCouncilIntf[])[index].acceptanceResult = value;
                    setCouncil({...council})
                })
                .catch((data) => {
                    (council.topicGeneralInfos as TopicInCouncilIntf[])[index].acceptanceResult = beforeValue;
                    setCouncil({...council})
                })
            }
            else{
                TopicService.putUpdateATopicService({
                    _id: topic._id,
                    topic: {
                        acceptanceResult: value,
                        status: TopicStatusEnum.DUE_TO_ACCEPT
                    }
                }).then((data) => {
                    (council.topicGeneralInfos as TopicInCouncilIntf[])[index].acceptanceResult = value;
                    setCouncil({...council})
                })
                .catch((data) => {
                    (council.topicGeneralInfos as TopicInCouncilIntf[])[index].acceptanceResult = beforeValue;
                    setCouncil({...council})
                })
            }
            
        }
        else {
            (council.topicGeneralInfos as TopicInCouncilIntf[])[index].acceptanceResult = beforeValue;
            setCouncil({...council})
        }
    }

    return (
        <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
            <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
                {index + 1}
            </td>
            <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {topic.name}
            </td>
            <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {topic.topicGivenId? topic.topicGivenId : (<i>Chưa cấp</i>)}
            </td>
            <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {topic.studentName}
            </td>
            <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {instructorList.join(", ")}
            </td>
            <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {topic.type}
            </td>
            <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                <select
                    className="bg-transparent h-[40px] w-28 border border-black border-1 rounded-lg focus:ring-blue-500 px-2 outline-none"
                    value={topic.acceptanceResult? topic.acceptanceResult : TopicResultEnum.WAITING}
                    onChange={onChangeTopicResult}
                >
                    {Object.values(TopicResultEnum).map((value) => {
                        return <option value={value} key={value}>{value}</option>
                    })}
                    <option hidden value={"loading..."} key="loading...">loading...</option>
                </select>
            </td>
            <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer"
                    onClick={onClickDeleteBtn}
                >
                    Xóa
                </div>
            </td>
            
        </tr>
    );
}; 