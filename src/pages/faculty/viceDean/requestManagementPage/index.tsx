import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../../../components/header';
import SideNav from '../../../../components/sideNav';
import PathHead from '../../../../components/pathHead';

import { RoleType } from '../../../../shared/types/role';

import RequestList from './RequestList';

const RequestManagement: React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FVD} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"QUẢN LÝ YÊU CẦU"}/>
                    <RequestList />
                </div>
            </div>
        </div>
    )
}

export default RequestManagement;