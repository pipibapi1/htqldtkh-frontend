import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { AppDispatch } from '../../../store';

import { MyTopic } from '../../../shared/interfaces/topicInterface';
import { displayDate, displayPeriod } from '../../../shared/functions';

import { getTopicDetailAction } from '../../../actions/topicAction';

const TopicDetailModal = ({isVisible, onClose, topicId}: {isVisible: boolean, onClose: any, topicId: string}) => {
    const topicData: MyTopic = {
        _id: "1",
        name: "Example Topic",
        topicGivenId: "",
        type: "Example Type",
        startTime: "",
        endTime: "",
        creationDate: "",
        period: "1",
        status: "1",
        isExtended: false,
        extensionTime: 0,
        periodValue: "",
        studentId: "",
        productId: "",
        expense: 1,
        student:{
            _id: "", 
            name: "",
            studentId: "",
            educationType: "",
            gender: "",
            email: "",
            phoneNumber: "",
            birthDate: ""
        },
        instructors:[{
            _id: "1",
            name: "1",
            staffId: "1",
            gender: "1",
            email: "1",
            phoneNumber: "1",
            academyRank: "",
            degree: "1",
            },
            {
                _id: "1",
                name: "1",
                staffId: "1",
                gender: "1",
                email: "1",
                phoneNumber: "1",
                academyRank: "",
                degree: "1",
            }],

        instructorsId:["1", "2"],
        otherMembers: [{
            studentId: "1",
            name: "1",
            gender: "1",
            email: "1",
            phoneNumber: "1",
            educationType: "1",
            birthDate: "2001-09-06T16:00:00.000Z"
        },
        {
            studentId: "1",
            name: "1",
            gender: "1",
            email: "1",
            phoneNumber: "1",
            educationType: "1",
            birthDate: "2001-09-06T16:00:00.000Z"
        }]
    }

    const [topic, setTopic] = useState<MyTopic>(topicData);

    useEffect(() => {
        if(topicId){
            dispatch(getTopicDetailAction(topicId))
                    .then((data) => {
                        setTopic(data?.topic);
                    }
                    )
                    .catch((error) => {
        
                    })
        }
    }, []);
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()
    if (!isVisible) return null;
    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }

    return ( 
        <div className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center z-40" id= "wrapper" onClick={handleClose}>
            <div className = "md:w-[600px] w-[90%] mx-auto">
                <div className = 'bg-white rounded px-5 py-7'>
                    <div className = 'mb-2 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                    {topic.name}
                    </div>
                    <div className = "space-y-5 px-5 py-2">
                    <div className = "space-y-3">
                <div className = 'flex items-center px-5'>
                    <label htmlFor='text' className = "w-[80px] text-sm font-semibold mr-1">
                        Tên đề tài: 
                    </label>
                    <div className = "w-1/2 text-gray-900 text-sm">
                            {topic.name}
                    </div>
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[80px] mr-1">
                            Mã đề tài: 
                        </label>
                        <div className = "w-1/2 text-gray-900 text-sm">
                            {topic.topicGivenId === "" ? "Chưa được cấp" : topic.topicGivenId}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Loại đề tài: 
                        </label>
                        <div className = "w-1/2 text-gray-900 text-sm">
                            {topic.type}
                        </div>
                    </div>
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[80px] mr-1">
                            Ngày tạo: 
                        </label>
                        <div className = "w-1/2 text-gray-900 text-sm">
                            {displayDate(topic.creationDate)}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Thời gian thực hiện: 
                        </label>

                        <div className = "w-1/2 text-gray-900 text-sm">
                            {displayDate(topic.startTime)} - {displayDate(topic.endTime)}
                        </div>
                    </div>
                </div>

                <div className = 'flex flex-row px-5'>
                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[80px] mr-1">
                            Đợt: 
                        </label>
                        <div className = "w-1/2 text-gray-900 text-sm">
                            {displayPeriod(topic.periodValue)}
                        </div>
                    </div>

                    <div className = 'flex flex-row items-center w-1/2'>
                        <label htmlFor='text' className = "text-sm font-semibold w-[160px] mr-1">
                            Trạng thái: 
                        </label>
                        <div className = "w-1/2 text-gray-900 text-sm">
                            {topic.status}
                        </div>
                    </div>
                </div>

                <div className = 'flex items-center px-5'>
                    <label htmlFor='text' className = "text-sm font-semibold w-[80px] mr-1">
                        Gia hạn: 
                    </label>
                    <div className = "w-1/2 text-gray-900 text-sm">
                        {topic.isExtended? `Thời gian gia hạn: ${topic.extensionTime} tháng` : "Không"}
                    </div>
                </div>
            </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default TopicDetailModal;