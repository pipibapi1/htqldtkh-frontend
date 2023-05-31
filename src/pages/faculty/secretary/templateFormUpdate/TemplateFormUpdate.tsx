import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';

import { AppDispatch } from '../../../../store';

import { Form } from '../../../../shared/interfaces/formInterface';
import { DataTypeEnum } from '../../../../shared/types/dataType';
import { Toast } from '../../../../shared/toastNotify/Toast';

import { getAFormAction, putUpdateAFormAction } from '../../../../actions/formAction';

import BackIcon from '../../../../assets/images/🦆 icon _arrow circle left_.png';

export const FormField = (props: any) => {
  const {indx, form, setForm} = props;

  let field = form.fields[indx];
  
  const getInitFieldName = (str: string | undefined) => {
    if (!str) {
      return "";
    }
    else if (str.includes('>')) {
      const pattern = /[>]([a-zA-Z_0-9])+[<]/;
      const satisfiedStrs = str.match(pattern);
      if (!satisfiedStrs?.length){
        return "";
      }
      else {
        return (satisfiedStrs as RegExpMatchArray)[0].slice(1, -1);
      }
    }
    else {
      return str.slice(1, -1);
    }
  }
  const [name, setName] = useState<string>(field?.name);
  const [dataType, setDataType] = useState<string>(field?.dataType);
  const [note, setNote] = useState<string>(field?.note);

  return (<div className='px-10 mt-3 w-full'>
  <div className='text-md'><span className='font-semibold'>Trường dữ liệu {indx + 1}:</span> {getInitFieldName(field?.initialName)}</div>
  <div className='w-2/3'>
    <div className='flex w-full space-x-3'>
      <div className='w-2/3'>
        <div>Tên</div>
        <input data-testid='name-input' type="text" 
          defaultValue={name} 
          className='border border-black border-1 rounded-md w-full h-10 p-2'
          onChange={(e:any) => {
            e.preventDefault();
            if(e.target.value !== ""){
              setName(e.target.value)
              field = {
                ...field,
                name: e.target.value
              }
              form.fields[indx] = field;
              setForm(form)
            }
            else{
              Toast.fire({
                icon: 'warning',
                title: "Phần tên trường dữ liệu không được bỏ trống"
              })
              setName(field?.initialName)
            }
          }}
        />
      </div>
      <div className='w-1/3'>
        <div>Kiểu dữ liệu</div>
        <select
          className="bg-white border border-black border-1 rounded-md w-full h-10 p-2"
          onChange={(e) => {
            e.preventDefault();
            setDataType(e.target.value)
            field = {
              ...field,
              dataType: e.target.value as DataTypeEnum
            }
            form.fields[indx] = field;
            setForm(form)
          }}
          value={dataType}
          >
          {Object.values(DataTypeEnum).map((value) => {
            return <option value={value} key={value}>{value}</option>
          })}
        </select>
      </div>
    </div>
    <div className='mt-2 w-full'>
      <div>Chú thích</div>
      <textarea value={note} className='border border-black border-1 rounded-md w-full h-[100px] p-2'
        onChange={(e:any) => {
          e.preventDefault();
          setNote(e.target.value);
          field = {
            ...field,
            note: e.target.value
          }
          form.fields[indx] = field;
          setForm(form)
        }}
      />
    </div>
  </div>
</div>)
}

const TemplateFormUpdate: React.FC = () => {

  const useAppDispatch: () => AppDispatch = useDispatch
  const dispatch = useAppDispatch()

  const { state } = useLocation();
  const {_id} = useParams();

  const [form, setForm] = useState<Form>(
    {
      templateId: _id !== undefined ? _id : "",
      fields:[],
      markedTemplateFileName: ""
    }
  );

  useEffect(() => {
      dispatch(getAFormAction(state.formId))
      .then((data) => {
        setForm(data?.form)
      }
      )
      .catch((error) => {
      })
    
  },[])

  const downloadMarkedTemplateFile = (_id: string | undefined, fileName: string | undefined) => {
    if(_id && fileName){
        const url = process.env.REACT_APP_API_URL + "/api/form" + "/" + _id + "/download";
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

  const updateAForm = (e:any) => {
    e.preventDefault();

    const updateInfo = {
      _id: state.formId,
      form: form
    }

    Swal.fire({
      icon: 'question',
      title: 'Bạn có chắc muốn cập nhật form?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
    }).then((result) => {

      if(result.isConfirmed){
          dispatch(putUpdateAFormAction(updateInfo))
          .then(() => {
              Swal.fire({
                  icon: 'success',
                  title: 'Cập nhật form thành công',
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
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


  return (
    <div className='p-3'>
      <Link to={'/templateManagement'} className='hover:cursor-pointer w-fit'>
          <img src={BackIcon} className='h-5' alt="" />
      </Link>
      <div className='mt-2 text-lg font-semibold'>
        Chỉnh sửa form cho biểu mẫu {state.templateGivenId} - {state.templateName}
      </div>
      <div className='px-5 mt-3 w-full flex items-center'>
        <div className='text-md font-medium mr-3'>
          Biểu mẫu đánh dấu đã được tải lên:
        </div>
        <div className='text-[#1488D8] text-md no-underline hover:underline hover:cursor-pointer'
          onClick={(e) => {
              e.preventDefault();
              downloadMarkedTemplateFile(form?._id,form?.markedTemplateFileName)
          }}
        >
          {form?.markedTemplateFileName ? form.markedTemplateFileName : ""}
        </div>
      </div>
      {form?.fields.map((field, index) => {
        return <FormField indx={index} form={form} setForm={setForm}/>
      })}
      <div className='flex justify-end'>
        <div>
          <button className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
          onClick={updateAForm}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateFormUpdate;