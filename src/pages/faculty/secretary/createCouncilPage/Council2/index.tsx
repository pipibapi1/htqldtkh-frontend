import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../../../../components/header';
import SideNav from '../../../../../components/sideNav';
import PathHead from '../../../../../components/pathHead';

import { RoleType } from '../../../../../shared/types/role';

import CouncilsGeneralInfo from './CouncilsGeneralInfo';

const FSAcceptanceCouncil: React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"TẠO HỘI ĐỒNG / HĐ nghiệm thu"}/>
                    <CouncilsGeneralInfo/>
                </div>
            </div>
        </div>
    )
}

export default FSAcceptanceCouncil;