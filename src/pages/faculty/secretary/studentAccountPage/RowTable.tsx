import React, {Fragment, useState} from 'react';
import Modal from "./Modal";
import { StudentAccountStatusEnum } from '../../../../shared/types/studentAccountStatus';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';
import { deleteAStudentAction } from '../../../../actions/studentAction';
import Swal from 'sweetalert2';

const RECORD_PER_PAGE = 10;

interface Props {
  index: number
  fullName: string;
  accountName: string;
  accountStatus: string;
  createdDate: string;
  currentPage: number;
  student: any;
}

const RowTable: React.FC<Props> = (props) => {
  const { index , fullName, accountName,accountStatus, createdDate, currentPage, student} = props;
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
      title: 'Bạn có chắc muốn xóa tài khoản sinh viên này?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
  }).then((result) => {

      if(result.isConfirmed){
        dispatch(deleteAStudentAction(student._id))
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

  return (
    <Fragment>
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        #{(currentPage - 1)*RECORD_PER_PAGE + index}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {fullName}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {accountName}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {accountStatus === StudentAccountStatusEnum.waiting? "Chờ duyệt" : "Đã duyệt"}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {displayDate(createdDate)}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {
          accountStatus === StudentAccountStatusEnum.waiting?
        (<button className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer" onClick={() => setShowModal(true)}>
          Xét duyệt
        </button>):
        (<button className="text-[#A3A3A3] font-semibold no-underline" disabled>
        Xét duyệt
      </button>)
        }
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
          {
            accountStatus === StudentAccountStatusEnum.waiting?
          (<button className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer" onClick={removeAnAccount}>
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
    <Modal isVisible = {showModal} onClose = {() => setShowModal(false)} student={student}/>
    </Fragment>
    
  );
};

export default RowTable;
