import React from 'react';
import Header from '../../../../components/header';
import SideNav from '../../../../components/sideNav';
import PathHead from '../../../../components/pathHead';
import { RoleType } from '../../../../shared/types/role';
import { useLocation } from 'react-router-dom';
import ExpenseStatistic from './ExpenseStatistic';

const FVDExpenseStatistics: React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FVD} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"BÁO BIỂU THỐNG KÊ / Phân bổ kinh phí"}/>
                    <ExpenseStatistic />
                </div>
            </div>
        </div>
    )
}

export default FVDExpenseStatistics;