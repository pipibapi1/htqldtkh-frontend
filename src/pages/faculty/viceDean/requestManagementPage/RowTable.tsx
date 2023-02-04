import React from 'react';
import { RequestType } from '../../../../shared/types/requestType';
import { RequestStatus } from '../../../../shared/types/requestStatus';

interface Props {
  index: number
  requestId: string;
  requestType: RequestType;
  requestStatus: RequestStatus;
  topicName: string;
  topicRegister: string;
  createdDate: string;
  additionalInfor: string;
}

const RowTable: React.FC<Props> = (props) => {
  const { index ,requestId, requestType, requestStatus, topicName,topicRegister, createdDate, additionalInfor} = props;

  const displayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  return (
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
       
        #{index}
  
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {requestType}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {requestStatus}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicName}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {topicRegister}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {displayDate(createdDate)}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {additionalInfor}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {(requestStatus === RequestStatus.WAIT_APPROVAL ? (<button>
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
                Duyệt
            </div>
        </button>) : (<button disabled>
            <div className="text-[#A3A3A3] font-semibold no-underline">
                Duyệt
            </div>
        </button>
        )
        )
        }
      </td>
      
    </tr>

  );
};

export default RowTable;
