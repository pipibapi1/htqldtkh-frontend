import React, {useState, Fragment, useEffect} from 'react';
import AddCouncilMemberModal from './AddMemberCouncilModal';
import AddTopicToCouncilModal from './AddTopicModal';
import SetGeneralInfModal from './SetGeneralInfoModal';
import SetCouncilMemberModal from './SetCouncilMemberModal';
import { MemberRow } from './MemberRow';
import { TopicRow } from './TopicRow';
import { useParams } from 'react-router';
import CouncilService from '../../../../../../services/councilService';
import EmailService from '../../../../../../services/sendEmailService';

import { CouncilDetailIntf, CouncilMemberIntf, TopicInCouncilIntf } 
from '../../../../../../shared/interfaces/councilInterface';
import { CouncilTypeEnum } from '../../../../../../shared/types/councilType';
import { CouncilStatusEnum } from '../../../../../../shared/types/councilStatus';
import { AcademyRank } from '../../../../../../shared/types/academyRank';
import { DegreeEnum } from '../../../../../../shared/types/degree';
import { CouncilDetailContext } from './CouncilDetailContext';
import Swal from 'sweetalert2';

const CouncilDetailScreen: React.FC = () => {
    const [showModal, setShowModal] = useState<string>("");
    const [council, setCouncil] = useState<CouncilDetailIntf>({
        _id: "",
        name: "",
        type: CouncilTypeEnum.NT,
        status: CouncilStatusEnum.NEW,
        period: "",
        time: "",
        date: "",
        place: "",
        numMembers: 0,
        numTopics: 0,
        members: [],
        topicGeneralInfos: []
    })
    const councilDetailcontextValue = {
        council: council,
        setCouncil: setCouncil
    }

    let { councilId } = useParams();
    let memberListComponent = [];
    for ( let idx = 0; idx < council.numMembers; idx++) {
        memberListComponent.push((
            <MemberRow
                key={idx}
                index={idx}
            />
        ))
    }

    let topicListComponent = [];
    const numTopics = council.topicGeneralInfos? council.topicGeneralInfos.length : 0;
    for ( let idx = 0; idx < numTopics; idx++) {
        topicListComponent.push((
            <TopicRow
                key={idx}
                index={idx}
            />
        ))
    }

    const onCloseModal = () => {
        setShowModal("");
    }

    const ModalDisplay = () => {
        switch (showModal){
            case "set_general":
                return <SetGeneralInfModal
                    onClose={onCloseModal}
                /> 

            case "add_member":
                return <AddCouncilMemberModal
                    onClose={onCloseModal}
                />
            
            case "add_topic":
                return <AddTopicToCouncilModal
                    onClose={onCloseModal}
                />
            case "set_member":
                return <SetCouncilMemberModal
                    onClose={onCloseModal}
                />

            default:
                return <div></div>;
        }
    } 

    const onClickSetGeneralInfoBtn = () => {
        setShowModal("set_general");
    }
    const displayDegreeAndAcademyRank = (member: CouncilMemberIntf) => {
		let degree = "";
		let academyRank = "";
		switch (member.degree){
			case DegreeEnum.CN :
				degree = "CN.";
				break;
			case DegreeEnum.ThS :
				degree = "ThS.";
				break;
			case DegreeEnum.TS :
				degree = "TS.";
				break;
			default:
				degree = "";
		}

		switch (member.academyRank){
			case AcademyRank.GS:
				academyRank = "GS."
				break;
			
			case AcademyRank.PGS:
				academyRank = "PGS."
				break;
			default:
				degree = "";
		}

		return academyRank + " " + degree
	}

    const onClickSendEmailBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        const email: FormData = new FormData();
        const memberList = council.members.map(member => {
            return `\t+ ${displayDegreeAndAcademyRank(member)} ${member.name}, ${member.workUnit} , ${member.role}`
            }).join("\n");

        const topicList = council.topicGeneralInfos? council.topicGeneralInfos.map((topic) => {
            return `\t+ ${topic.name}, mã số: ${topic.topicGivenId}\n`
                + `\tChủ nhiệm đề tài: ${topic.studentName}\n`
                + `\tCán bộ hướng dẫn: ${topic.instructorsName?.join(", ")}\n`
                + `\tLoại đề tài: ${topic.type}`
            }).join("\n") : "";

        const text = `Kính gửi thầy (cô),\n` 
            + `Khoa Khoa học Kỹ thuật Máy tính, trường Đại học Bách khoa Thành phố Hồ Chí Minh trân trọng thông báo về kế hoạch tổ chức hội đồng nghiệm thu đề tài nghiên cứu khoa học cấp sinh viên.\n`
            + `Tên hội đồng: ${council.name}\n`
            + `Thời gian diễn ra: ${displayTime()}\n`
            + `Địa điểm: ${council.place}\n`
            + `Danh sách thành viên hội đồng gồm có:\n`
            + `${memberList}\n`
            + `Danh sách đề tài: \n`
            + `${topicList}\n`
            + `Mọi thắc mắc, quý thầy (cô) vui lòng phản hồi sớm với thư ký khoa.\n`
            + `Xin trân trọng cảm ơn`;

        const info = {
            subject: "Thông báo về kế hoạch tổ chức hội đồng xét duyệt đề tài nghiên cứu khoa học cấp sinh viên",
            text: text,
            email: council.members.map(ele => ele.email)
        }
        email.append("info", JSON.stringify(info))
        EmailService.sendEmailService(email)
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    text: 'Gửi thông tin thành công',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'OK'
                }).then((data) => {
                    CouncilService.putUpdateCouncil(council._id as string, {
                        status: CouncilStatusEnum.WAITING
                    }).then((data) => {
                        setCouncil({
                            ...council,
                            status: CouncilStatusEnum.WAITING
                        })
                    })
                })
            })
            .catch((data) => {
                Swal.fire({
                    icon: 'error',
                    text: 'Có lỗi xảy ra. vui lòng thử lại sau.',
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: 'OK'
                })
            })
    }

    const displayTime = () => {
        const dateToArray = council.date.split("-");
        dateToArray.reverse();
        return council.time + ` ngày ${dateToArray.join("/")}`
    }

    useEffect(() => {
        if (councilId) {
            CouncilService.getCouncilDetail(councilId)
                .then((data) => {
                    setCouncil(data);
                })
        }
    }, [councilId, council.numTopics])

    return (
    <Fragment>
        <CouncilDetailContext.Provider value={councilDetailcontextValue}>
            <div className=''>
                <div className='p-5 min-h-[625px] overflow-hidden'>
                    <div className='flex justify-between mb-2'>
                        <div className='flex flex-col'>
                            <div className='mb-5'>
                                <div className='font-bold text-3xl'>
                                    {council.name}
                                </div>
                            </div> 
                            <div className='mb-5'>
                                <div>
                                    Trạng thái: <span className='text-[#030391]'>{council.status}</span> 
                                </div>
                                <div>
                                    Địa điểm: <span className='text-[#030391]'>{council.place}</span> 
                                </div>
                                <div>
                                    Thời gian diễn ra: <span className='text-[#030391]'>{displayTime()}</span> 
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <button 
                                className="w-40 h-12 mr-2 bg-[#14c437] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#13d633] hover:cursor-pointer"
                                onClick={onClickSendEmailBtn}
                            >
                                Gửi thông báo
                            </button>
                            <button 
                                className="w-40 h-12 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
                                onClick={onClickSetGeneralInfoBtn}
                            >
                                Sửa thông tin
                            </button>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <div className='flex justify-between mb-2'>
                            <div className = "font-bold py-4">
                                Danh sách thành viên hội đồng:
                            </div>
                            <div className='flex flex-row'>
                                <button 
                                    className="w-40 h-12 mr-2 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer" 
                                    onClick={() => setShowModal("set_member")}
                                >
                                    Chỉnh sửa
                                </button>
                                <button 
                                    className="w-40 h-12 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer" 
                                    onClick={() => setShowModal("add_member")}
                                >
                                    Thêm thành viên
                                </button>
                            </div>
                        </div>
                        <div>
                            <table className='w-full table-fixed border-separate border-spacing-y-1 border-2'>
                                <thead className='bg-[#1577D2] border-b'>
                                    <tr>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-8 border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-28 border-l-2'
                                    >
                                        Tên thành viên
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-20 border-l-2'
                                    >
                                        Giới tính
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-20 border-l-2'
                                    >
                                        Học hàm / Học vị
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-32 border-l-2'
                                    >
                                        Số điện thoại
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-20 border-l-2'
                                    >
                                        Vai trò
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-48 border-l-2'
                                    >
                                        Đơn vị công tác
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-12 border-l-2'
                                    >
                                        
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {memberListComponent}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='mb-5'>
                        <div className='flex justify-between mb-2'>
                            <div className = "font-bold py-4">
                                Danh sách đề tài:
                            </div>
                            <div className='flex flex-row'>
                                <button 
                                    className="w-40 h-12 bg-[#0079CC] flex justify-center items-center transition text-white font-semibold py-4 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer" 
                                    onClick={() => setShowModal("add_topic")}
                                >              
                                    <div>
                                        Thêm đề tài
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div>
                            <table className='w-full table-fixed border-separate border-spacing-y-1 border-2'>
                                <thead className='bg-[#1577D2] border-b'>
                                    <tr>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-8 border-l-2'
                                    >
                                        
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Tên đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-28 border-l-2'
                                    >
                                        Mã đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Chủ nhiệm đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3  border-l-2'
                                    >
                                        Cán bộ hướng dẫn
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-24 border-l-2'
                                    >
                                        Loại đề tài
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-32 border-l-2'
                                    >
                                        Kêt quả
                                    </th>
                                    <th
                                        scope='col'
                                        className='text-sm text-center font-bold text-white px-2 py-3 w-12 border-l-2'
                                    >
                                        
                                    </th>
                                    
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {topicListComponent}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {ModalDisplay()}
            </CouncilDetailContext.Provider>
        </Fragment>
    )
}

export default CouncilDetailScreen;