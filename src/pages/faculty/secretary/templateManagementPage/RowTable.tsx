import { useDispatch} from "react-redux";
import { AppDispatch } from '../../../../store';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import { deleteRemoveATemplateAction, putUpdateATemplateAction } from "../../../../actions/templateAction";
import InUse from "../../../../assets/images/check.png";
import NotInUse from "../../../../assets/images/unchecked.png";

const RowTable = (props: any) => {
  const {index, template} = props
  const useAppDispatch: () => AppDispatch = useDispatch
  const dispatch = useAppDispatch()

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast: any) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const displayDate = (dateStr: string) => {
    if(dateStr === "") return "";
    const date = new Date(dateStr);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }
  const onChangeUseStatus = (e:any) => {
    e.preventDefault();
    if(template._id){
      Swal.fire({
        icon: 'question',
        title: 'Bạn có chắc muốn chuyển trạng thái dùng của biểu mẫu này?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
    }).then((result) => {

      const updateInfo = {
        _id: template._id,
        template:{
          inUse: !template.inUse
        }
      }
        if(result.isConfirmed){
            dispatch(putUpdateATemplateAction(updateInfo))
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Chuyển trạng thái dùng biểu mẫu thành công',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        window.location.reload();
                    } 
                  })

            })
            .catch((error) => {
                
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if(error.response.status === 400){
                        Toast.fire({
                            icon: 'error',
                            title: 'Bad request'
                          })
                    }
                  } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    Toast.fire({
                        icon: 'error',
                        title: error.request
                      })
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    Toast.fire({
                        icon: 'error',
                        title: error.message
                      })
                  }
            });
        }

        if(result.isDenied){
            
        }
    })
    }
  }
  const removeATemplate = (e:any) => {
    e.preventDefault();

    if(template._id){
      Swal.fire({
        icon: 'question',
        title: 'Bạn có chắc muốn xóa biểu mẫu này?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
    }).then((result) => {

        if(result.isConfirmed){
            dispatch(deleteRemoveATemplateAction(template._id))
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Xóa biểu mẫu thành công',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'OK',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        window.location.reload();
                    } 
                  })

            })
            .catch((error) => {
                
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if(error.response.status === 400){
                        Toast.fire({
                            icon: 'error',
                            title: 'Bad request'
                          })
                    }
                    if(error.response.status === 409 && error.response.data.msg === 'Exist relevant paper'){
                      Toast.fire({
                          icon: 'error',
                          title: 'Đã có giấy tờ liên quan được tạo dựa trên biểu mẫu này!'
                        })
                  }
                  } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    Toast.fire({
                        icon: 'error',
                        title: error.request
                      })
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    Toast.fire({
                        icon: 'error',
                        title: error.message
                      })
                  }
            });
        }

        if(result.isDenied){
            
        }
    })
    }
  }
  const downloadTemplateFile = (_id: string, fileName: string) => {
    const url = process.env.REACT_APP_API_URL + "/api/template" + "/" + _id + "/download";
    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
}
  return (

    <tr className={'border-y-2 transition duration-300 ease-in-out'}>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
      #{index}
      </td>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
      {template.templateGivenId}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
      <div className="text-[#0079CC] no-underline hover:underline hover:cursor-pointer"
      onClick={(e) => {
            e.preventDefault();
            downloadTemplateFile(template._id, template.name);
        }}
      >
        {template.name}
      </div>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
      {template.forStudent? "Dành cho sinh viên" : "Không dành cho sinh viên"}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
      {displayDate(template.createAt)}
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        {template.formId === "" ? 
            <div>
                Chưa có, 
                <span className="text-[#0079CC] no-underline hover:underline hover:cursor-pointer"
                >
                  <Link to={`/templateManagement/${template._id}/formCreation`}>
                    Tạo mới?
                 </Link>
                </span>
            </div>
            :
            <div>
                <span className="text-[#0079CC] no-underline hover:underline hover:cursor-pointer">Cập nhật</span>
                <span>, </span>
                <span className="text-[#0079CC] no-underline hover:underline hover:cursor-pointer">Xóa</span>
            </div>
        }
      </td>
      <td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2 flex items-center justify-center'>
        <div className="hover:cursor-pointer"
        onClick={onChangeUseStatus}
        >

        {template.inUse ? <img src={InUse} alt="" className="h-7"/> : <img src={NotInUse} alt="" className="h-7"/> }
        </div>
      </td>
      <td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
        <div className="text-[#0079CC] no-underline hover:underline hover:cursor-pointer"
        onClick={removeATemplate}
        >
            Xóa
        </div>
        
      </td>
      
    </tr>

  );
};

export default RowTable;
