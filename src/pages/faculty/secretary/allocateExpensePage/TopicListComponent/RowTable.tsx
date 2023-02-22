import React from 'react';
import { Topic } from '../../../../../shared/interfaces/topicInterface';

const RECORD_PER_PAGE = 10;

interface Props {
  index: number
  topic: Topic;
  currentPage: number;
  onOpenTopicExpenseForm: any;
}

const RowTable: React.FC<Props> = (props) => {
  const { index ,topic, currentPage, onOpenTopicExpenseForm} = props;
  
  const onClickChangeBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    onOpenTopicExpenseForm(topic);
  }

  return (
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        #{(currentPage - 1)*RECORD_PER_PAGE + index}
      </td>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
      {topic.topicGivenId === "" ? "Chưa được cấp" : topic.topicGivenId}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topic.name}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topic.type}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topic.student.name}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topic.expense.toLocaleString()} VND
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <button
          className='px-2 py-1 rounded border border-[#1488d8]'
          onClick={onClickChangeBtn}
        >
          Sửa
        </button>
      </td>
    </tr>

  );
};

export default RowTable;
