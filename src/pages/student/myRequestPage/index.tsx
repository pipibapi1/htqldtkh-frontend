import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';

import { RootState } from '../../../store';
import { RoleType } from '../../../shared/types/role';
import { StudentAccountStatusEnum } from '../../../shared/types/studentAccountStatus';

import MyRequestList from './MyRequestList';

const MyRequestPage:React.FC = () => {
    const location = useLocation();
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.Student} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"YÊU CẦU PHÁT SINH"}/>
                    {currentUser.accountStatus === StudentAccountStatusEnum.approved ? <MyRequestList /> :
                        <div className="p-5">
                            Hiện tại tài khoản của bạn chưa được duyệt nên bạn chưa thể dùng tính năng này.
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyRequestPage;