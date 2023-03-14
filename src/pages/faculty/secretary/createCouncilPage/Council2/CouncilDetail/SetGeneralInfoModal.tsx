import React, { useState } from "react";
import { useCouncilDetailContext } from "./CouncilDetailContext";
import { UpdateCouncilInfo } from "../../../../../../shared/interfaces/councilInterface";
import { CouncilStatusEnum } from "../../../../../../shared/types/councilStatus";
import CouncilService from "../../../../../../services/councilService";
import Swal from "sweetalert2";

interface Props {
    onClose: any
}

interface Error {
	nameErr: string,
	timeErr: string,
	dateErr: string,
	placeErr: string
}

export default function SetGeneralInfoModal(props: Props) {
    const { onClose } = props;
    const { council, setCouncil} = useCouncilDetailContext();
    const [ update, setUpdate ] = useState<UpdateCouncilInfo>({});
    const [ error, setError ] = useState<Error>({
        nameErr: "",
        timeErr: "",
        dateErr: "",
        placeErr: ""
    })

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

    const hasError = () => {
        let currError = {
            nameErr: "",
            timeErr: "",
            dateErr: "",
            placeErr: ""
        }
        //validate council name
        if (update.name === ""){
            currError.nameErr = "* Đây là trường bắt buộc"
        }
        else {
            currError.nameErr = ""
        }

        //validate council place
        if (update.place === ""){
            currError.placeErr = "* Đây là trường bắt buộc"
        }
        else {
            currError.placeErr = ""
        }

        //validate time of council
		const timeRegEx: RegExp = /(([0-1][0-9])|(2[0-3])):([0-5][0-9])/;
		if (update.time === "") {
			currError.timeErr = "* Đây là dữ liệu bắt buộc"
		}
		else if ((update.time && update.time.match(timeRegEx)) || (update.time === undefined)) {
			currError.timeErr = "";
		}
		else {
			currError.timeErr = "* Sai định dạng"
		}

		//validate date of council
		const dateRegEx: RegExp = /[0-9]{4}-((0[1-9])|(1[012]))-(([12][0-9])|(3[01])|(0[1-9]))/;
		if (update.date === "") {
			currError.dateErr = "* Đây là dữ liệu bắt buộc"
		}
		else if ((update.date && update.date.match(dateRegEx)) || (update.date === undefined)) {
			currError.dateErr = "";
		}
		else {
			currError.dateErr = "* Sai định dạng"
		}
        setError(currError)
        return currError.dateErr || currError.nameErr || currError.placeErr || currError.timeErr
    }

    const onClickConfirmBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!hasError()){
            CouncilService.putUpdateCouncil(council._id as string, update)
                .then((data) => {
                    setCouncil({
                        ...data,
                        numTopics: council.numTopics,
                        topicGeneralInfos: council.topicGeneralInfos
                    });
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
    }

    return (
        <div 
            className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex flex-col justify-center items-center z-40" 
            id= "wrapper" 
        >
            <div className = "md:w-[700px] w-[90%] mx-auto max-h-[90%] bg-white rounded overflow-y-auto mx-auto">
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
                                <div className = 'w-full flex flex-col'>
                                    <input
                                        className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder = "Tên hội đồng"
                                        type="text"
                                        defaultValue={council.name}
                                        onChange={onChangeCouncilName}
                                    />
                                    <div className="text-sm text-red-600 p-1">
                                        {error.nameErr}
                                    </div>
                                </div>
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
                                <div className = 'w-full flex flex-col'>
                                    <input
                                        className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder = "Thời gian"
                                        type="time"
                                        defaultValue={council.time}
                                        onChange={onChangeCouncilTime}
                                        required
                                    />
                                    <div className="text-sm text-red-600 p-1">
                                        {error.timeErr}
                                    </div>
                                </div>
                            </div>
                            <div className = 'mx-6 w-full'>
                                <div className = "block mb-2 text-base font-medium text-gray-900">
                                    Ngày diễn ra :
                                </div>
                                <div className = 'w-full flex flex-col'>
                                    <input
                                        className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder = "Ngày diễn ra"
                                        defaultValue={council.date}
                                        onChange={onChangeCouncilDate}
                                        type="date"
                                        required
                                    />
                                    <div className="text-sm text-red-600 p-1">
                                        {error.dateErr}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className = 'flex flex-row '>
                            <div className = 'mx-6 w-full'>
                                <div className = "block mb-2 text-base font-medium text-gray-900">
                                    Địa điểm:
                                </div>
                                <div className = 'w-full flex flex-col'>
                                    <input
                                        className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder = "Địa điểm"
                                        type="text"
                                        required
                                        defaultValue={council.place}
                                        onChange={onChangeCouncilPlace}
                                    />
                                    <div className="text-sm text-red-600 p-1">
                                        {error.placeErr}
                                    </div>
                                </div>
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
