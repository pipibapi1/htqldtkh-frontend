import React from 'react';
import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';
import MyRequestList from './MyRequestList';
import { useLocation } from 'react-router-dom';
import { RoleType } from '../../../shared/types/role';


const MyRequestPage:React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={false} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.Student} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"YÊU CẦU PHÁT SINH"}/>
                    <MyRequestList />
                </div>
            </div>
        </div>
    )
}

export default MyRequestPage;