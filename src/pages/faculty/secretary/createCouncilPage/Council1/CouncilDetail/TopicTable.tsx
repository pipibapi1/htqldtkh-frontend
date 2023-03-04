interface Props {
    index: number
    topicName: string;
    studentName: string;
    teacherName: string;
    time: string;
    product: string;
    note: string;
    onEditMode: boolean;
}

export const TopicTable: React.FC<Props> = (props) => {
    const { index , topicName, studentName, teacherName, time, product, note, onEditMode} = props;
    if(onEditMode !== true)
    {
        return (
            <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
                <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
                {index}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {topicName}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {studentName}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {teacherName}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {time}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {product}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {note}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                    <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
                        Xóa
                    </div>
                </td>
                
            </tr>
        );
    }
    else {
        return (
            <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
                <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
                    {index}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                    <input
                        type="text"
                        className="border border-black border-1 rounded-md w-4/5 h-8 p-2"
                    />
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                    <input
                        type="text"
                        className="border border-black border-1 rounded-md w-4/5 h-8 p-2"
                    />
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                    <input
                        type="text"
                        className="border border-black border-1 rounded-md w-4/5 h-8 p-2"
                    />
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                    <input
                        type="text"
                        className="border border-black border-1 rounded-md w-4/5 h-8 p-2"
                    />
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                    <input
                        type="file"
                        className="border border-black border-1 rounded-md w-full h-9 p-1"
                    />
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                    <input
                        type="text"
                        className="border border-black border-1 rounded-md w-4/5 h-8 p-2"
                    />
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                    <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
                            Xóa
                    </div>
                </td>
              
            </tr>  
        ); 
    }
}; 