import React, { useState } from "react";
import { useCouncilDetailContext } from "./CouncilDetailContext";
import { UpdateCouncilInfo } from "../../../../../../shared/interfaces/councilInterface";
import { CouncilStatusEnum } from "../../../../../../shared/types/councilStatus";
import CouncilService from "../../../../../../services/councilService";
import Swal from "sweetalert2";

interface Props {
    onClose: any
}

export default function SetGeneralInfoModal(props: Props) {
    const { onClose } = props;
    const { council, setCouncil} = useCouncilDetailContext();
    const [update, setUpdate] = useState<UpdateCouncilInfo>({});

    const onChangeCouncilName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdate({
            ...update,
            name: event.target.value
        })
    }

    const onChangeCouncilPlace = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdate({
            ...update,
            place: event.target.value
        })
    }

    const onChangeCouncilTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdate({
            ...update,
            time: event.target.value
        })
    }
    
    const onChangeCouncilDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdate({
            ...update,
            date: event.target.value
        })
    }

    const onChangeCouncilStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUpdate({
            ...update,
            status: event.target.value
        })
    }

    const onClickConfirmBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        CouncilService.putUpdateCouncil(council._id as string, update)
            .then((data) => {
                setCouncil(data);
                onClose();
            })
            .catch((data) => {
                Swal.fire({
                    icon: 'error',
                    text: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'OK'
                })
            })
    }

    return (
        <div 
            className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex justify-center items-center" 
            id= "wrapper" 
        >
            <div className = "md:w-[700px] w-[90%] mx-auto h-[450px] bg-white rounded overflow-y-auto mx-auto">
                <div className="px-3 mt-4 w-full flex flex-col">
                    <div className = 'mb-4 pb-2 text-xl font-medium text-gray-900 text-center'>
                        Thay đổi thông tin chung
                    </div>
                    <form className = "space-y-4" action = "#">
                        <div className = 'flex flex-row '>
                            <div className = 'mx-6 w-full '>
                                <div className = "block mb-2 text-base font-medium text-gray-900">
                                    Tên hội đồng:
                                </div>
                                <input
                                    className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder = "Tên hội đồng"
                                    type="text"
                                    defaultValue={council.name}
                                    onChange={onChangeCouncilName}
                                />
                            </div>
                        </div>
                        
                        <div className = 'flex flex-row mx-6 w-full items-center'>
                            <div className = "block mb-2 text-base font-medium text-gray-900 mr-4">
                                Trạng thái:
                            </div>
                            <select
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5"
                                defaultValue={council.status}
                                onChange={onChangeCouncilStatus}
                            >
                                {Object.values(CouncilStatusEnum).map((status) => {
                                    return (
                                        <option key={status} value={status}>{status}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className = 'flex flex-row '>
                            <div className = 'mx-6 w-full'>
                                <div className = "block mb-2 text-base font-medium text-gray-900">
                                    Thời gian:
                                </div>
                                <input
                                    className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder = "Thời gian"
                                    type="time"
                                    defaultValue={council.time}
                                    onChange={onChangeCouncilTime}
                                    required
                                />
                            </div>
                            <div className = 'mx-6 w-full'>
                                <div className = "block mb-2 text-base font-medium text-gray-900">
                                    Ngày diễn ra :
                                </div>
                                <input
                                    className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder = "Ngày diễn ra"
                                    defaultValue={council.date}
                                    onChange={onChangeCouncilDate}
                                    type="date"
                                    required
                                />
                            </div>
                        </div>

                        <div className = 'flex flex-row '>
                            <div className = 'mx-6 w-full'>
                            <div className = "block mb-2 text-base font-medium text-gray-900">
                                Địa điểm:
                            </div>
                            <input
                                className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder = "Địa điểm"
                                type="text"
                                required
                                defaultValue={council.place}
                                onChange={onChangeCouncilPlace}
                            />
                            </div>
                        </div>
                    </form>
                    <div className = 'my-4 py-2 text-gray-900 text-center w-full flex flex-row justify-evenly'>
                        <button
                            className="w-24 h-12 rounded border-2 border-[#e1000e] text-[#e1000e] text-center bg-white font-medium"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button 
                            className="w-24 h-12 rounded border-2 border-[#1488d8] text-[#1488d8] text-center bg-white font-medium"
                            onClick={onClickConfirmBtn}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
