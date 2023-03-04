import React from 'react';
import Header from '../../../../../components/header';
import SideNav from '../../../../../components/sideNav';
import PathHead from '../../../../../components/pathHead';
import { RoleType } from '../../../../../shared/types/role';
import { useLocation } from 'react-router-dom';
import CouncilsGeneralInfo from './CouncilsGeneralInfo';

const FSReviewCouncil: React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"TẠO HỘI ĐỒNG / HĐ xét duyệt"}/>
                    <CouncilsGeneralInfo/>
                </div>
            </div>
        </div>
    )
}

export default FSReviewCouncil;