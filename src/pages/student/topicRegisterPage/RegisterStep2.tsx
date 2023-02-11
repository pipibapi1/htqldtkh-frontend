import React from 'react';
import OtherMemberRow from './OtherMemberRow';
import {Link} from "react-router-dom";

interface Props {
    numOfInstructor: number;
    numOfOtherMember: number;
    period: any;
}

const RegisterStep2:React.FC<Props> = (props: Props) => {

    const {numOfInstructor, numOfOtherMember, period} = props;

    let instructors = [];
    for (let index = 1; index <= numOfInstructor; ++index){
        instructors.push(
            <div className='px-2 mb-1'>
                    <div>
                        Giáo viên {index}:
                    </div>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-96 border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                onChange={(e) => {
                                }}
                                defaultValue={"dfdasf"}
                            >
                            <option value="">Ths. Trương Thị Thái Minh - MSCB: 111111</option>
                            <option value="">Ts. Nguyễn An Khương - MSCB: 222222</option>
                        </select>
                    </div>
            </div>
        )
    }
    let otherMembers = [];
    for (let index = 1; index <= numOfOtherMember; ++index){
        otherMembers.push(
            <OtherMemberRow
                index={index}
                memberOrder={"Thành viên " + index}
            />
        )
    }

    return (
        <div className='p-5 min-h-[630px] overflow-hidden'>
            <div className='flex justify-between mb-2'>
                <div className='flex'>
                    <div className='mr-40'>
                        <div className='font-bold'>
                            Tên đề tài: 
                        </div>
                        <input
                        type="text"
                        name="name"
                        className="border border-black border-1 rounded-md w-96 h-20 p-2"
                        />
                    </div>
                    <div className=''>
                        <div className='font-bold'>
                            Loại đề tài: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                <option value="">Chính quy</option>
                                <option value="">Chất lượng cao</option>
                                <option value="">Chất lượng cao (LVTN)</option>
                                <option value="">Kỹ sư tài năng</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div>
                        <Link to={'/'} className="">
                            <div className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                            Đăng ký
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/'} className="">
                            <div className="w-40 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#B20610] hover:cursor-pointer">
                            Hủy
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='mb-5'>
                <div className='font-bold mb-2'>
                        Thông tin GVHD:
                </div>
                {/* <div className='px-2'>
                    <div>
                        Giáo viên 1:
                    </div>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-96 border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                onChange={(e) => {
                                }}
                                defaultValue={"dfdasf"}
                            >
                            <option value="">Ths. Trương Thị Thái Minh - MSCB: 111111</option>
                            <option value="">Ths. Trương Thị Thái Minh - MSCB: 111111</option>
                        </select>
                    </div>
                </div> */}
                {instructors}
            </div>

            <div className=''>
                <div className='font-bold mb-2'>
                    Thông tin thành viên khác:
                </div>
                <div className='w-full'>
                <div className='flex flex-col'>
                    <div className=''>
                        <div className='inline-block w-full pr-5'>
                        <div className=''>
                            <table className='w-full table-fixed border-separate border-spacing-y-1 border-2'>
                                <thead className='bg-[#1577D2] border-b'>
                                    <tr>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Họ và tên lót
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Tên
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        MSSV
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Giới tính
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Ngày sinh
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Loại chương trình đào tạo
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Số điện thoại
                                    </th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {otherMembers}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>


        </div>
    )
}

export default RegisterStep2;