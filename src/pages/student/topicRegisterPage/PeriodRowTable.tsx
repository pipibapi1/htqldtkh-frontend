import { PeriodStatus } from "../../../shared/types/periodStatus";


const PeriodRowTable = (props: any) => {
  const { index, period, choosePeriod, setTopic, topic} = props;
  const displayPeriod = (dateStr: string) => {
    const date = new Date(dateStr);
    return (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  return (
    <tr className={'border-y-2 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
      #{index}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
      {displayPeriod(period.period)}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
      {period.status}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {period.title}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {period.status === PeriodStatus.OPEN ? (

          <button onClick={(e:any) => {
            e.preventDefault();
            choosePeriod(period);
            setTopic({
              ...topic,
              period: period._id
            })
          }
            }>
              <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer">
              Đăng ký
              </div>
          </button>
        ):(
          <div className="text-[#A3A3A3] font-semibold no-underline">
           Đăng ký
          </div>
        )
        }
      </td>
      
    </tr>

  );
};

export default PeriodRowTable;
