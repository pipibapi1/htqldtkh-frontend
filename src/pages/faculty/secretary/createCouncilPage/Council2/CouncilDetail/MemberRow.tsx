import { AcademyRank } from "../../../../../../shared/types/academyRank";
import { DegreeEnum } from "../../../../../../shared/types/degree";
import Swal from "sweetalert2";
import councilService from "../../../../../../services/councilService";
import { useCouncilDetailContext } from "./CouncilDetailContext";
interface Props {
    index: number;
}

export const MemberRow: React.FC<Props> = (props) => {
    const { index } = props;
	const {council, setCouncil} = useCouncilDetailContext();
	const member = council.members[index];

    const displayDegreeAndAcademyRank = () => {
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
				academyRank = "";
		}

		return academyRank + " " + degree
	}

	const onClickDeleteBtn = (e: React.MouseEvent<HTMLDivElement>) => {
        Swal.fire({
            icon: 'warning',
            text: 'Bạn có chắc chắn muốn xóa thành viên này khỏi hội đồng hiện tại này không?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: "Hủy"
        }).then((data) => {
            if (data.isConfirmed) {
                const update = {
                    members: council.members.map(ele => ele),
					numMembers: council.members.length - 1
                }
				update.members.splice(index, 1);
				councilService.putUpdateCouncil(council._id as string, update)
					.then((data) => {
						setCouncil({
							...data,
							numTopics: council.numTopics,
							topicGeneralInfos: council.topicGeneralInfos
						});
					})
            }
        })
    }

	return (
		<tr className={(index % 2 === 1) ? 'border-t-2 transition duration-300 ease-in-out' : 'border-t-2 bg-[#1488D8]/25 transition duration-300 ease-in-out'}>
			<td className='text-center font-medium px-1 py-1 text-sm text-gray-900 border-l-2'>
			{index+1}
			</td>
			<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2 whitespace-pre-line'>
				{member.name}
			</td>
			<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
			{member.gender}
			</td>
			<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
			{displayDegreeAndAcademyRank()}
			</td>
			<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
				<p>
					{member.email}
				</p>
			</td>
			<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
				<p>
					{member.phoneNumber}
				</p>
			</td>
			<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
			{member.role}
			</td>
			<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2 whitespace-pre-line'>
				{member.workUnit}
			</td>
			<td className='text-center font-medium text-sm text-gray-900 px-1 py-1 border-l-2'>
				<div className="text-[#0079CC] font-semibold no-underline hover:underline hover:cursor-pointer"
					onClick={onClickDeleteBtn}
				>
					Xóa
				</div>
			</td>
		</tr>  
	);
};