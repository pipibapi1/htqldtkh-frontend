import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../../../components/header';
import PathHead from '../../../../components/pathHead';
import SideNav from '../../../../components/sideNav';

import { RoleType } from '../../../../shared/types/role';

import RequestInterface from './RequestInterface';

const VicedeanAccountManagement: React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"QUẢN LÝ TÀI KHOẢN / Phó chủ nhiệm"}/>
                    <div>
                    <RequestInterface 
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VicedeanAccountManagement;