import React, {useState} from 'react';
import {Link} from "react-router-dom";

import { CouncilInfoIntf } from '../../../../../../shared/interfaces/councilInterface';
import CouncilService from '../../../../../../services/councilService';
import Swal from 'sweetalert2';

interface Props {
  index: number;
  council: CouncilInfoIntf,
  onDelete: any
}

const RowTable: React.FC<Props> = (props) => {
  const { index, council, onDelete } = props;

  const displayTime = () => {
    const arr = council.date.split("-");
    arr.reverse();
    return council.time + ` ngày ${arr.join("/")}`
  }

  const onClickDeleteCouncil = () => {
    Swal.fire({
        icon: 'warning',
        text: 'Bạn có chắc chắn muốn xóa hội đồng này không?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: "Hủy"
    }).then((result) => {
        if (result.isConfirmed) {
          CouncilService.deleteCouncil(council._id as string)
            .then((data) => {
				onDelete(council._id);
				Swal.fire({
					icon: 'success',
					text: 'Xóa hội đồng thành công.',
					showDenyButton: false,
					showCancelButton: false,
					confirmButtonText: 'OK'
				})
            })
        } 
    })
  }

  return (
    
    <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
		<td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
			{index}
		</td>
		<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
			{council.name}
		</td>
		<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
			{council.numMembers}
		</td>
		<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
			{displayTime()}
		</td>
		<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
			{council.numTopics}
		</td>
		<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
			{council.status}
		</td>
		<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
		<Link to={`/fsReviewCouncil/${council._id}`}>
			<div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
			Chi tiết
			</div>
		</Link>
		</td>
		<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
			<div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer"
			onClick={onClickDeleteCouncil}
			>
			Xóa
			</div>
		</td>
      
    </tr>   
  );
};

export default RowTable;
