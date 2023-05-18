import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';

import SearchIcon from "../../../../../assets/images/searchIcon.png";

const TopicListPage = (props: any) => {
    const { topics, totalPage, onChangePage, currentPage, setCurrentPage, currentTextSearch, setCurrentTextSearch, currentType, onChangeType } = props;

    const prevPage = () => {
        if (currentPage <= 1) return;
        setCurrentPage(currentPage - 1);
        onChangePage(currentPage - 1)
    };
    const nextPage = () => {
        if (currentPage >= totalPage) return;
        setCurrentPage(currentPage + 1);
        onChangePage(currentPage + 1)
    };

    return (
        <div className='p-4 overflow-y-auto'>
            <div className='w-full'>
                <div className='flex flex-col'>
                    <div className=''>
                        <div className='inline-block w-full pr-5'>
                            <div className='mb-2 w-[100%] flex justify-start'>
                                <input type="text" placeholder={"Tìm kiếm bằng tên hoặc mã đề tài"}
                                    value={currentTextSearch}
                                    onChange={(e: any) => {
                                        e.preventDefault();
                                        setCurrentTextSearch(e.target.value);
                                    }}
                                    className='border border-1 border-black px-2 rounded-[8px] h-[35px] w-[97%]'
                                />
                                <div className='w-[3%] flex items-center justify-center p-1 hover:cursor-pointer'
                                    onClick={(e: any) => {
                                        e.preventDefault();
                                        onChangeType(currentType, currentTextSearch)
                                    }}
                                >
                                    <img src={SearchIcon} alt="searchIcon" className='h-5 w-5' />
                                </div>
                            </div>
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
                                                className='w-[15%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Mã đề tài
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[25%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Tên đề tài
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[15%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Loại đề tài
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[15%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Chủ nhiệm
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[15%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Kinh phí
                                            </th>
                                            <th
                                                scope='col'
                                                className='w-[10%] text-sm text-center font-bold text-white px-2 py-3 text-left border-l-2'
                                            >
                                                Ngày tạo
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {topics.map((topic: any, index: number) => {
                                            return (<RowTable
                                                index={index + 1}
                                                topicId={topic.topicGivenId}
                                                topicName={topic.name}
                                                topicType={topic.type}
                                                topicRegister={topic.student.name}
                                                expense={topic.expense}
                                                date={topic.creationDate}
                                                currentPage={currentPage}
                                            />)
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid justify-items-end px-5'>
                <ul className='inline-flex items-center -space-x-px'>
                    <LeftTag onClick={prevPage} />
                    {Array.from(Array(totalPage).keys()).map((index) => (
                        <PaginationTag
                            key={index}
                            numPage={index + 1}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            onChangePage={onChangePage}
                        />
                    ))}
                    <RightTag onClick={nextPage} />
                </ul>
            </div>
        </div>
    )
}

export default TopicListPage;