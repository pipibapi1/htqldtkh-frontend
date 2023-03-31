import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Calendar from "../../../assets/images/calendar.png";

interface Props {
    index: number
    memberOrder: string
  }

const OtherMemberRow: React.FC<Props> = (props) => {
    const {index, memberOrder} = props;
    const [birhtDate, setBirthDate] = useState(new Date());

    return(
    <tr className='border-t-2 transition duration-300 ease-in-out'>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
        {memberOrder}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <input
            type="text"
            name="firstAndMiddleName"
            className="w-full border border-black border-1 rounded-md p-2"
        />
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <input
            type="text"
            name="name"
            className="w-full border border-black border-1 rounded-md p-2"
        />
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <input
            type="text"
            name="studentId"
            className="w-full border border-black border-1 rounded-md p-2"
        />
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <div className="">
            <select
                className="bg-white w-full h-10 border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                    onChange={(e) => {
                    }}
                    defaultValue={"dfdasf"}
                    >
                    <option value="">Nam</option>
                    <option value="">Nữ</option>
            </select>
        </div>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <div className='flex grid justify-items-end items-center'>
            <DatePicker
            onChange={date => {
              if(date){
                setBirthDate(date);
              }
            }}
            selected={birhtDate}
            dateFormat="dd/MM/yyyy"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            locale="vi"
            className="w-full h-10 border border-black border-1 rounded-lg px-2"
            />
            <div className='absolute mr-2'>
                <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
            </div>
        </div>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <div className="">
            <select
                className="bg-white w-full h-10 border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                    onChange={(e) => {

                    }}
                    >
                    <option value="">Chính quy</option>
                    <option value="">Chất lượng cao</option>
                    <option value="">Kỹ sư tài năng</option>
            </select>
        </div>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <input
            type="text"
            name="email"
            className="w-full border border-black border-1 rounded-md p-2"
        />
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <input
            type="text"
            name="phoneNumber"
            className="w-full border border-black border-1 rounded-md p-2"
        />
      </td>
    </tr>
    )
}

export default OtherMemberRow;