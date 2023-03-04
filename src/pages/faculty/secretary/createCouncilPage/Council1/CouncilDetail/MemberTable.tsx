interface Props {
    index: number
    memberName: string;
    gender: string;
    degree: string;
    email: string;
    role: string;
    workUnit: string;
    onEditMode: boolean;
}

export const MemberTable: React.FC<Props> = (props) => {
    const { index , memberName, gender, degree, email,role, workUnit, onEditMode} = props;
    if(onEditMode !== true)
    {
        return (
            <tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
                <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
                {index}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {memberName}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {gender}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {degree}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {email}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {role}
                </td>
                <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
                {workUnit}
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
                <select
                className="border border-black border-1 rounded-md w-4/5 h-8 px-1"
                    onChange={(e) => {
                    }}
                    defaultValue={""}
                >
                <option value="">Chủ tịch</option>
                <option value="">Ủy viên</option>
                <option value="">Thư ký</option>
                </select>
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