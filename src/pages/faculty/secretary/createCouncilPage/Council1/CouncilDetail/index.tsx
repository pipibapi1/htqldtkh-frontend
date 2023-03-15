import React from 'react';
import Header from '../../../../../../components/header';
import SideNav from '../../../../../../components/sideNav';
import PathHead from '../../../../../../components/pathHead';
import { RoleType } from '../../../../../../shared/types/role';
import CouncilDetailScreen from './CouncilDetailScreen';
import {Link} from "react-router-dom";
import BackIcon from '../../../../../../assets/images/🦆 icon _arrow circle left_.png';
import { appRouters } from '../../../../../../shared/urlResources';

const FSCouncil1Detail: React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={'/' + appRouters.LINK_TO_FS_REVIEW_COUNCIL}/>
                <div className=''>
                    <PathHead path={"TẠO HỘI ĐỒNG / HĐ xét duyệt / Chi tiết"}/>
                    <Link to={'/fsReviewCouncil'} className='hover:cursor-pointer w-fit'>
                        <img src={BackIcon} className='h-5 m-5' alt="" />
                    </Link>
                    <CouncilDetailScreen/>
                </div>
            </div>
        </div>
    )
}

export default FSCouncil1Detail;