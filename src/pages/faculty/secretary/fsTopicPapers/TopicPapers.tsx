import React, { useState, useEffect } from 'react';
import BackIcon from '../../../../assets/images/🦆 icon _arrow circle left_.png';
import DownIcon from '../../../../assets/images/down-arrow.png';
import RightIcon from '../../../../assets/images/next.png';
import FileIcon from "../../../../assets/images/files.png";
import { useDispatch} from "react-redux";
import {AppDispatch } from '../../../../store';
import {Link, useParams} from "react-router-dom";

import { getTemplatesWithPapersAction } from '../../../../actions/templateAction';
import { TemplateWithPaper } from '../../../../shared/interfaces/templateInterface';

const TopicPaperCard = (props: any) => {
    const {templateWithPaper, topicId} = props;
    const [show, setShow] = useState(true);

    const [paperFile, setPaperFile] = useState<{_id: string, paperFileName: string}|undefined>(templateWithPaper.paper);

    const downloadPaperFile = (_id: string | undefined, fileName: string | undefined) => {
        if(_id && fileName){
            const url = process.env.REACT_APP_API_URL + "/api/paper" + "/" + _id + "/download";
            const aTag = document.createElement('a');
            aTag.href = url;
            aTag.setAttribute("download", fileName);
            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();
        }
        else{
            console.log("SOMETHING WRONG!!!!")
        }
    }

    return (
    <div className='w-4/5 mb-5'>
                <div className='flex items-center'>
                    <div className='mr-2' onClick={(e) => {
                        e.preventDefault();
                        setShow(!show);
                    }}>
                        <img src={show? DownIcon: RightIcon} className='h-7' alt="" />
                    </div>
                    <div className='text-lg font-bold'>
                        {templateWithPaper.name}
                    </div>
                </div>
                {show && (
                <div className='border border-black rounded-lg px-5 pt-5 pb-5 mt-1'>

                    {paperFile && <div>
                        <div className='flex bg-[#E0E0E0] rounded-lg pl-5 items-center w-full py-1'>
                            <img src={FileIcon} className='h-7 pr-5' alt="" />
                            <div className='text-[#1488D8] text-lg no-underline hover:underline hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                downloadPaperFile(paperFile?._id, paperFile?.paperFileName);
                            }}
                            >
                                {paperFile.paperFileName}
                            </div>
                        </div>
                    </div>}

                    {!paperFile && <div>
                        <div className='flex bg-[#E0E0E0] rounded-lg pl-5 items-center w-full py-1'>
                            <img src={FileIcon} className='h-7 pr-5' alt="" />
                            <div className='text-lg'>
                                Chưa có file nào được upload
                            </div>
                        </div>
                    </div>}

                </div>)}
            </div>
    )

}


const TopicPapers:React.FC = () => {
    let { _id} = useParams();
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [templatesWithPapers, setTemplatesWithPapers] = useState<TemplateWithPaper[]>([]);

    useEffect(() => {
        let queryData = {
            topicId: _id,
            forStudent: true
        }
        dispatch(getTemplatesWithPapersAction(queryData))
                .then((data) => {
                    setTemplatesWithPapers(data?.templatesWithPapers)
                }
                )
                .catch((error) => {
                })
        }
    , []);

    return (
        <div className='p-3'>
            <Link to={'/topicManagement'} className='hover:cursor-pointer w-fit'>
                <img src={BackIcon} className='h-5' alt="" />
            </Link>
            <div className='flex flex-col items-center w-full'>
                {
                    templatesWithPapers.map((templateWithPaper) => {
                        return(
                            <TopicPaperCard templateWithPaper={templateWithPaper} topicId={_id}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TopicPapers;