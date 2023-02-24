import React, {useEffect, useState} from 'react';
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';
import { getTemplatesAction } from '../../../../actions/templateAction';
import { Template } from '../../../../shared/interfaces/templateInterface';
import RowTable from './RowTable';
import Modal from "./Modal";

const TemplateList: React.FC = () => {
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [showModal, setShowModal] = useState<boolean>(false);

    const [templates, setTemplates] = useState<Template[]>();

    useEffect(() => {
        dispatch(getTemplatesAction({}))
                .then((data) => {
                    setTemplates(data?.templates)
                }
                )
                .catch((error) => {
        })
        }
    , []);

    return(
        <div className='p-5'>

            <div className='text-xl font-semibold mb-10'>
                Danh sách biểu mẫu
            </div>

            <div className='grid justify-items-start mb-2'>
                <div className='w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer'
                    onClick={(e:any) => {
                        e.preventDefault();
                        setShowModal(true);
                    }}
                >
                    Thêm biểu mẫu
                </div>
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
                                        className='w-[5%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        STT
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Mã biểu mẫu
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[20%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Tên biểu mẫu
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[15%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Loại
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Ngày tạo
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[15%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Form
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        Được dùng
                                    </th>
                                    <th
                                        scope='col'
                                        className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                    >
                                        
                                    </th>

                                    </tr>
                                </thead>
                                <tbody className=''>
                                {templates?.map((template, index) => {
                                    return <RowTable
                                    index={index+1}
                                    template={template}
                                    />
                                })}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisible = {showModal} onClose = {() => setShowModal(false)} 
    topic = {
      {
        
      }
    }
    />
        </div>
    )
}

export default TemplateList;