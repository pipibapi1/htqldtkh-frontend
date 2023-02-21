import React, {Fragment, useState} from 'react';
import { RequestStatus } from '../../../shared/types/requestStatus';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../store';
import Swal from 'sweetalert2';
import { deleteRemoveARequestAction } from '../../../actions/requestAction';
import TopicDetailModal from './TopicDetailModal';
import DetaiIcon from '../../../assets/images/information.png';

const RECORD_PER_PAGE = 7;

interface Props {
  index: number
  requestId: string;
  requestType: string;
  requestStatus: string
  createdDate: string;
  topicName: string;
  additionalInfor: string;
  currentPage: number;
  periodValue: string;
  topicId: string;
}

const RowTable: React.FC<Props> = (props) => {
  const { index ,requestId, requestType, requestStatus, topicName, createdDate, additionalInfor, 
    currentPage, periodValue,topicId} = props;
  const displayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }
  const displayPeriod = (dateStr: string) => {
    const date = new Date(dateStr);
    return (date.getMonth() + 1) + "/" + date.getFullYear();
  }
  const [topicDetailModal, setTopicDetailModal] = useState<boolean>(false);
  const useAppDispatch: () => AppDispatch = useDispatch
  const dispatch = useAppDispatch()
  const removeARequest = (e:any) => {
    e.preventDefault()
    const _id = requestId;
    Swal.fire({
      icon: 'question',
      title: 'Bạn có chắc muốn xóa yêu cầu này?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
  }).then((result) => {

      if(result.isConfirmed){
        dispatch(deleteRemoveARequestAction(_id))
        .then((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Xóa yêu cầu thành công',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'OK',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              window.location.reload();
            } 
          })
          }
        )
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Có lỗi gì đó đã xảy ra, thử lại sau!',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'OK',
          })
        })
      }

      if(result.isDenied){
      }
  })
  }
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
        {displayPeriod(periodValue)}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
      {displayDate(createdDate)}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {additionalInfor}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
      {
            requestStatus === RequestStatus.WAIT_APPROVAL?
          (<button className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer"
            onClick={removeARequest}
          >
              Xóa
          </button>) : 
          (<button className="text-[#A3A3A3] font-semibold no-underline"
            disabled
          >
          Xóa
      </button>)
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
