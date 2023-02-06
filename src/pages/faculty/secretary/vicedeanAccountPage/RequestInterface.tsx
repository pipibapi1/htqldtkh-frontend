import React, {useState} from 'react';
import OtherMemberRow from './OtherMemberRow';
import {Link} from "react-router-dom";
import EyeOpen from "../../../../assets/images/eyeOpen.png";
import EyeClose from "../../../../assets/images/eyeClose.png"

interface Props {
    numOfInstructor: number;
    numOfOtherMember: number;
}

const RequestInterface:React.FC<Props> = (props: Props) => {

    const {numOfInstructor, numOfOtherMember} = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    let instructors = [];
    for (let index = 1; index <= numOfInstructor; ++index){
        instructors.push(
            <div className='px-2 mb-1'>
                    <div className="">
                        <select
                            className="bg-white h-[40px] w-96 border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                onChange={(e) => {
                                }}
                                defaultValue={"dfdasf"}
                            >
                                <option value="">PGS.TS Nguyễn Văn A - MSCB: 111111</option>
                            <option value="">Ths. Trương Thị Thái Minh - MSCB: 222222</option>
                            <option value="">Ts. Nguyễn An Khương - MSCB: 333333</option>
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
                memberOrder={"Cán bộ " + index}
            />
        )
    }

    return (
        <div className='p-5 min-h-[630px] overflow-hidden'>
            <div className='flex justify-between mb-2'>
                <div className='flex flex-col'>
                    <div className='mb-5'>
                        <div className='font-bold'>
                            Tên đăng nhập: 
                        </div>
                        <input
                        type="text"
                        name="name"
                        className="border border-black border-1 rounded-md w-[800px] h-10 p-2"
                        />
                    </div> 

                    <div className='mb-5'>
                    <div className='font-bold'>
                        Mật khẩu: 
                    </div>
                    <div className='grid justify-items-end items-center'>
                        <input
                            type={showPassword? "text":"password"}
                            name="name"
                            className="border border-black border-1 rounded-md w-[800px] h-10 p-2"
                        />
                        <div className='absolute mr-2'>
                            <button onClick={toggleShowPassword}>
                                {showPassword ? 
                                    (<img src={EyeOpen} alt="eyeIcon" className='h-4 w-5'/>) : 
                                    (<img src={EyeClose} alt="eyeIcon" className='h-4 w-5'/>)
                                }
                            </button>
                        </div>
                    </div>
                    {/* <input
                        type="text"
                        name="name"
                        className="border border-black border-1 rounded-md w-[800px] h-10 p-2"
                    />  */}
                    </div> 
                </div>
                <div className=''>
                    <div>
                        <Link to={'/'} className="">
                            <div className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                            Thêm tài khoản
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
                        Cán bộ Khoa:
                </div>
                {instructors}
            </div>

            <div className=''>
                <div className='font-bold mb-2'>
                    Thông tin cán bộ khác:
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
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Họ và tên
                                    </th>
                                    {/* <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Tên
                                    </th> */}
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        MSCB
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Tên Đăng Nhập
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Mật khẩu
                                    </th>
                                    {/* <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Ngày sinh
                                    </th> */}
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Vai trò
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Ngày tạo
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        
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

export default RequestInterface;