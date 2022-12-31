import React from 'react';

const TemplateList: React.FC = () => {
    return (
        <div className='px-5 py-10'>
            <div className='text-2xl mb-5'>
                Biểu mẫu đề tài cấp Sinh viên
            </div>
            <div className='px-5'>
                <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer text-xl mb-3">
                Thuyết minh đề tài Sinh viên
                </div>
                <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer text-xl mb-3">
                Dự toán đề tài Sinh viên
                </div>
                <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer text-xl">
                Hợp đồng thuê khoán chuyên môn
                </div>
            </div>
        </div>
    )
}

export default TemplateList;