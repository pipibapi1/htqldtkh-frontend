import React from 'react';

import { displayDate } from '../../../../../shared/functions';

const RECORD_PER_PAGE = 10;

interface Props {
  index: number
  topicId: string;
  topicName: string;
  topicType: string
  topicRegister: string;
  expense: number;
  date: string;
  currentPage: number;
}

const RowTable: React.FC<Props> = (props) => {
  const { index ,topicId, topicName, topicType, topicRegister, expense, date, currentPage} = props;

  return (
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        #{(currentPage - 1)*RECORD_PER_PAGE + index}
      </td>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
      {topicId === "" ? "Chưa được cấp" : topicId}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicName}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicType}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicRegister}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {expense.toLocaleString()} VND
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {displayDate(date)}
      </td>
      
    </tr>

  );
};

export default RowTable;
