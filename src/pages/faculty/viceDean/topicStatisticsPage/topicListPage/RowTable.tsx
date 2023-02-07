import React from 'react';
import {Link} from "react-router-dom";

interface Props {
  index: number
  topicId: string;
  topicName: string;
  topicType: string
  topicStatus: string;
  extensionStatus: string;
  topicRegister: string;
  date: string;
}

const RowTable: React.FC<Props> = (props) => {
  const { index ,topicId, topicName, topicType, topicStatus, extensionStatus, topicRegister, date} = props;
 
  return (
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        #{index}
      </td>
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
        {extensionStatus}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicRegister}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {date}
      </td>
      
    </tr>

  );
};

export default RowTable;
