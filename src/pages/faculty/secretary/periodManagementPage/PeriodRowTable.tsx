import { PeriodStatus } from "../../../../shared/types/periodStatus";
import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';
import Swal from 'sweetalert2';
import { putUpdateAPeriodAction } from "../../../../actions/periodAction";

const PeriodRowTable = (props: any) => {
  const useAppDispatch: () => AppDispatch = useDispatch
  const dispatch = useAppDispatch()

  const { index, period} = props;
  const displayPeriod = (dateStr: string) => {
    const date = new Date(dateStr);
    return (date.getMonth() + 1) + "/" + date.getFullYear();
  }
  const closePeriod = (e: any) => {
    e.preventDefault();
    const newInfo = {
      _id: period._id,
      period: {
        status: PeriodStatus.CLOSE
      }
    }
    Swal.fire({
      icon: 'question',
      title: 'Bạn có chắc muốn đóng đợt đăng ký này lại?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
  }).then((result) => {

      if(result.isConfirmed){
      dispatch(putUpdateAPeriodAction(newInfo))
        .then((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Đóng đợt đăng ký thành công',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'OK',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              window.location.reload();
            } 
          })
          }
        )
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Có lỗi gì đó đã xảy ra, thử lại sau!',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'OK',
          })
        })
      }

      if(result.isDenied){
      }
  })

  }

  const openPeriod = (e: any) => {
    e.preventDefault();
    const newInfo = {
      _id: period._id,
      period: {
        status: PeriodStatus.OPEN
      }
    }
    Swal.fire({
      icon: 'question',
      title: 'Bạn có chắc muốn mở đợt đăng ký này?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
  }).then((result) => {

      if(result.isConfirmed){
      dispatch(putUpdateAPeriodAction(newInfo))
        .then((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Mở đợt đăng ký thành công',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'OK',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              window.location.reload();
            } 
          })
          }
        )
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Có lỗi gì đó đã xảy ra, thử lại sau!',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'OK',
          })
        })
      }

      if(result.isDenied){
      }
  })

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
            
          }
            }>
              <div className="text-[#E1000E] font-semibold no-underline hover:underline hover:cursor-pointer"
                onClick={closePeriod}
              >
              Đóng
              </div>
          </button>
        ):(
          <div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer"
            onClick={openPeriod}
          >
              Mở
          </div>
        )
        }
      </td>
      
    </tr>

  );
};

export default PeriodRowTable;
