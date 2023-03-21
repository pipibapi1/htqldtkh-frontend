import React from "react";

import { CouncilInfoIntf } from "../../../../../../shared/interfaces/councilInterface";

import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';

interface Props {
    councilList: CouncilInfoIntf[],
    setCurrentPage: any,
    totalPage: number,
    currentPage: number,
    onDelete: any
}

const CouncilList: React.FC<Props> = (props: Props) => {
    const {councilList, setCurrentPage, totalPage, currentPage, onDelete} = props;
    let availablePage: number[] = [currentPage];

    // set available page can navigate to
    if (totalPage > currentPage) {
        if (currentPage > 1) {
            availablePage = [currentPage - 1, currentPage, currentPage + 1]
        }
        else {
            availablePage = [1, 2]
        }
    }
    else {
        if (currentPage > 1) {
            availablePage = [currentPage - 1, currentPage]
        }
        else {
            availablePage = [1]
        }
    }

    let councilElementList = [];
    for (let index = 0; index < councilList.length; index++){
        councilElementList.push(
            <RowTable
                key={index}
                index={index+1}
                council={councilList[index]}
                onDelete={onDelete}
            />)
    }


    const onClickPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const onClickNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    return(
        <>
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
                                        className='text-sm text-center font-bold text-white px-2 py-1 border-l-2'
                                    >
                                        STT
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 border-l-2'
                                    >
                                        Tên hội đồng
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Số lượng TV
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Thời gian diễn ra
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Số đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Trạng thái
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {councilElementList}
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid justify-items-end px-5'>
                <ul className='inline-flex items-center -space-x-px'>
                    <LeftTag onClick={onClickPrevPage} />
                    {availablePage.map((num) => (
                        <PaginationTag
                            key={num}
                            numPage={num}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    ))}
                    <RightTag onClick={onClickNextPage} />
                </ul>
            </div>
        </>
    )
}

export default CouncilList;