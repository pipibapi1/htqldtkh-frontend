import React, { useState, useEffect } from 'react';
import {Link, useParams, useNavigate, useLocation} from "react-router-dom";
import BackIcon from '../../../assets/images/🦆 icon _arrow circle left_.png';
import { AppDispatch } from '../../../store';
import { useDispatch} from "react-redux";
import { Form } from '../../../shared/interfaces/formInterface';
import { getAFormAction } from '../../../actions/formAction';
import { DataTypeEnum } from '../../../shared/types/dataType';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormField = (props: any) => {
    const {indx, field} = props;

    const [name, setName] = useState<string>(field?.name);
    const [dataType, setDataType] = useState<string>(field?.dataType);
    const [note, setNote] = useState<string>(field?.note);
    const [fieldValue, setFieldValue] = useState<any>("");

    const [validEmail, setValidEmail] = useState(true);
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValidPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

    return (
    <div className='w-full mt-5 space-y-2'>
        <div className='flex w-full text-sm'>
            <div className='w-1/2 font-semibold'>
                {name}
            </div>
            <div className='w-1/2 text-[#A3A3A3]'>
                Kiểu dữ liệu: {dataType}
            </div>
        </div>
        <div className='text-xs italic'>
            *Chú thích: {note}
        </div>
        <div>
            {(dataType === DataTypeEnum.Text || dataType === DataTypeEnum.Other) &&
            <input type="text" value={fieldValue} className='border text-sm border-black border-1 rounded-md w-full h-10 p-2'
                onChange={(e:any) => {
                    e.preventDefault();
                    setFieldValue(e.target.value)
                }}
            />
            }

            {dataType === DataTypeEnum.Number && 
            <input type="number" value={fieldValue} className='border text-sm border-black border-1 rounded-md w-full h-10 p-2'
            onChange={(e:any) => {
                e.preventDefault();
                setFieldValue(e.target.value)
            }}
            />
            }

            {dataType === DataTypeEnum.Date &&
            <div className='grid justify-items-end items-center'>
                <DatePicker
                onChange={date => {
                    if(date){
                        setFieldValue(date);
                    }
                }}
                selected={fieldValue}
                dateFormat="dd/MM/yyyy"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                locale="vi"
                className="h-10 w-full border border-black border-1 rounded-md p-2"
                />
            </div>
            }

            {dataType === DataTypeEnum.Email &&
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
                    }}
                    />
                </div>
            }

            {dataType === DataTypeEnum.phoneNum &&
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

    const [form, setForm] = useState<Form>(
        {
            templateId: _id !== undefined ? _id : "",
            fields:[],
            markedTemplateFileName: ""
        }
    )

    useEffect(() => {
        dispatch(getAFormAction(state.formId))
        .then((data) => {
            setForm(data?.form)
        }
        )
        .catch((error) => {
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

                <div className='max-h-[calc(100vh-350px)] overflow-y-scroll border-t-2 border-b-2 px-2'>
                    {form?.fields.map((field, index) => {
                        return <FormField indx={index} field={field}/>
                    })}
                </div>

                <div 
                className='w-full mt-2 bg-[#1488D8] rounded-lg py-2 text-md font-semibold text-white flex items-center justify-center hover:cursor-pointer'
                >
                    Tạo giấy tờ
                </div>

                <div 
                className='flex justify-end mt-3'
                >
                    <div className='w-1/4 rounded-lg bg-white border-2 border-[#1488D8] px-1 py-3 text-[#1488D8] flex items-center justify-center hover:cursor-pointer'>
                        Lưu giấy tờ
                    </div>
                </div>
            </div>

            <div className='w-2/3'>
                
            </div>
        </div>
    )
}

export default TopicPaperCreation;