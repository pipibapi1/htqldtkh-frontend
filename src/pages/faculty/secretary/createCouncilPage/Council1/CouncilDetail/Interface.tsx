import React, {useState, Fragment} from 'react';
import Calendar from "../../../../../../assets/images/calendar.png";
import DatePicker from "react-datepicker";
import AddMemberModal from '../AddMemberCouncilModal';
import AddTopicModal from '../AddTopicModal';
import { MemberTable } from './MemberTable';
import { TopicTable } from './TopicTable';

interface Props {
    onViewMode: (e: Boolean) => void;
    onEditMode: (e: Boolean) => void;
} 

const Interface: React.FC<Props> = (props: Props) => {
    const [editMode, setEditMode] = React.useState(false);
    const [birthDate, setBirthDate] = useState(new Date());
    const cancelUpdate = () => {
        setEditMode(!editMode)
    }
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModal2, setShowModal2] = useState<boolean>(false);
    return (
    <Fragment>
        <div className=''>
            <div className='p-5 min-h-[625px] overflow-hidden'>
            <div className='flex justify-between mb-2'>
                <div className='flex flex-col'>
                    <div className='mb-5'>
                        <div className='font-bold text-3xl'>
                            Hội đồng 1
                        </div>
                    </div> 
                    {!editMode && 
                    <div className='mb-5'>
                    <div>
                        <div>
                            Trạng thái: <span className='text-[#030391]'>Chưa gửi thông báo</span> 
                        </div>
                        <div>
                            Địa điểm: <span className='text-[#030391]'> Phòng 309 tòa B9, ĐHBK TPHCM</span> 
                        </div>
                        <div>
                            Thời gian diễn ra: <span className='text-[#030391]'>15/12/2022</span> 
                        </div>
                    </div>
                    </div>
                    }
                    {editMode && 
                    <div className='mb-5'>
                        <div className='mb-3'>
                            Trạng thái: <select className = "bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2">
                                <option value="">Chưa gửi thông báo</option>
                                <option value="">Chờ xác nhận</option>
                                <option value="">Đã xác nhận</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            Địa điểm: <input
                                type="text"
                                className="border border-black border-1 rounded-md w-[400px] h-10 p-2"
                                placeholder= "Phòng 309 tòa B9, ĐHBK TPHCM"
                        />
                        </div>
                        <div className='flex flex-row'>
                            <div className = 'py-2 pr-1'>Thời gian diễn ra: </div> 
                            <div className = "grid justify-items-end items-center">
                                
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
                                    className="border border-black border-1 rounded-md w-[200px] h-10 p-2"
                                    />
                                    <div className='absolute mr-2'>
                                        <img src={Calendar} alt="calendarIcon" className='h-5 w-5'/>
                                    </div>
                                </div>
                        </div>
                    </div>
                    }  
                </div>
            {!editMode && 
                <div className='flex flex-row'>
                    <div>
                        <button className="w-40 bg-[#14c437] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#13d633] hover:cursor-pointer">              
                            <div>
                                Gửi thông báo
                            </div>
                        </button>
                    </div>
                    <div>
                    <button 
                        onClick={() => {
                        setEditMode(!editMode)
                        }
                    }
                    className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                    >
                        Sửa thông tin
                    </button>
                    </div>
                </div>
            }
            {editMode && 
                <div className='flex flex-row'>
                    <div>
                        <button className="w-40 bg-red-700 hover:bg-red-700 flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:cursor-pointer" onClick={() => {cancelUpdate()}}>              
                            <div>
                                Hủy
                            </div>
                        </button>
                    </div>
                    <div>
                        <button className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer" onClick={() => {cancelUpdate()}}>              
                            <div>
                                Xác nhận
                            </div>
                        </button>
                    </div>
                </div>
            }
            </div>
            <div className='mb-5'>
                <div className='flex justify-between mb-2'>
                    <div className = "font-bold py-4">
                        Danh sách thành viên hội đồng:
                    </div>
                    <button className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer" onClick={() => setShowModal(true)}>              
                        <div>
                            Thêm thành viên
                        </div>
                    </button>
                </div>
                <div>
                <table className='w-full table-fixed border-separate border-spacing-y-1 border-2'>
                                <thead className='bg-[#1577D2] border-b'>
                                    <tr>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        STT
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Tên thành viên
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Giới tính
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Học hàm / Học vị
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Email
                                    </th>
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
                                        Đơn vị công tác
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    <MemberTable
                                    index={1}
                                    memberName={"Thành viên 1"}
                                    gender={"Nam"}
                                    degree={"GS, TS"}
                                    email={"mem1@hcmut.edu.vn"}
                                    role={"Chủ tịch"}
                                    workUnit = {"ĐH Bách Khoa"}
                                    onEditMode = {editMode}
                                    />
                                    <MemberTable
                                    index={2}
                                    memberName={"Thành viên 2"}
                                    gender={"Nữ"}
                                    degree={"PGS, TS"}
                                    email={"mem2@hcmut.edu.vn"}
                                    role={"Ủy viên"}
                                    workUnit = {"ĐH Bách Khoa"}
                                    onEditMode = {editMode}
                                    />
                                    <MemberTable
                                    index={3}
                                    memberName={"Thành viên 3"}
                                    gender={"Nam"}
                                    degree={"Không"}
                                    email={"mem3@hcmut.edu.vn"}
                                    role={"Thư ký"}
                                    workUnit = {"ĐH Bách Khoa"}
                                    onEditMode = {editMode}
                                    />
                                    <MemberTable
                                    index={4}
                                    memberName={"Thành viên 4"}
                                    gender={"Nữ"}
                                    degree={"PGS"}
                                    email={"mem4@hcmut.edu.vn"}
                                    role={"Ủy viên"}
                                    workUnit = {"ĐH CNTT"}
                                    onEditMode = {editMode}
                                    />
                                </tbody>
                            </table>
                </div>
            </div>

            <div className='mb-5'>
                <div className='flex justify-between mb-2'>
                    <div className = "font-bold py-4">
                        Danh sách đề tài:
                    </div>
                    <button className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer" onClick={() => setShowModal2(true)}>              
                        <div>
                            Thêm đề tài
                        </div>
                    </button>
                </div>
                <div>
                <table className='w-full table-fixed border-separate border-spacing-y-1 border-2'>
                                <thead className='bg-[#1577D2] border-b'>
                                    <tr>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        STT
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Tên đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Họ và tên chủ nhiệm
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Họ và tên CBHD
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Thời gian thực hiện
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Sản phẩm
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Ghi chú
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    <TopicTable
                                    index={1}
                                    topicName={"Đề tài 1"}
                                    studentName={"Trần Anh Quân"}
                                    teacherName={"Trương Thị Thái Minh"}
                                    time={"6 tháng"}
                                    product={"Product 1"}
                                    note={"Không"}
                                    onEditMode = {editMode}
                                    />
                                    <TopicTable
                                    index={2}
                                    topicName={"Đề tài 2"}
                                    studentName={"Phạm Minh Duy"}
                                    teacherName={"Trương Thị Thái Minh"}
                                    time={"6 tháng"}
                                    product={"Product 2"}
                                    note={"Không"}
                                    onEditMode = {editMode}
                                    />
                                    <TopicTable
                                    index={3}
                                    topicName={"Đề tài 3"}
                                    studentName={"Trương Anh Khoa"}
                                    teacherName={"Trương Thị Thái Minh"}
                                    time={"6 tháng"}
                                    product={"Product 3"}
                                    note={"Không"}
                                    onEditMode = {editMode}
                                    />
                                </tbody>
                            </table>
                </div>
            </div>
            </div>
        </div>
        <AddMemberModal isVisible = {showModal} onClose = {() => setShowModal(false)}/>
        <AddTopicModal isVisible = {showModal2} onClose = {() => setShowModal2(false)}/>
        </Fragment>
    )
}

export default Interface;