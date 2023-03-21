import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../../../components/header';
import SideNav from '../../../../components/sideNav';
import PathHead from '../../../../components/pathHead';

import { RoleType } from '../../../../shared/types/role';

import AllocateExpensePage from './allocateExpensePage';

const FSAllocateExpense: React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"QUẢN LÝ ĐỀ TÀI / Phân bổ kinh phí"}/>
                    <AllocateExpensePage/>
                </div>
            </div>
        </div>
    )
}

export default FSAllocateExpense;