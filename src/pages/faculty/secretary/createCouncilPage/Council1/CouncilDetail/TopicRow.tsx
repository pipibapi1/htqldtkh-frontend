import { TopicInCouncilIntf } from "../../../../../../shared/interfaces/councilInterface";
import TopicService from "../../../../../../services/topicService";
import Swal from "sweetalert2";

interface Props {
    index: number,
    topic: TopicInCouncilIntf,
    onDelete: (topicId: string) => void
}

export const TopicRow: React.FC<Props> = (props) => {
    const { index , topic, onDelete} = props;

    const instructorList = topic?.instructorsName? topic.instructorsName : [];

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
                        reviewCouncilId: ""
                    }
                })
                .then((data) => {
                    onDelete(topic._id)
                })
            }
        })
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
                {topic.topicGivenId}
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
                {topic.reviewResult}
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