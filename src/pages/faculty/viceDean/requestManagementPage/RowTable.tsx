import React, { Fragment, useState } from 'react';

import { RequestStatus } from '../../../../shared/types/requestStatus';
import { displayDate } from '../../../../shared/functions';

import TopicDetailModal from './TopicDetailModal';

import DetaiIcon from '../../../../assets/images/information.png';

const RECORD_PER_PAGE = 7;

interface Props {
  index: number
  requestId: string;
  requestType: string;
  requestStatus: string;
  topicName: string;
  topicRegister: string;
  createdDate: string;
  additionalInfor: string;
  currentPage: number;
  approveARequest: any;
  refuseARequest: any;
  topicId: string
}

const RowTable: React.FC<Props> = (props) => {
  const { index ,requestId, requestType, requestStatus, topicName,topicRegister, createdDate, additionalInfor, 
    currentPage, approveARequest, refuseARequest, topicId} = props;
    const [topicDetailModal, setTopicDetailModal] = useState<boolean>(false);

  return (
    <Fragment>

      <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
        <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        
          #{(currentPage - 1)*RECORD_PER_PAGE + index}
    
        </td>
        <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
          {requestType}
        </td>
        <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
          {requestStatus}
        </td>
        <td className='flex justify-center items-center text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
          {topicName} <div onClick={(e) => {
            e.preventDefault();
            setTopicDetailModal(true);
          }} className='hover:cursor-pointer'><img src={DetaiIcon} className='h-5'/></div>
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
              <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer"
                onClick = {(e) => {
                  e.preventDefault();
                  approveARequest(requestId)
                }}
              >
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
        <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
          {(requestStatus === RequestStatus.WAIT_APPROVAL ? (<button>
              <div className="text-[#E1000E] font-semibold no-underline hover:underline hover:cursor-pointer"
                onClick = {(e) => {
                  e.preventDefault();
                  refuseARequest(requestId)
                }}
              >
                  Từ chối
              </div>
          </button>) : (<button disabled>
              <div className="text-[#A3A3A3] font-semibold no-underline">
                  Từ chối
              </div>
          </button>
          )
          )
          }
        </td>
        
      </tr>
      <TopicDetailModal isVisible={topicDetailModal} onClose = {() => setTopicDetailModal(false)}
      topicId={topicId}
    />
    </Fragment>

  );
};

export default RowTable;
