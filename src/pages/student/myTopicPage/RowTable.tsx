import React, { Fragment, useState } from 'react';
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';

import { AppDispatch } from '../../../store';

import { TopicStatusEnum } from '../../../shared/types/topicStatus';
import { Toast } from '../../../shared/toastNotify/Toast';
import { displayDate, displayPeriod } from '../../../shared/functions';

import { deleteRemoveATopicAction } from '../../../actions/topicAction';

import Modal from './Modal';

import EditIcon from '../../../assets/images/edit.png';
import RemoveIcon from '../../../assets/images/remove.png';
import DisableRemoveIcon from '../../../assets/images/disable-remove.png';

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

const RECORD_PER_PAGE = 5;

const RowTable: React.FC<Props> = (props) => {
  const { index, _id, topicGivenId, topicName, topicType, topicStatus, topicExtensionStatus,
    createdDate, time, period, currentPage, startTime, endTime, productId } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const useAppDispatch: () => AppDispatch = useDispatch
  const dispatch = useAppDispatch()

  const handleDeleteATopic = (e: any) => {
    e.preventDefault();

    Swal.fire({
      icon: 'warning',
      title: 'Cảnh báo! Những dữ liệu liên quan cũng sẽ bị xóa theo! Bạn có chắc muốn xóa đề tài?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
    }).then((result) => {

      if (result.isConfirmed) {
        dispatch(deleteRemoveATopicAction(_id))
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Xóa thành công',
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: 'OK',
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                window.location.reload()
              }
            })

          })
          .catch((error) => {

            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              if (error.response.status === 400) {
                Toast.fire({
                  icon: 'error',
                  title: 'Bad request'
                })
              }
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              Toast.fire({
                icon: 'error',
                title: error.request
              })
            } else {
              // Something happened in setting up the request that triggered an Error
              Toast.fire({
                icon: 'error',
                title: error.message
              })
            }
          });
      }

      if (result.isDenied) {

      }
    })
  }

  return (
    <Fragment>
      <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
        <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
          #{(currentPage - 1) * RECORD_PER_PAGE + index}
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
        <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
          <img src={EditIcon} onClick={(e) => { setShowModal(true) }} className='h-4 m-4 hover:cursor-pointer' alt="" />
        </td>
        {/* <td className='text-center text-sm px-6 py-1 border-l-2'>
        <Link to={`/myTopic/${_id}/topicDetail`}>
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
                Chi tiết
            </div>
        </Link>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {
          (topicStatus === TopicStatusEnum.NEW || topicStatus === TopicStatusEnum.CANCELED)?
          (<div className="text-[#A3A3A3] font-semibold">
          Sản phẩm
          </div>):

        (<Link to={`/myTopic/${_id}/topicProduct`} state={{startTime: startTime, endTime: endTime}}>
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
            Sản phẩm
            </div>
        </Link>)
        }
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
      {topicStatus === TopicStatusEnum.CANCELED?
        (<div className="text-[#A3A3A3] font-semibold">
          Giấy tờ liên quan
        </div>):
        (<Link to={`/myTopic/${_id}/topicPapers`}>
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
            Giấy tờ liên quan
            </div>
        </Link>)
      }
      </td> */}
        <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
          {
            topicStatus === TopicStatusEnum.NEW ?
              (<button className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer"
                onClick={handleDeleteATopic}
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
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}
        topic={
          {
            _id: _id,
            name: topicName,
            topicGivenId: topicGivenId,
            type: topicType,
            createdDate: createdDate,
            startTime: startTime,
            endTime: endTime,
            periodValue: period,
            status: topicStatus,
            topicExtensionStatus: topicExtensionStatus,
          }
        }
      />
    </Fragment>
  );
};

export default RowTable;
