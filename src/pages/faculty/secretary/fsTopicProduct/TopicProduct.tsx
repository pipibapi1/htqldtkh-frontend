import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AppDispatch } from '../../../../store';

import { displayDate2 } from '../../../../shared/functions';

import { getAProductByTopicIdAction } from '../../../../actions/productAction';

import BackIcon from '../../../../assets/images/🦆 icon _arrow circle left_.png';
import FileIcon from "../../../../assets/images/files.png"

const TopicProduct:React.FC = () => {

    let { _id} = useParams();

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()
    const { state } = useLocation();
    const [product, setProduct] = useState<{_id: string, productFileName: string} | undefined>(undefined);
    const [tempProductName, setTempProductName] = useState<string|undefined>(undefined);

    const downloadProductFile = (_id: string | undefined, fileName: string | undefined) => {
        if(_id && fileName){
            const url = process.env.REACT_APP_API_URL + "/api/product" + "/" + _id + "/download";
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

    useEffect(() => {
            dispatch(getAProductByTopicIdAction(_id?_id:""))
                    .then((data) => {
                        setProduct(data?.product);
                        setTempProductName(data?.product.productFileName);
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

            <div className='bg-gray-100 pb-10 mt-2'>
                <div className='p-2 border-b-2'>
                    <div className='flex'>
                        <div className='text-sm w-[65px] font-bold mr-5'>
                            Bắt đầu: 
                        </div>
                        <div className='text-sm font-medium'>
                            {displayDate2(state?.startTime)}
                        </div>
                    </div>
                    <div className='flex mt-1'>
                        <div className='text-sm w-[65px] font-bold mr-5'>
                            Kết thúc: 
                        </div>
                        <div className='text-sm font-medium'>
                            {displayDate2(state?.endTime)}
                        </div>
                    </div>
                </div>

                <div className='p-2 text-[#A4A4A4] text-sm'>
                    Nén tất cả các file thành một file zip duy nhất rồi nộp vào dưới đây
                </div>
            </div>

            <div className='mt-5 w-full'>
                <div className='text-xl font-bold'>
                    Tình trạng sản phẩm
                </div>
                <div className='mt-2 px-10 w-4/5'>
                    <div className='flex'>
                        <div className='w-1/3 border-t-2 py-3 border-l-2 text-lg flex items-center justify-center'>
                            Tình trạng nộp
                        </div>
                        {!product && (<div className='w-2/3 border-t-2 py-3 border-l-2 border-r-2 text-lg flex items-center justify-center'>
                            Chưa có sản phẩm nào được nộp
                        </div>)}
                        {product && (<div className='w-2/3 bg-[#7CEEA3] border-t-2 py-3 border-l-2 border-r-2 text-lg flex items-center justify-center'>
                            Đã nộp
                        </div>)}
                    </div>

                    <div className='flex'>
                        <div className='w-1/3 border-t-2 py-20 border-l-2 border-b-2 text-lg flex items-center justify-center'>
                            Tập tin sản phẩm
                        </div>
                        {!product && (<div className='w-2/3 border-t-2 py-20 border-l-2 border-r-2 border-b-2 text-lg flex items-center justify-center'>
                            Chưa có tập tin nào được thêm
                        </div>)}

                        {product && tempProductName && (<div className='w-2/3 border-t-2 py-20 border-l-2 border-r-2 border-b-2 text-lg flex items-center justify-center'>
                            <img src={FileIcon} className='h-7' alt="" />
                            <div className='text-lg ml-3 text-[#1488D8] text-lg no-underline hover:underline hover:cursor-pointer'
                                onClick={(e: any) => {
                                    e.preventDefault();
                                    downloadProductFile(product?._id, product?.productFileName);
                                }}
                            >
                                {product.productFileName}
                            </div>
                        </div>)}
                    </div>

                    <div className='flex'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopicProduct;