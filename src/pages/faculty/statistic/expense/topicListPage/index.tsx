import RowTable from './RowTable';
import PaginationTag from './PaginationTag';
import LeftTag from './LeftTag';
import RightTag from './RightTag';

const TopicListPage = (props: any) => {
    const { topics, totalPage, onChangePage, currentPage, setCurrentPage } = props;

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