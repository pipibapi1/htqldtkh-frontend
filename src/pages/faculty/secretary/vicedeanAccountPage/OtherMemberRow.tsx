import React, { useState, Fragment } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";
import Modal from "./Modal";

interface Props {
    index: number
    memberOrder: string
  }

const OtherMemberRow: React.FC<Props> = (props) => {
    const {index, memberOrder} = props;
    const [showModal, setShowModal] = useState<boolean>(false);

    return(
    <Fragment>
    <tr className='border-t-2 border-black transition duration-300 ease-in-out'>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2 border-b-2'>
        {memberOrder}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        Nguyễn Văn A
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        111111
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        Phochunhiem123
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        ******
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        Phó chủ nhiệm
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        12/02/2023
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer" onClick={() => setShowModal(true)}>
          Cập nhật
        </div>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <Link to={"/"}>
            <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
                Xóa
            </div>
        </Link>
      </td>
      
    </tr>
    <Modal isVisible = {showModal} onClose = {() => setShowModal(false)}/>
    </Fragment>
    
    )
}

export default OtherMemberRow;