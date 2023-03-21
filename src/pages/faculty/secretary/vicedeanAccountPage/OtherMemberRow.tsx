import { useState, Fragment } from 'react';
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import "react-datepicker/dist/react-datepicker.css";

import { AppDispatch } from '../../../../store';

import { deleteAFvdAction } from '../../../../actions/fvdAction';

import Modal from "./Modal";

const RECORD_PER_PAGE = 5;

const OtherMemberRow = (props: any) => {
    const {index, currentPage, vicedean} = props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const displayDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    const removeAnAccount = (e: any) => {
      e.preventDefault();
    
      Swal.fire({
        icon: 'question',
        title: 'Bạn có chắc muốn xóa tài khoản phó chủ nhiệm này?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
    }).then((result) => {
  
        if(result.isConfirmed){
          dispatch(deleteAFvdAction(vicedean._id))
          .then((data) => {
            Swal.fire({
              icon: 'success',
              title: 'Xóa thành công',
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

    return(
    <Fragment>
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        #{(currentPage - 1)*RECORD_PER_PAGE + index}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {vicedean.name}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {vicedean.staffId}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {vicedean.username}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {displayDate(vicedean.accountCreationDate)}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer" onClick={() => setShowModal(true)}>
          Cập nhật
        </div>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <button className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer"
          onClick={removeAnAccount}
        >
            Xóa
        </button>
      </td>
      
    </tr>
    <Modal isVisible = {showModal} onClose = {() => setShowModal(false)} vicedean={vicedean}/>
    </Fragment>
    
    )
}

export default OtherMemberRow;