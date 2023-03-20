import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { AppDispatch } from '../../../store';

import { Template } from '../../../shared/interfaces/templateInterface';

import { getTemplatesAction } from '../../../actions/templateAction';

const TemplateList: React.FC = () => {
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [templates, setTemplates] = useState<Template[]>();


    useEffect(() => {
        let queryData = {
            forStudent: true
        }
        dispatch(getTemplatesAction(queryData))
                .then((data) => {
                    setTemplates(data?.templates)
                }
                )
                .catch((error) => {
        })
        }
    , []);

    const downloadTemplateFile = (_id: string, fileName: string) => {
        const url = process.env.REACT_APP_API_URL + "/api/template" + "/" + _id + "/download";
        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }
    

    return (
        <div className='px-5 py-10'>
            <div className='text-2xl mb-5'>
                Biểu mẫu đề tài cấp Sinh viên
            </div>
            <div className='px-5'>
                {templates?.map((template) => {
                    return(
                        <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer text-xl mb-3"
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
    )
}

export default TemplateList;