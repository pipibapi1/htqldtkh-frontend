import React, { useState, useEffect } from 'react';
import Header from '../../../../components/header';
import SideNav from '../../../../components/sideNav';
import { RoleType } from '../../../../shared/types/role';
import { useLocation } from 'react-router-dom';
import PathHead from '../../../../components/pathHead';
import RequestList from './RequestList';

interface PeriodType{
    _id: string;
    period: string;
    status: PeriodType;
    createAt: Date;
}

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