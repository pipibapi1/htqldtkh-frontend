import React, { useState, useEffect, MouseEvent } from "react";
import { useCouncilDetailContext } from "./CouncilDetailContext";
import topicService from "../../../../../../services/topicService";
import councilService from "../../../../../../services/councilService";
import { TopicInCouncilIntf } from "../../../../../../shared/interfaces/councilInterface";
import Swal from "sweetalert2";

const AddTopicToCouncilModal = ({onClose} : {onClose: any}) => {
    const {council, setCouncil} = useCouncilDetailContext();
    const [listTopic, setListTopics] = useState<TopicInCouncilIntf[]>([]);
    const [chosenTopic, setChosenTopic] = useState<TopicInCouncilIntf[]>([]);

    useEffect(() => {
        const queryData = {
            period: council.period,
            acceptanceCouncil: ""
        }
        topicService.getTopicListService(queryData)
            .then((data) => {
                setListTopics(data.topics);
            })
    }, [council.period])

    const onClickConfirmBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newTopics = chosenTopic.map(topic => topic._id);
        councilService.postAddTopicToCouncil(council._id as string, newTopics)
            .then((data) => {
                setCouncil({
                    ...council,
                    numTopics: council.numTopics + chosenTopic.length
                })
                onClose();
            })
            .catch((data) => {
                Swal.fire({
                    icon: 'error',
                    text: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'OK'
                })
            })
    }

    return (
        <div 
            className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex flex-col justify-center items-center z-40" 
            id= "wrapper" 
        >
            <div className = "md:w-[700px] w-[90%] mx-auto max-h-[90%] bg-white rounded overflow-y-auto mx-auto">
                <div className="flex flex-col">
                    <div className = 'my-4 pb-2 text-xl font-medium text-gray-900 text-center'>
                        Thêm đề tài
                    </div>
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
                                        chosenTopic={chosenTopic}
                                        setChosenTopic={setChosenTopic}
                                    ></TopicInCouncil>
                                })
                            ) : null}
                        </div>
                        <div className="w-1/2 px-2 py-1 ml-1 border border-black rounded-r flex flex-col justify-start items-center">
                            <div className="w-full text-center bg-[#1488d8]/40 mb-1">
                                Đề tài đã chọn
                            </div>
                            {chosenTopic.map((topic) => {
                                return <TopicInCouncil
                                    key={topic._id}
                                    topic={topic}
                                    chosenTopic={chosenTopic}
                                    setChosenTopic={setChosenTopic}
                                ></TopicInCouncil>
                            })}
                        </div>
                    </div>
                    <div className = 'my-4 py-2 text-gray-900 text-center w-full flex flex-row justify-evenly'>
                        <button
                            className="w-24 h-12 rounded border-2 border-[#e1000e] text-[#e1000e] text-center bg-white font-medium"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button 
                            className="w-24 h-12 rounded border-2 border-[#1488d8] text-[#1488d8] text-center bg-white font-medium"
                            onClick={onClickConfirmBtn}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface TopicInCouncilProps {
    topic: TopicInCouncilIntf,
    chosenTopic: TopicInCouncilIntf[],
    setChosenTopic: any
}

const TopicInCouncil = (props: TopicInCouncilProps) => {
    const {topic, chosenTopic, setChosenTopic} = props;
    const idxInChosenList = (chosenTopic.findIndex((ele) => ele._id === topic._id));

    const onChooseTopic = (e: MouseEvent<HTMLButtonElement>) => {
        chosenTopic.push(topic);
        setChosenTopic(chosenTopic.map(ele => ele));
    }

    const onUncheckTopic = (e: MouseEvent<HTMLButtonElement>) => {
        const newChosenTopics = chosenTopic.filter((ele) => ele._id !== topic._id);
        setChosenTopic(newChosenTopics);
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
                <button className="border border-green-500 rounded text-sm font-medium text-green-500 w-12"
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

export default AddTopicToCouncilModal;