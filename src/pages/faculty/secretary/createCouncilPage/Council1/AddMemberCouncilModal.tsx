
const Modal = ({isVisible, onClose}: {isVisible: boolean, onClose: any}) => {
    if (!isVisible) return null;

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }

    return (
        <div className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center" id= "wrapper" onClick={handleClose}>
            <div className = "md:w-[600px] w-[90%] mx-auto h-[600px]">
                <div className = 'bg-white rounded p-2'>
                    <div className = "py-6 px-6 lg:px-8 text-left">
                        <div className = 'mb-8 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                            Điền thông tin thành viên hội đồng mới
                        </div>
                        <form className = "space-y-4" action = "#">
                            <div className = 'flex flex-row '>
                                <div className = 'mx-6 w-full'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Tên thành viên
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "name"
                                required
                                />
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mx-6 w-full '>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Giới tính
                                </label>
                                <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {}}
                                defaultValue={""}
                                >
                                    <option value="">Nam</option>
                                    <option value="">Nữ</option>
                                </select>
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mx-6 w-full'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "email@hcmut.edu.vn"
                                required
                                />
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mx-6 w-full'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                Học hàm / Học vị
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "degree"
                                required
                                />
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mx-6 w-full'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Vai trò
                                </label>
                                <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) => {}}
                                defaultValue={""}
                                >
                                    <option value="">Chủ tịch</option>
                                    <option value="">Ủy viên</option>
                                    <option value="">Thư ký</option>
                                </select>
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                                <div className = 'mx-6 w-full'>
                                <label htmlFor='email' className = "block mb-2 text-sm font-medium text-gray-900">
                                    Đơn vị công tác
                                </label>
                                <input type = 'email' name = 'email' id ='email'
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "ĐH BK"
                                required
                                />
                                </div>
                            </div>

                            <div className = 'flex flex-row '>
                            <button type = 'submit' 
                                className = 'w-full mr-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
                            >
                                Thêm
                            </button>

                            <button
                                className = 'w-full ml-2 text-white font-medium text-sm px-5 py-2.5 text-center rounded-lg bg-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300'
                                onClick={handleClose}
                                id = "wrapper"
                            >
                                Hủy
                            </button>


                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal