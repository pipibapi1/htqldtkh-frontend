import React from 'react';

interface Props {
    onEditMode: (e: Boolean) => void;
    onViewMode: (e: Boolean) => void;
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

const EditMode:React.FC<Props>= (props: Props) => {

    const {onEditMode} = props;
    const {onViewMode} = props;
    const [currentInfo, setCurrentInfo] = React.useState({})
    const [newInfo, setNewInfo] = React.useState({})

    const updateInfo = () => {
        setCurrentInfo(newInfo)
    }

    return (
        <div className='p-5 grid grid-cols-3'>
            <div className = 'col-span-2'>
            <div className='flex items-center mb-5 '>
            
                <div className='mr-5'>
                        Vai trò:
                </div>
                <div className="ml-6">
                <input type="text" defaultValue={testInfo.role} onChange={
                                    (e) => {setNewInfo({...newInfo, role: e.target.value})}
                                }
                    className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                </div>
            </div>

            {/* onChange={
                                    (e) => {setNewInfo({...newInfo, surname_MiddleName: e.target.value})}
                                } */}

                <div className='flex items-center mb-5'>
                        <div className='mr-5'>
                            Họ và tên lót: 
                        </div>
                        <div className="ml-6">
                        <input type="text" defaultValue={testInfo.surname_MiddleName} 
                             className = 'bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2'/>
                        </div>
                </div>

                <div className='flex items-center mb-5'>
                        <div className='mr-5'>
                            Tên: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                    <option value="">Tạo mới</option>
                                    <option value="">Đang thực hiện</option>
                                    <option value="">Đến hạn nghiệm thu</option>
                                    <option value="">Đã hoàn thành</option>
                                    <option value="">Trễ hạn</option>
                                    <option value="">Bị hủy</option>
                            </select>
                        </div>
                </div>

                <div className='flex items-center mb-5'>
                        <div className='mr-5'>
                            MSSV: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                    <option value="">Tạo mới</option>
                                    <option value="">Đang thực hiện</option>
                                    <option value="">Đến hạn nghiệm thu</option>
                                    <option value="">Đã hoàn thành</option>
                                    <option value="">Trễ hạn</option>
                                    <option value="">Bị hủy</option>
                            </select>
                        </div>
                </div>

                <div className='flex items-center mb-5'>
                        <div className='mr-5'>
                            Giới tính: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                    <option value="">Tạo mới</option>
                                    <option value="">Đang thực hiện</option>
                                    <option value="">Đến hạn nghiệm thu</option>
                                    <option value="">Đã hoàn thành</option>
                                    <option value="">Trễ hạn</option>
                                    <option value="">Bị hủy</option>
                            </select>
                        </div>
                </div>

                <div className='flex items-center mb-5'>
                        <div className='mr-5'>
                            Ngày tháng năm sinh: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                    <option value="">Tạo mới</option>
                                    <option value="">Đang thực hiện</option>
                                    <option value="">Đến hạn nghiệm thu</option>
                                    <option value="">Đã hoàn thành</option>
                                    <option value="">Trễ hạn</option>
                                    <option value="">Bị hủy</option>
                            </select>
                        </div>
                </div>

                <div className='flex items-center mb-5'>
                        <div className='mr-5'>
                            Chương trình đào tạo: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                    <option value="">Tạo mới</option>
                                    <option value="">Đang thực hiện</option>
                                    <option value="">Đến hạn nghiệm thu</option>
                                    <option value="">Đã hoàn thành</option>
                                    <option value="">Trễ hạn</option>
                                    <option value="">Bị hủy</option>
                            </select>
                        </div>
                </div>

                <div className='flex items-center mb-5'>
                        <div className='mr-5'>
                            Email: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                    <option value="">Tạo mới</option>
                                    <option value="">Đang thực hiện</option>
                                    <option value="">Đến hạn nghiệm thu</option>
                                    <option value="">Đã hoàn thành</option>
                                    <option value="">Trễ hạn</option>
                                    <option value="">Bị hủy</option>
                            </select>
                        </div>
                </div>

                <div className='flex items-center mb-5'>
                        <div className='mr-5'>
                            Số điện thoại: 
                        </div>
                        <div className="">
                            <select
                                className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                                    onChange={(e) => {
                                    }}
                                    defaultValue={"dfdasf"}
                                >
                                    <option value="">Tạo mới</option>
                                    <option value="">Đang thực hiện</option>
                                    <option value="">Đến hạn nghiệm thu</option>
                                    <option value="">Đã hoàn thành</option>
                                    <option value="">Trễ hạn</option>
                                    <option value="">Bị hủy</option>
                            </select>
                        </div>
                </div>
            </div>


                <div className='grid grid-rows-6 justify-items-end px-5 col-span-1'>
                
                    <div onClick={() => {onViewMode(true); onEditMode(false)}} className="w-40 h-16 bg-[#209216] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#047636] hover:cursor-pointer">
                    Lưu
                    </div>
                
                
                    <div onClick={() => {onViewMode(true); onEditMode(false)}} className="w-40 h-16 bg-[#E1000E] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#B20610] hover:cursor-pointer">
                    Hủy
                    </div>
                
                
            </div>
        </div>
    )
}

export default EditMode;