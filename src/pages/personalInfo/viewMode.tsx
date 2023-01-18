import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import Calendar from "../../assets/images/calendar.png";

interface Props {
    onViewMode: (e: Boolean) => void;
    onEditMode: (e: Boolean) => void;
}

const testInfo = {
    id: 1,
    role: "Sinh viên",
    surname_MiddleName: "Trương Anh",
    lastName: "Khoa",
    userID: "1913828",
    gender: "Nam",
    birthday: "2001-03-24",
    educationProgram: "Chính quy",
    email: "khoa.truong2001@hcmut.edu.vn",
    phone: "0386206317",
    educationProgram_test: [
        "Chính quy",
        "OISP",
        "Kĩ sư tài năng"
    ],
}

const handleUpdate = (id: number) => {

}

const ViewMode:React.FC<Props> = (props: Props) => {
    
    const {onViewMode} = props;
    const {onEditMode} = props;
    const [editMode, setEditMode] = React.useState(false)
    const [currentInfo, setCurrentInfo] = React.useState({})
    const [newInfo, setNewInfo] = React.useState({})
    const [birthDate, setBirthDate] = useState(new Date());

    const getInfo = () => {
        setCurrentInfo(currentInfo)
    }

    const updateInfo = () => {
        setEditMode(!editMode)  
        setCurrentInfo(newInfo)
    }

    const cancelUpdate = () => {
        setEditMode(!editMode)
    }

    return(
        <div className='p-5 grid grid-cols-3'>
            <div className= 'col-span-2'>
            <div className='flex items-center mb-5 '>
            
                        <div className='mr-5'>
                                Vai trò:
                        </div>
                        {!editMode && 
                        <div className="ml-6">
                            {testInfo.role}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={testInfo.role} onChange={
                                    (e) => {setNewInfo({...newInfo, role: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                        }
            </div>
            

            
            <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        Họ và tên lót: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {testInfo.surname_MiddleName}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={testInfo.surname_MiddleName} onChange={
                                    (e) => {setNewInfo({...newInfo, surname_MiddleName: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                        }
            </div>

            <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        Tên: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {testInfo.lastName}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={testInfo.lastName} onChange={
                                    (e) => {setNewInfo({...newInfo, lastName: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                        }
            </div>

            <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        MSSV: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {testInfo.userID}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={testInfo.userID} onChange={
                                    (e) => {setNewInfo({...newInfo, userID: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                    }
            </div>

            <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        Giới tính: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {testInfo.gender}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                {/* <input type="text" defaultValue={testInfo.gender} onChange={
                                    (e) => {setNewInfo({...newInfo, gender: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/> */}

                                <select
                                        className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-md focus:ring-blue-500 px-2"
                                        onChange={(e) => {
                                            setNewInfo({...newInfo, gender: e.target.value})
                                        }}
                                        defaultValue={testInfo.gender}
                                    >
                                        <option value="">Nam</option>
                                        <option value="">Nữ</option>
                                    </select>
                        </div>
                        }
            </div>

            <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        Ngày tháng năm sinh: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {testInfo.birthday}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6 grid justify-items-end items-center">
                                {/* <input type="text" defaultValue={testInfo.birthday} onChange={
                                    (e) => {setNewInfo({...newInfo, birthday: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/> */}
                                <DatePicker
                                    onChange={date => {
                                        if(date){
                                            setBirthDate(date);
                                        }
                                    }}
                                    selected={birthDate}
                                    dateFormat="dd/MM/yyyy"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    locale="vi"
                                    className="h-[40px] w-[270px] border border-black border-1 rounded-md px-2"
                                    />
                                    <div className='absolute mr-2'>
                                        <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                                    </div>
                        </div>
                        }
            </div>

            <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        Chương trình đào tạo: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {testInfo.educationProgram}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                  <select
                                        className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-md focus:ring-blue-500 px-2"
                                        onChange={(e) => {
                                            setNewInfo({...newInfo, educationProgram: e.target.value})
                                        }}
                                        defaultValue={testInfo.educationProgram}
                                    >
                                        <option value="">Chính quy</option>
                                        <option value="">Kĩ sư tài năng</option>
                                        <option value="">OISP</option>
                                    </select>
                        </div>
                        }
            </div>

            <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        Email: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {testInfo.email}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={testInfo.email} onChange={
                                    (e) => {setNewInfo({...newInfo, email: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                        }
            </div>

            <div className='flex items-center mb-5'>
                    <div className='mr-5'>
                        Số điện thoại: 
                    </div>
                    {!editMode && 
                        <div className="ml-6">
                            {testInfo.phone}
                        </div>
                        }
                        {editMode && 
                        <div className="ml-6">
                                <input type="text" defaultValue={testInfo.phone} onChange={
                                    (e) => {setNewInfo({...newInfo, phone: e.target.value})}
                                }
                                className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                        }
            </div>
        </div>
        {/* <div className='grid  justify-items-end px-5 col-span-1'>
                <div>
                    <div onClick={() => {onViewMode(false); onEditMode(true)}} className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                    Chỉnh sửa
                    </div>
                </div>
                
        </div> */}
        <div className='grid grid-rows-6 justify-items-end px-5 col-span-1'>
                {!editMode && 
                    <div onClick={() => {
                            setEditMode(!editMode)
                            setNewInfo(testInfo)}
                        } className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer">
                    Chỉnh sửa
                    </div>
                }
                {editMode &&
                    <div onClick={() => {updateInfo()}} className="w-40 h-16 bg-[#209216] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#047636] hover:cursor-pointer">
                Lưu
                </div>
                }
                <div hidden={!editMode}>
                    <div onClick={() => {cancelUpdate()}} className="w-40 h-16 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#B20610] hover:cursor-pointer">
                    Hủy
                    </div>
                </div>
                
                    {/* <div onClick={() => {onViewMode(true); onEditMode(false)}} className="w-40 h-16 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#B20610] hover:cursor-pointer">
                    Hủy
                    </div>
                 */}
                
            </div>


        </div>
    )
}

export default ViewMode;