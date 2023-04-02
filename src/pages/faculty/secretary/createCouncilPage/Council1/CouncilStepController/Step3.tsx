import { useState, useEffect, MouseEvent } from "react";

import { TopicStatusEnum } from "../../../../../../shared/types/topicStatus";
import { TopicInCouncilIntf } from "../../../../../../shared/interfaces/councilInterface";

import topicService from "../../../../../../services/topicService";

import { useStepperContext } from "./StepperContext";

export default function Step3() {
    const {council, setCouncil} = useStepperContext();
    const [listTopic, setListTopics] = useState<TopicInCouncilIntf[]>([]);

    useEffect(() => {
        const queryData = {
            period: council.period,
            status: TopicStatusEnum.READY,
            reviewCouncil: ""
        }
        topicService.getTopicListService(queryData)
            .then((data) => {
                setListTopics(data.topics);
            })
    }, [council.period])

    return (
        <div className="flex flex-col">
            <div className="w-full mx-2">
                Số lượng đề tài đã chọn: {council.numTopics}
            </div>
            <div className="w-full px-2 flex flex-row">
                <div className="w-1/2 px-2 py-1 mr-1 border border-black rounded-l flex flex-col justify-start items-center">
                    <div className="w-full text-center bg-[#1488d8]/40 mb-1">
                        Danh sách đề tài
                    </div>
                    {listTopic.length>0? (
                        listTopic.map((topic) => {
                            return <TopicInCouncil
                                key={topic._id}
                                topic={topic}
                            ></TopicInCouncil>
                        })
                    ) : null}
                </div>
                <div className="w-1/2 px-2 py-1 ml-1 border border-black rounded-r flex flex-col justify-start items-center">
                    <div className="w-full text-center bg-[#1488d8]/40 mb-1">
                        Đề tài đã chọn
                    </div>
                    {council.topics.length>0? (
                        council.topics.map((topic) => {
                            return <TopicInCouncil
                                key={topic._id}
                                topic={topic}
                            ></TopicInCouncil>
                        })
                    ) : null}
                </div>
            </div>
        </div>
    );
}

const TopicInCouncil = (props: {topic: TopicInCouncilIntf}) => {
    const {council, setCouncil} = useStepperContext();
    const topic = props.topic;
    const idxInChosenList = (council.topics.findIndex((ele) => ele._id === topic._id));

    const onChooseTopic = (e: MouseEvent<HTMLButtonElement>) => {
        council.topics.push(topic);
        setCouncil({
            ...council,
            numTopics: council.topics.length
        })
    }

    const onUncheckTopic = (e: MouseEvent<HTMLButtonElement>) => {
        const newChosenTopics = council.topics.filter((ele) => ele._id !== topic._id);
        setCouncil({
            ...council,
            topics: newChosenTopics,
            numTopics: newChosenTopics.length
        })
    }

    return(
        <div className="mx-2 my-2 p-2 rounded flex flex-row mb-1 items-center justify-between w-full border border-[#1488d8] rounded">
            <div className="pr-2">
                <div className="text-base mb-1 font-medium">
                    <p>
                        {topic.name}
                    </p>
                </div>
                <div className="text-sm">
                    {topic.topicGivenId? topic.topicGivenId : ""}
                </div>
            </div>
            {idxInChosenList===-1? (
                <button className="border border-[#0079CC] rounded text-sm font-medium text-[#0079CC] w-12"
                    onClick={onChooseTopic}
                >
                    Chọn
                </button>
            ) : (
                <button className="border border-red-500 rounded text-sm font-medium text-red-500 w-12"
                    onClick={onUncheckTopic}
                >
                    Bỏ
                </button>
            )}
        </div>
    )
}