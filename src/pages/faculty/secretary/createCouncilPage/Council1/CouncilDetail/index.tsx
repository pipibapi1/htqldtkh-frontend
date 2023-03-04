import React, {useState} from 'react';
import Header from '../../../../../../components/header';
import SideNav from '../../../../../../components/sideNav';
import PathHead from '../../../../../../components/pathHead';
import { RoleType } from '../../../../../../shared/types/role';
import Interface from './Interface';
import {Link} from "react-router-dom";
import BackIcon from '../../../../../../assets/images/🦆 icon _arrow circle left_.png';
import { appRouters } from '../../../../../../shared/urlResources';


const FSCouncil1Detail: React.FC = () => {
    const [isAtViewMode, changeToEditMode] = useState<Boolean>(true);
    const [isAtEditMode, changeToViewMode] = useState<Boolean>(false);
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={'/' + appRouters.LINK_TO_FS_REVIEW_COUNCIL}/>
                <div className=''>
                    <PathHead path={"TẠO HỘI ĐỒNG / HĐ xét duyệt / Chi tiết"}/>
                    <Link to={'/fsReviewCouncil'} className='hover:cursor-pointer w-fit'>
                        <img src={BackIcon} className='h-[40px] w-[40px] m-5' alt="" />
                    </Link>
                    <Interface 
                        onViewMode={changeToEditMode}
                        onEditMode={changeToViewMode}/>
                </div>
            </div>
        </div>
    )
}

export default FSCouncil1Detail;