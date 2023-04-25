import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { AppDispatch } from '../../../store';

import { Toast } from '../../../shared/toastNotify/Toast';
import { Template } from '../../../shared/interfaces/templateInterface';

import { getTemplatesAction } from '../../../actions/templateAction';

const TemplateList: React.FC = () => {

    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const [templates, setTemplates] = useState<Template[]>([]);
    
    const downloadTemplateFile = (_id: string, fileName: string) => {
        const url = process.env.REACT_APP_API_URL + "/api/template" + "/" + _id + "/download";
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }

    useEffect(() => {
        const fetchTemplatesForStudent = async () => {
            try {
              const data = await dispatch(getTemplatesAction({ forStudent: true }));
              setTemplates(data?.templates !== undefined ? data?.templates : []);
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: error ? error : "Something is wrong!"
                })
            }
        };
        fetchTemplatesForStudent();
    }, [dispatch]);
      
    return (
        <div className='px-5 py-10'>
            <div className='text-2xl mb-5'>
                Biểu mẫu đề tài cấp Sinh viên
            </div>
            <div className='px-5'>
                {templates?.map((template, index) => {
                    return (
                        <div key={index} className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer text-xl mb-3"
                            onClick={(e) => {
                                e.preventDefault();
                                downloadTemplateFile(template._id, template.name);
                            }}
                        >
                            {template.templateGivenId} - {template.name} - ({template.inUse ? "đang được dùng" : "không được dùng"})
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default TemplateList;