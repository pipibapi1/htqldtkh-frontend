import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Docxtemplater from 'docxtemplater';
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";

import { AppDispatch } from '../../../../store';

import { Form } from '../../../../shared/interfaces/formInterface';
import { DataTypeEnum } from '../../../../shared/types/dataType';
import { Toast } from '../../../../shared/toastNotify/Toast';

import { postAddAFormAction } from '../../../../actions/formAction';

import BackIcon from '../../../../assets/images/🦆 icon _arrow circle left_.png';

const PizZip = require("pizzip");

const FormField = (props: any) => {
  const {indx, placeholder, form, setForm} = props;

  let field: {
    initialName: string,
    name: string,
    note: string,
    dataType: DataTypeEnum
  } = form.fields[indx]

  const [name, setName] = useState<string>(field.name);
  const [dataType, setDataType] = useState<string>(field.dataType);
  const [note, setNote] = useState<string>(field.note);

  useEffect(() => {
    setName(field.name);
    setDataType(field.dataType);
    setNote(field.note);
  }, [form])

  return (
  <div className='px-10 mt-3 w-full'>
  <div className='text-md'><span className='font-semibold'>Trường dữ liệu {indx + 1}:</span> {placeholder}</div>
  <div className='w-2/3'>
    <div className='flex w-full space-x-3'>
      <div className='w-2/3'>
        <div>Tên</div>
        <input type="text" value={name} className='border border-black border-1 rounded-md w-full h-10 p-2'
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
              setName(placeholder)
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

const TemplateFormCreation: React.FC = () => {

  const navigate = useNavigate();

  const useAppDispatch: () => AppDispatch = useDispatch
  const dispatch = useAppDispatch()

  const { state } = useLocation();
  const {_id } = useParams();
  
  const [file, setFile] = useState<File | null>(null);
  const [myPlaceholders, setMyPlaceholders] = useState<string[]>([]);
  const [form, setForm] = useState<Form>(
    {
      templateId: _id !== undefined ? _id : "",
      fields:[],
    }
  );

  const extractPlaceholders = (file: File) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const arrayBuffer = event.target.result;
    
        if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
          const doc = new Docxtemplater(new PizZip(arrayBuffer), {delimiters: {start: '12op1j2po1j2poj1po', end: 'op21j4po21jp4oj1op24j'}})
          const placeholders = doc.getZip().file('word/document.xml').asText().match(/{([^{}]*)}/g);
          let fields: {
            initialName: string,
            name: string,
            note: string,
            dataType: DataTypeEnum
          }[] = []
          if(placeholders !== null){
            setMyPlaceholders(placeholders)
            placeholders.map((placeholder: string) => {
              fields = fields.concat([{
                initialName: placeholder,
                name: placeholder,
                note: "",
                dataType: DataTypeEnum.Text
              }])
            })
            setForm({
              ...form,
              fields: fields
            })
          }
          else{
            setMyPlaceholders([])
          }
        }
        else{
          Toast.fire({
            icon: 'error',
            title: "Định dạng file không phù hợp!"
          })
          setFile(null)
          setMyPlaceholders([])
          setForm({
            templateId: _id !== undefined ? _id : "",
            fields:[],
          })
        }
      };
      reader.readAsArrayBuffer(file);
  }
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files?.[0];
  
    if (newFile) {
      setFile(newFile);

      extractPlaceholders(newFile);
    }
  }

  const addAForm = (event: any) => {
    event.preventDefault();

    const info = form;

    let formData = new FormData();
    formData.append('info', JSON.stringify(info))
    formData.append('file', file as File)

    Swal.fire({
      icon: 'question',
      title: 'Bạn có chắc muốn tạo form mới?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
    }).then((result) => {

      if(result.isConfirmed){
          dispatch(postAddAFormAction(formData))
          .then(() => {
              Swal.fire({
                  icon: 'success',
                  title: 'Tạo form thành công',
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    navigate("/templateManagement");
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
        Tạo form cho biểu mẫu {state.templateGivenId} - {state.templateName}
      </div>
      <div className='px-5 mt-3 w-full flex items-center'>
        <div className='text-sm italic'>
          Hiện tại tính năng chỉ hỗ trợ cho file định dạng .docx, .doc
        </div>
      </div>
      <div className='px-5 mt-3 w-full flex items-center'>
        <div className='text-md font-medium'>
          Tải biểu mẫu đã được đánh dấu lên đây:
        </div>
        <input data-testid="file-input" type="file" onChange={handleFileChange} className='mt-1 ml-3 w-1/2'/>
      </div>
      
      {myPlaceholders.map((placeholder, index) => {
        return (
          <FormField indx={index} placeholder={placeholder} form={form} setForm={setForm}/>
        )
      })}
      {file && <div className='flex justify-end'>
        <div>
          <button className="w-40 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
          onClick={addAForm}
          >
            Lưu
          </button>
        </div>
      </div>}
    </div>
  );
}

export default TemplateFormCreation;