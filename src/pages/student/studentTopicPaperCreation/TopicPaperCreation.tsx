import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Docxtemplater from "docxtemplater";
import * as FileSaver from 'file-saver';
import PizZip from "pizzip";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';

import { AppDispatch } from '../../../store';

import { Form } from '../../../shared/interfaces/formInterface';
import { DataTypeEnum } from '../../../shared/types/dataType';
import { Toast } from '../../../shared/toastNotify/Toast';

import { getAFormAction } from '../../../actions/formAction';
import { postAddAPaperAction } from '../../../actions/paperAction';

import BackIcon from '../../../assets/images/🦆 icon _arrow circle left_.png';

const FileViewer = require("react-file-viewer");

let PizZipUtils: any = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

function loadFile(url: string, callback: any) {
  PizZipUtils.getBinaryContent(url, callback);
}

export const FormField = (props: any) => {
    const {indx, field, updateJsonData} = props;

    const [fieldValue, setFieldValue] = useState<any>("");

    const [validEmail, setValidEmail] = useState(true);
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

    return (
    <div className='w-full mt-5 space-y-2'>
        <div className='flex flex-col w-full text-sm'>
            <div className='w-1/2 font-semibold'>
                {field?.name}
            </div>
            <div className='w-1/2 text-[#A3A3A3]'>
                Kiểu dữ liệu: {field?.dataType}
            </div>
        </div>
        <div className='text-xs italic'>
            *Chú thích: {field?.note}
        </div>
        <div>
            {(field?.dataType === DataTypeEnum.Text || field?.dataType === DataTypeEnum.Other) &&
            <input data-testid="text-field-input" type="text" value={fieldValue} className='border text-sm border-black border-1 rounded-md w-full h-10 p-2'
                onChange={(e:any) => {
                    e.preventDefault()
                    setFieldValue(e.target.value)
                    updateJsonData(field?.initialName, e.target.value)
                }}
            />
            }

            {field?.dataType === DataTypeEnum.Number && 
            <input type="number" value={fieldValue} className='border text-sm border-black border-1 rounded-md w-full h-10 p-2'
            onChange={(e:any) => {
                e.preventDefault();
                setFieldValue(e.target.value)
                updateJsonData(field?.initialName, e.target.value)
            }}
            />
            }

            {field?.dataType === DataTypeEnum.Date &&
            <div className='grid justify-items-end items-center'>
                <DatePicker
                onChange={date => {
                    if(date){
                        setFieldValue(date);
                        updateJsonData(field?.initialName, `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`)
                    }
                }}
                selected={fieldValue}
                dateFormat="dd/MM/yyyy"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                locale={vi}
                className="h-10 w-full border border-black border-1 rounded-md p-2"
                />
            </div>
            }

            {field?.dataType === DataTypeEnum.Email &&
                <div>
                    {!validEmail && (
                        <div className='ml-2 text-red-500 text-xs font-medium'>
                            Emai không đúng định dạng
                        </div>
                    )}
                    <input type="email" value={fieldValue} 
                    className={!validEmail ? 'border text-sm border-red-500 border-1 rounded-md w-full h-10 p-2' : 'border text-sm border-black border-1 rounded-md w-full h-10 p-2'}
                    onChange={(e:any) => {
                        const email = e.target.value;
                        if(e.target?.value && e.target.value.match(isValidEmail)){
                            setValidEmail(true);
                        }else{
                            setValidEmail(false)
                        }
                        setFieldValue(email);
                        updateJsonData(field?.initialName, email)
                    }}
                    />
                </div>
            }

            {field?.dataType === DataTypeEnum.phoneNum &&
                <div>
                    {!validPhoneNumber && (
                        <div className='ml-2 text-red-500 text-xs font-medium'>
                            SĐT không đúng định dạng
                        </div>
                    )}
                    <input type="text" value={fieldValue} 
                    className={!validPhoneNumber? 'border text-sm border-red-500 border-1 rounded-md w-full h-10 p-2' : 'border text-sm border-black border-1 rounded-md w-full h-10 p-2'}
                    onChange={(e:any) => {
                        const phoneNumber = e.target.value;
                        if(e.target?.value && e.target.value.match(isValidPhoneNumber)){
                            setValidPhoneNumber(true);
                        }else{
                            setValidPhoneNumber(false)
                        }
                        setFieldValue(phoneNumber);
                        updateJsonData(field?.initialName, phoneNumber)
                    }}
                    />
                </div>
            }

        </div>
    </div>
    )
}

const TopicPaperCreation: React.FC = () => {

    const {_id} = useParams();
    const {state} = useLocation();

    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const navigate = useNavigate();

    const [form, setForm] = useState<Form>(
        {
            templateId: _id !== undefined ? _id : "",
            fields:[],
            markedTemplateFileName: ""
        }
    )

    const [jsonData, setJsonData] = useState<any>({})
    const [fileUrl, setFileUrl] = useState<string>("")
    const [fileType, setFileType] = useState<string>("")
    
    const updateJsonData = (initialName: string, value: string) => {
        let tempJsonData: any = jsonData;
        tempJsonData[initialName.slice(1, initialName.length - 1)] = value;
        setJsonData(tempJsonData);
    }

    const onError = (e: any) => {
        console.log(e, "error in file-viewer");
      };

    const createPaper = (e:any) => {
        e.preventDefault();
        if(form.markedTemplateFileName?.endsWith('.docx') || form.markedTemplateFileName?.endsWith('.doc')){
            
            loadFile(fileUrl, function (
            error: any,
            content: any
            ) {
                if (error) {
                throw error;
                }
                const zip = new PizZip(content);
                const doc = new Docxtemplater().loadZip(zip);
                doc.setData(jsonData);
                try {
                    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                    doc.render();
                } catch (error: any) {
                    // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                    

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors
                        .map(function (error: any) {
                            return error.properties.explanation;
                        })
                        .join("\n");
                        console.log("errorMessages", errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }
                const out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                }); 
                // Output the document using Data-URI
                FileSaver.saveAs(out, form.markedTemplateFileName);
            });
        }
    }

    const savePaper = (e:any) => {
        e.preventDefault();
        if(form.markedTemplateFileName?.endsWith('.docx') || form.markedTemplateFileName?.endsWith('.doc')){
            
            loadFile(fileUrl, function (
            error: any,
            content: any
            ) {
                if (error) {
                throw error;
                }
                const zip = new PizZip(content);
                const doc = new Docxtemplater().loadZip(zip);
                doc.setData(jsonData);
                try {
                    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                    doc.render();
                } catch (error: any) {
                    // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                    

                    if (error.properties && error.properties.errors instanceof Array) {
                        const errorMessages = error.properties.errors
                        .map(function (error: any) {
                            return error.properties.explanation;
                        })
                        .join("\n");
                        console.log("errorMessages", errorMessages);
                        // errorMessages is a humanly readable message looking like this :
                        // 'The tag beginning with "foobar" is unopened'
                    }
                    throw error;
                }
                const out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                }); 
                const paperFile = new File([out], form.markedTemplateFileName ? form.markedTemplateFileName : "");

                const info = {
                    topicId: _id,
                    templateId: state?.templateId
                }
                
                let formData = new FormData();
                formData.append('info', JSON.stringify(info))
                formData.append('file', paperFile as File)
                Swal.fire({
                    icon: 'question',
                    title: 'Bạn có chắc muốn lưu giấy tờ?',
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: 'Yes',
                }).then((result) => {
    
                    if(result.isConfirmed){
                        dispatch(postAddAPaperAction(formData))
                        .then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Thêm giấy tờ thành công',
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'OK',
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    navigate('/myTopic/' + _id + "/topicPapers")
                                    window.location.reload()
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
            });
        }
    }

    useEffect(() => {
        dispatch(getAFormAction(state.formId))
        .then((data) => {
            setForm(data?.form)
            let tempJsonData : any = {}
            data?.form.fields.map((field: any) => {
                tempJsonData[field.initialName.slice(1, field.initialName.length - 1)] = ""
                setJsonData(tempJsonData)
            })
            setFileUrl(process.env.REACT_APP_API_URL + "/api/form/" + data?.form._id + "/markedTemplateFile")
            if(data?.form.markedTemplateFileName?.endsWith('.docx') || data?.form.markedTemplateFileName?.endsWith('.doc')){
                setFileType("docx")
            }
        })
        .catch((error) => {
            console.log(error);
        })
    },[])

    return(
        <div className='flex'>
            <div className='w-1/3 p-3'>
                <div className=']'>
                    <Link to={'/myTopic/' + _id + "/topicPapers"} className='hover:cursor-pointer w-fit'>
                        <img src={BackIcon} className='h-5' alt="" />
                    </Link>

                    <div className='text-lg font-semibold mt-2'>
                        Form dữ liệu
                    </div>
                </div>

                <div className='h-[calc(100vh-350px)] overflow-y-scroll border-t-2 border-b-2 px-2'>
                    {form?.fields.map((field, index) => {
                        return <FormField indx={index} field={field} updateJsonData={updateJsonData}/>
                    })}
                </div>

                <div 
                className='w-full mt-2 bg-[#1488D8] rounded-lg py-2 text-md font-semibold text-white flex items-center justify-center hover:cursor-pointer'
                onClick={createPaper}
                >
                    Tạo giấy tờ
                </div>

                <div 
                className='flex justify-end mt-3'
                >
                    <div className='w-1/4 rounded-lg bg-white border-2 border-[#1488D8] px-1 py-3 text-[#1488D8] flex items-center justify-center hover:cursor-pointer'
                    onClick={savePaper}
                    >
                        Lưu giấy tờ
                    </div>
                </div>
            </div>

            <div className='w-2/3 h-[calc(100vh-160px)] bg-[#EEEEEE] flex p-5'>
                <div className="items-center justify-center h-full w-full p-2 bg-white">
                <FileViewer
                    fileType={fileType}
                    filePath={fileUrl}
                    onError={onError}
                />
                </div>
            </div>
        </div>
    )
}

export default TopicPaperCreation;