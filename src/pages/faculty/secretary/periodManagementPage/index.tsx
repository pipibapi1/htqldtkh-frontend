import React from 'react';
import Header from '../../../../components/header';
import PathHead from '../../../../components/pathHead';
import SideNav from '../../../../components/sideNav';
import { RoleType } from '../../../../shared/types/role';
import { useLocation } from 'react-router-dom';
import PeriodList from './PeriodList';


const PeriodManagementPage: React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"QUẢN LÝ ĐỀ TÀI / Mở đợt đăng ký"}/>    
                    <PeriodList />
                </div>
            </div>
        </div>
    )
}

export default PeriodManagementPage;