import React from 'react';
import { TopicStatusEnum } from '../../../../../shared/types/topicStatus';
const RECORD_PER_PAGE = 5;

interface Props {
  index: number;
  _id: string;
  topicGivenId: string;
  topicName: string;
  topicType: string;
  topicStatus: string
  topicExtensionStatus: string;
  createdDate: string;
  time: string;
  period: string;
  currentPage: number;
  startTime: string;
  endTime: string;
  productId: string
}

const RowTable: React.FC<Props> = (props) => {
  const { index, _id ,topicGivenId,topicName, topicType, topicStatus, topicExtensionStatus, 
    createdDate, time, period, currentPage, startTime, endTime, productId } = props;
    const displayDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
    const displayPeriod = (dateStr: string) => {
      const date = new Date(dateStr);
      return (date.getMonth() + 1) + "/" + date.getFullYear();
    }
  
  return (
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        #{(currentPage - 1)*RECORD_PER_PAGE + index}
      </td>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        {topicGivenId === "" ? "Chưa được cấp" : topicGivenId}
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
        {displayDate(createdDate)}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {time}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {displayPeriod(period)}
      </td>
      <td className='text-center text-sm px-6 py-1 border-l-2'>
        {/* <Link to={`/myTopic/${_id}/topicDetail`}> */}
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
                Chi tiết
            </div>
        {/* </Link> */}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {
          topicStatus === TopicStatusEnum.NEW?
          (<div className="text-[#A3A3A3] font-semibold">
          Sản phẩm
          </div>):

        // (<Link to={`/myTopic/${_id}/topicProduct`} state={{startTime: startTime, endTime: endTime}}>
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
            Sản phẩm
            </div>
        /* </Link>) */
        }
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {/* <Link to={`/myTopic/${_id}/topicPapers`}> */}
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
            Giấy tờ liên quan
            </div>
        {/* </Link> */}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
      {

          <button className="text-[#A3A3A3] font-semibold no-underline"
            disabled
          >
          Xóa
      </button>
          }
  
      </td>
      
    </tr>

  );
};

export default RowTable;
