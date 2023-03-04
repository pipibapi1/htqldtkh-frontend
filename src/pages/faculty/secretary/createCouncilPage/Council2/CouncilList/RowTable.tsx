import React, {useState} from 'react';
import {Link} from "react-router-dom";

interface Props {
  index: number
  councilName: string;
  member: number;
  time: string;
  numOfTopic: number;
  status: string;
}

const RowTable: React.FC<Props> = (props) => {
  const { index , councilName, member, time, numOfTopic,status} = props;

  return (
    
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        {index}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {councilName}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {member}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {time}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {numOfTopic}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {status}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
      <Link to={"/fsCouncil1Detail"}>
        <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
          Chi tiết
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
