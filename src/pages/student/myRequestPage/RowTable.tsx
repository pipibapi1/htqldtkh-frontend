import React from 'react';
import {Link} from "react-router-dom";

interface Props {
  index: number
  requestId: string;
  requestType: string;
  requestStatus: string
  topicId: string;
  createdDate: string;
  additionalInfor: string;
}

const RowTable: React.FC<Props> = (props) => {
  const { index ,requestId, requestType, requestStatus, topicId, createdDate, additionalInfor} = props;

  return (
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        {requestId}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {requestType}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {requestStatus}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicId}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {createdDate}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {additionalInfor}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <Link to={"/"}>
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
                Xóa
            </div>
        </Link>
      </td>
      
    </tr>

  );
};

export default RowTable;
