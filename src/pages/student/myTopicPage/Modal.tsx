import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import { TopicStatusEnum } from '../../../shared/types/topicStatus';

const Modal = ({ isVisible, onClose, topic }: { isVisible: boolean, onClose: any, topic: any }) => {

    if (!isVisible) return null;
    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center z-50" id="wrapper" onClick={handleClose}>
            <div className="md:w-[600px] w-[90%] mx-auto">

                <div className='bg-white rounded px-5 py-7'>
                    <div className='mb-2 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                        Chức năng cho đề tài "{topic.name}"
                    </div>
                    <div className="space-y-5 px-5 py-2 flex flex-col items-center justify-center">
                        <Link to={`/myTopic/${topic._id}/topicDetail`}
                            className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#06609E] hover:cursor-pointer'
                        >
                            Chi tiết
                        </Link>
                        {
                            (topic.status === TopicStatusEnum.NEW || topic.status === TopicStatusEnum.CANCELED) ?
                                (<div className="bg-[#A3A3A3] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2">
                                    Sản phẩm
                                </div>) :

                                (<Link to={`/myTopic/${topic._id}/topicProduct`} state={{ startTime: topic.startTime, endTime: topic.endTime }}
                                    className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#06609E] hover:cursor-pointer'
                                >
                                    Sản phẩm
                                </Link>)
                        }
                        {topic.status === TopicStatusEnum.CANCELED ?
                            (<div className="bg-[#A3A3A3] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2">
                                Giấy tờ liên quan
                            </div>) :
                            (<Link to={`/myTopic/${topic._id}/topicPapers`}
                                className='bg-[#0079CC] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#06609E] hover:cursor-pointer'
                            >
                                <div>
                                    Giấy tờ liên quan
                                </div>
                            </Link>)
                        }
                        <div className='bg-[#E1000E] text-white text-lg font-semibold w-2/3 flex items-center justify-center py-2 hover:bg-[#980B14] hover:cursor-pointer'
                            onClick={onClose}
                        >
                            Hủy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal