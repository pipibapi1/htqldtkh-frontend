import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import Modal from "./Modal";

interface Props {
  index: number
  accountId: string;
  fullName: string;
  accountName: string;
  password: string
  role: string;
  accountStatus: string;
  createdDate: string;
}

const RowTable: React.FC<Props> = (props) => {
  const { index , accountId, fullName, accountName, password, role,accountStatus, createdDate} = props;
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Fragment>
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        {accountId}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {fullName}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {accountName}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {password}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {role}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {accountStatus}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {createdDate}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer" onClick={() => setShowModal(true)}>
          Duyệt
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
    
  );
};

export default RowTable;
