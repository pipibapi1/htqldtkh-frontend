import React from 'react';
import {Link} from "react-router-dom";

interface Props {
  index: number
  topicId: string;
  topicName: string;
  topicType: string;
  topicStatus: string
  topicExtensionStatus: string;
  createdDate: string;
  time: string;
  period: string
}

const RowTable: React.FC<Props> = (props) => {
  const { index ,topicId,topicName, topicType, topicStatus, topicExtensionStatus, createdDate, time, period } = props;
  const _id = "testId";
  return (
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        {topicId}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicName}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicType}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicStatus}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicExtensionStatus}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {createdDate}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {time}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {period}
      </td>
      <td className='text-center text-sm px-6 py-1 border-l-2'>
        <Link to={`/myTopic/${_id}/topicDetail`}>
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
                Chi tiết
            </div>
        </Link>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <Link to={`/myTopic/${_id}/topicProduct`}>
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
            Sản phẩm
            </div>
        </Link>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <Link to={`/myTopic/${_id}/topicPapers`}>
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
            Giấy tờ liên quan
            </div>
        </Link>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
          <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
            Xóa
          </div>
  
      </td>
      
    </tr>

  );
};

export default RowTable;
